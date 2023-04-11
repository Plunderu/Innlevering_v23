
// Definerer  Spillbrettet: 
let feltStr = 32;
let rader = 16; 
let kolonner = 16; 

//Definerer størrelsen på brettet 
let brettBredde = feltStr*kolonner // 32*16
let brettHoyde = feltStr*rader // 32*16

let context;  

// lager knapper:
let restartBtn = document.querySelector("#restart")
let volumBtn = document.querySelector("#volum")
let lagreBtn = document.querySelector("#lagre")

let inputEl = document.querySelector("#input")
let navnEl = document.querySelector("#navn")
let leggTilBtn = document.querySelector("#leggTil") 

//DOm for mobilspill
let kontrollBtns = document.querySelector("#kontrollerMobil")
let hoyreBtn = document.querySelector("#hoyre")
let venstreBtn = document.querySelector("#venstre")
let skytBtn = document.querySelector("#skyt")


// Lager objekt for forsvar
let forsvar = {
    x : feltStr * kolonner/2- feltStr,
    y : feltStr * rader - feltStr*2, 
    v : feltStr,
    bredde : feltStr * 2,
    hoyde : feltStr,
    bilde : new Image()
}

// blokkader 
let blokk1 = {
    x : brettBredde/5.33,
    y : brettHoyde/2,
    bredde : brettBredde/5.3,
    hoyde : brettHoyde/16,
}

let blokk2 = {
    x : brettBredde/1.6,
    y : brettHoyde/2,
    bredde: brettBredde/5.3 ,
    hoyde : brettHoyde/16,
}

//Variabel som sjekker om blokkene treffes av angrep
let odelagt = false 

// Angrep
let angrepArr = [];
let angriperSkuddArr = []
let angriperDreptArr = []
let angrepK = 3
let angrepR = 2
let angriperFart = 6
let angriperSkuddv = 3

//Bombe
let bombeArr = []
let bombeV = -4

// Skudd
let skuddArr = [];
let skuddV = -10
let antallSkudd = 0

// Poeng
let poeng = 0 
let gameOver = false

// Volumvariabel som default settes til å være av 
let volum = false

//Lager angrepet
function lagAngrep(){
    for (let c = 0; c < angrepK; c++){ //Så lenge C er mindre enn AngrepKolonner, som til å begynne med er 3, dannes det rader med angripere. 
         for(let r = 0; r < angrepR; r++){ //Når C er 1,2 og 3 dannes det en to rader med angripere
              let angriper = {
                bredde : feltStr*2,
                hoyde : feltStr,
                x : feltStr + c*feltStr*2,
                y : feltStr + r*feltStr,
                levende : true,
                bilde : new Image(),
                antall: 0
             } 

             angriper.bilde.src = "https://raw.githubusercontent.com/ImKennyYip/space-invaders/master/alien-magenta.png"
 
             angrepArr.push(angriper)
             angriper.antall = angrepArr.length

         }
 
     }
}

//Funksjon til å starte spillet
function gameStart(){
    brett = document.getElementById("brett"); //Henter spillelementet fra DOM

    //Sjekker om bredden til skjermen er mindre enn bredden til spillcanvas. Dersom den er det får mobilkontrollene klassen show. 
    if(window.innerWidth<=brettBredde){
        brettBredde = window.innerWidth
        blokk1.x -=30
        blokk2.x -= (512 - (window.innerWidth +30))
        kontrollBtns.classList.add("vis")
        kontrollBtns.classList.remove("gjem")
        hoyreBtn.addEventListener("click",flyttForsvarHoyre)
        venstreBtn.addEventListener("click",flyttForsvarVenstre)
        skytBtn.addEventListener("click", skytMobil)
    }

    brett.width = brettBredde;
    brett.height = brettHoyde;

    context = brett.getContext("2d"); //Dette brukes for å tegne på brettet

    //Setter bildet til forsvar
    forsvar.bilde.src = "https://www.pngall.com/wp-content/uploads/13/Space-Invaders-Ship.png"
    context.drawImage(forsvar.bilde, forsvar.x,forsvar.y,forsvar.bredde,forsvar.hoyde)

     // Kaller på funksjonen som lager angrepet 
     lagAngrep()


    // Legger til lyttere til spillknapper: 
    addEventListener("keydown", flyttForsvar)
    addEventListener("keyup",skyt) // Forskjellen på keyup og keydown er at man må slippe også, kan ikke skyte automatisk 
    restartBtn.addEventListener("click", restart)
    volumBtn.addEventListener("click", volumKontroll)
    lagreBtn.addEventListener("click", lagre)
    leggTilBtn.addEventListener("click", leggTil)

    //SetInterval gjør at funksjonen oppdater kjøres hvert 0.02 sekund (oppgis i millisekund). Det er dette som simulerer "animasjonen"
    setInterval(oppdater, 1000/50)
}

// Kaller på gamestart for å starte spillet
gameStart()



//Setter angrepet til å skyte to ganger i sekundet
setInterval(angrepSkudd,500)


// Lager en uendelig loop med oppateringer (animasjon)
function oppdater(){

    context.clearRect(0,0,brett.width, brett.height) // Klarerer lerretet for hver gang 

        // Tegner blokkade så lenge de ikke er truffet av angrep 
        if(angriperDreptArr.length >=5 && window.innerWidth>= feltStr*kolonner){
            context.fillStyle = "white"
            context.font = "16px courier" 
            context.fillText("Press Enter", brettBredde - 117, brettHoyde-20) 
        }    

        
        // Sjekker om noen av angriperne treffer blokkade og fjerner den 
        for(let i = 0; i < angrepArr.length; i++){
            let angriper = angrepArr[i]
             if(kollisjon(blokk1,angriper)){
                odelagt = true
            }
            if(kollisjon(blokk2,angriper)){
                odelagt = true
            } 
        }
       
    //Oppdaterer bildet til forsvar
    context.drawImage(forsvar.bilde, forsvar.x, forsvar.y,forsvar.bredde,forsvar.hoyde) 
    
    // Definerer variabel for å sjekke om angrepet treffer vegg
    let kollisjonVegg = false
 
     for(let i = 0; i < angrepArr.length; i++){
        let angriper = angrepArr[i];
         if (angriper.x + angriper.bredde >= brett.width || angriper.x <= 0) {
            kollisjonVegg = true 
        }
    }
    //HVis angrepet treffer veggen vil angriperne få motsatt fart 
    if (kollisjonVegg){
        angriperFart *= -1
    }

    // Oppdaterer posisjonen til angriper + flytter rad nærmere
    for(let i = 0; i < angrepArr.length; i++){ //Tegner kun angrepArr.length fordi vi fjerner en for hver vi dreper 
        let angriper = angrepArr[i]
        angriper.x += angriperFart
        if(kollisjonVegg){ //Flytter angrepet en rad nærmere forsvarer når det treffer veggen
            angriper.y += angriper.hoyde
        }
        context.drawImage(angriper.bilde, angriper.x,angriper.y,angriper.bredde,angriper.hoyde)
    }

        // Kuler fra forsvar
    for (let i = 0; i< skuddArr.length; i++){ //Itererer gjennom skuddArr og tegner hvert skudd
        let skudd = skuddArr[i];
            skudd.y += skudd.v; 
            context.fillStyle= "white";
            context.fillRect(skudd.x,skudd.y,skudd.bredde,skudd.hoyde)

            // skuddenes kollisjon med angrep 
            for (let j = 0; j < angrepArr.length; j++){
               let angriper = angrepArr[j];
                if(!skudd.brukt && angriper.levende && kollisjon(skudd, angriper)){
                    skudd.brukt = true 
                    angriper.levende = false //Setter angriper til ikke levende/død
                    angrepArr.splice(j, 1) // fjerner elemetet som blir skutt 
                    angriper.antall -= 1
                    poeng += 100 //Legger til 100 i poengscore 
                    angriperDreptArr.push(1) //LEgger til 1 i angreperdreptArr, Viktig for Bombecount
                    let treffLyd = new Audio("../lyder/kjoh.mp3")
                    if(volum){                    
                    treffLyd.play()}

                }
            }

            //Kulenes kollisjon med Blokkade 
            for(let i = 0; i< skuddArr.length; i++){
                let skudd = skuddArr[i]
                if(!odelagt && ((blokk1.x< skudd.x && skudd.x < blokk1.x + blokk1.bredde) || (blokk2.x < skudd.x && skudd.x < blokk2.x + blokk2.bredde))){ // HVis det skytes ett skudd som vil treffe blokk kan man ikke skyte igjen før skuddet er ute av spillet
                    removeEventListener("keyup",skyt)
                    removeEventListener("click",skytMobil)
                }
                if(!odelagt && kollisjon(skudd,blokk1) || !odelagt && kollisjon(skudd,blokk2)){
                    skudd.v *= -1 //Snur farten når skuddet treffer blokkade 
                }
                if(skudd.y > brettHoyde || skudd.y < 0){ //Dersom skuddet truffet blokkade ikke treffer forsvarer resettes skuddv, og dersom skuddet "snidder" blokkade og fortsetter videre. 
                    skudd.brukt = true
                    skudd.v *= -1
                    addEventListener("keyup",skyt)
                    addEventListener("click", skytMobil)
                }
                if(kollisjon(skudd,forsvar) && skudd.v>0){
                    skudd.brukt = true // Fjerner skuddet etter kollisjon 
                    gameOver = true 
                }
                if(odelagt){
                    addEventListener("keyup",skyt) //fjerner bugg hvis man skyter når angriperne ødelegger blokk
                    addEventListener("click", skytMobil)
                }
            }
 }

        //Tegner hver bombe og oppdaterer posisjon
        for (let i = 0; i < bombeArr.length; i++){
            let bombe = bombeArr[i];
                bombe.y += bombeV; 
                context.fillStyle= "white";
                context.fillRect(bombe.x,bombe.y,bombe.bredde,bombe.hoyde)

                //Bombenes kollisjon med angriper
                for (let j = 0; j < angrepArr.length; j++){
                    let angriper = angrepArr[j];
                     if(!bombe.brukt && angriper.levende && kollisjon(bombe, angriper)){
                         bombe.brukt = true
                         angriper.levende = false
                         angrepArr.splice(j, 3) // Fjerner tre elementer fra AngrepArr
                         angriper.antall -= 3
                         poeng += 300 // Legger til 3 poeng
                         angriperDreptArr.push(3)
                         let treffLyd = new Audio("../lyder/kjoh.mp3")
                         if(volum){
                            treffLyd.play()
                         }
                     }
                 }

                 //Bombes kollisjon med Blokkade
                 for(let i = 0; i< bombeArr.length; i++){
                     let bombe = bombeArr[i]
                     if(!odelagt && kollisjon(bombe,blokk1) || !odelagt && kollisjon(bombe,blokk2)){
                         bombeV *= -1 
                     }
                     if(bombe.y > brettHoyde){ //Dersom skuddet truffet blokkade ikke treffer forsvarer resettes skuddv 
                         bombe.brukt = true
                         bombeV *= -1
                     }
                     if(kollisjon(bombe,forsvar) && bombe.v>0){
                         bombe.brukt = true // Fjerner skuddet etter kollisjon 
                         gameOver = true 
                     }
                 }
            }

                // Kuler fra angrep 
                for (let i = 0; i < angriperSkuddArr.length; i++){
                    let angriperSkudd = angriperSkuddArr[i];
                    if(gameOver === false && !angriperSkudd.brukt){ //Så lenge det ikke er Gameover og skuddene fortsatt er i spillet skal de tegnes.                  
                        angriperSkudd.y += angriperSkuddv; 
                        context.fillStyle= "white";
                        context.fillRect(angriperSkudd.x,angriperSkudd.y,angriperSkudd.bredde,angriperSkudd.hoyde)}


                    //Stopper skuddene når de treffer blokkaden     
                    if(!odelagt && kollisjon(angriperSkudd,blokk1) || !odelagt && kollisjon(angriperSkudd, blokk2)){
                        angriperSkudd.brukt = true
                    }

                }

                // Sjekker om angrep treffer forsvarer og setter gameOver til å være true
                for(let i = 0; i< angriperSkuddArr.length; i++){
                    let angriperSkudd = angriperSkuddArr[i]
                    if(kollisjon(angriperSkudd,forsvar)){
                        gameOver = true
                    }

                }

    

        // Fjerner Forsvarerskudd etter at de er blitt brukt (GarbageCollecting)
        while(skuddArr.length > 0 && (skuddArr[0]. brukt || skuddArr[0].y < 0)){
           skuddArr.shift() //Fjerner det første elementet i arrayet.  
        }

         // Fjerner AngriperSkudd etter at de er blitt brukt 
        while(angriperSkuddArr.length > 0 && (angriperSkuddArr[0].brukt || angriperSkuddArr[0].y > brettHoyde)){
                    angriperSkuddArr.shift() //Fjerner det første elementet i arrayet.  
                 }

         // Fjerner bombene etter at de er blitt brukt 
        while(bombeArr.length > 0 && (bombeArr[0].brukt || bombeArr[0].y > brettHoyde)){
                    bombeArr.shift() //Fjerner det første elementet i arrayet.  
                 }
         
         
        //nytt level som gjør angripergruppen større, men med visse begrensninger
        if(angrepArr.length == 0){
            if(angrepK<6){
                angrepK = angrepK + 1;
            }   
            if(angrepR<5){
                angrepR = angrepR + 1 // Maks rader blir 16-4
            }

            if(angriperFart<-2){
                angriperFart+=1
            }
            else if(angriperFart>2){
                angriperFart-=1
            }
            angrepArr = [] // tømmer angrepArr
            skuddArr = [] //tømmer skuddArr hvorfor
            lagAngrep()
        }

        // Poeng 
        context.fillstyle = "white"
        context.font = "16px courier" 
        context.fillText(poeng, 5,20) 

       // Sjekker om angrepet treffer forsvarer og endrer til gameover: 
        for(let i = 0; i<angrepArr.length;i++)
            angriper = angrepArr[i]
        if(angriper.y >= forsvar.y ){
            gameOver = true
        }
         
        // Tegner Blokkade så lenge de ikke er odelagte
        if(!odelagt){
            context.fillStyle = "#6600cc"
            context.fillRect(blokk1.x ,blokk1.y,blokk1.bredde,blokk1.hoyde)
            context.fillRect(blokk2.x ,blokk2.y,blokk2.bredde,blokk2.hoyde)
        }

        //Funksjon som sjekker om Gameover variabelen har blitt true
        end() 
    
    }  

    //Andre funksjoner: 

    //Hvis den Globale GameOver-variabelen har blitt endret til true 
    function end (){
        if(gameOver){
            gameOverScreen() //Kaller Gameoverscreen funksjon om Gameover = true 
        }
    }




    // funksjon som flytter forsvaret
    function flyttForsvar(e){ 
        if(e.code == "ArrowLeft" && forsvar.x - forsvar.v >= 0){ //Sjekker om pilvenstre trykket på og flytter forsvaret
        forsvar.x  -= forsvar.v}
    
        else if(e.code == "ArrowRight" && forsvar.x + forsvar.v + forsvar.bredde <= brett.width){ //Sjekker om pilhoyre blir trykket på og flytter forsvar
        forsvar.x = forsvar.x + forsvar.v
    }
}

//Funksjon som generer skudd
function skyt(e){
    if (e.code == "Space"){ //Trykker spilleren på space dannes det et skuddobjekt som tegnes i oppdater. 
        let skudd ={
            x : forsvar.x + forsvar.bredde*15/32, //hvorfor 
            y : forsvar.y,
            v : skuddV,
            bredde : feltStr/8,
            hoyde : feltStr/2,
            brukt : false // sjekker om kula treffer angrep
        }
        let skytLyd = new Audio("../lyder/pew.mp3")
        if(volum){
            skytLyd.play()
        }

 
        skuddArr.push(skudd) // Dette som gjør at skuddene tegnes
    }

    //Hvis brukeren trykker på Enter og lengden på angriperdreptArr med andre ord hvor mange du har drept er over 5 legges det til et bombeelement i bombearr som tegnes i oppdater. 
    if(e.code == "Enter" && angriperDreptArr.length >= 5){
            let bombe = {
                x : forsvar.x + forsvar.bredde*15/32, //hvorfor 
                y : forsvar.y,
                bredde : feltStr/2,
                hoyde : feltStr/2,
                brukt : false // sjekker om kula treffer angrep
            }

            bombeArr.push(bombe)
            angriperDreptArr = []
        }
    }

    //Funksjoner til mobilkompatibilitet: 
    // Funksjoner som gjør det samme bare med designerte skjermknapper
function flyttForsvarVenstre(){
    if( forsvar.x - forsvar.v >= 0){
        forsvar.x  -= forsvar.v
    }
}
function flyttForsvarHoyre(){
    if(forsvar.x + forsvar.v + forsvar.bredde <= brett.width){
        forsvar.x = forsvar.x + forsvar.v
    }
}
// Funksjon som gjør det samme som skuyt på pc bare at det kalles med en skytknapp på skjerm 
    function skytMobil(){
        let skudd ={
            x : forsvar.x + forsvar.bredde*15/32, //hvorfor 
            y : forsvar.y,
            v : skuddV,
            bredde : feltStr/8,
            hoyde : feltStr/2,
            brukt : false // sjekker om kula treffer angrep
        }
        let skytLyd = new Audio("../lyder/pew.mp3")
        if(volum){
            skytLyd.play()
        }

 
        skuddArr.push(skudd)

}

// Funksjon som generer skudd fra angrepet
function angrepSkudd(){  
        let tilfeldig = Math.floor(Math.random()*angrepArr.length) //Velger en tilfeldig angriper fra angreparrayet som skal skytes fra
        let angriperSkudd ={
        x : angrepArr[tilfeldig].x + forsvar.bredde*15/32,
        y : angrepArr[tilfeldig].y,
        bredde : feltStr/8,
        hoyde : feltStr/2,
        brukt : false
    }
    angriperSkuddArr.push(angriperSkudd)

}

// Generell kollisjonsfunksjon som sjekker x og y koordinater til to objekter
function kollisjon(a,b){
    return a.x < b.x + b.bredde && // øverste venstre hjørne til a treffer ikke øverste høyre hjørne i b 
    a.x + a.bredde > b.x && // øverste høyrne hjørne i a går forbi øverste venstre hjørne b 
    a.y < b.y + b.hoyde && // as øverste venstre hjørne når ikke bs nederste venstre hjørne 
    a.y + a.hoyde > b.y;// as nedre venstree hjørne går forbi bs nedre venstre hjørne 

}

// Funksjon til Gameover 
function gameOverScreen(){

    //Viser lagreKnapp
    lagreBtn.classList.remove("gjem") 
    lagreBtn.classList.add("vis")

    //Fjerner muligheten til å fremdeles kunne skyte 
    removeEventListener("keydown", flyttForsvar)
    removeEventListener("keyup",skyt) // Forskjellen på keyup og keydown er at man må slippe også, kan ikke skyte automatisk
    skytBtn.removeEventListener("click", skytMobil)

    //fyller skjermen svart
    context.fillStyle = "#000000";
    context.fillRect(0,0,brett.width,brett.height)
    //Tegner melding 

    context.textAlign = "center"
    context.font = "50px Courier";
    context.fillStyle = "#FFFFFF"
    context.fillText("GAME OVER", brett.width/2, brett.height/2)
    context.font = "30px Courier"
    context.fillText(`DIN SCORE BLE: ${poeng}`, brett.width/2, brett.height/2 + 50)
    context.fillText(`Vil du lagre?`,brett.width/2,brett.height/2 + 100)
   }


// Funksjoner til knappene 

function restart(){
     window.location.reload()
}

function volumKontroll(){
    if(!volum){
        volum = true
        volumBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>` //Endrer volumikon basert på om lydenb står på eller ikke 
    }
    else{
        volum = false
        volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
    }
}


function lagre(){
    //VIser inputfeltet når brukeren har trykket på lagreknappen 
    inputEl.classList.remove("gjem")
    inputEl.classList.add("vis")
    leggTilBtn.classList.remove("gjem")
    leggTilBtn.classList.add("vis")
    brett.style.marginTop = "2.5%"

}

function leggTil(){
    // Lagrer Navn og PoengScore i Local Storage 
    localStorage.setItem(`${navnEl.value}`, poeng)
    leggTilBtn.innerHTML= `Din score ble lagt til!`
} 

