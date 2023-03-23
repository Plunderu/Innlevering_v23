// Brettet: 
let feltStr = 32;
let rader = 16; 
let kolonner = 16; 

//Definerer størrelsen på brettet 
let brettBredde = feltStr*kolonner // 32*16
let brettHoyde = feltStr*rader // 32*16

let context;  // bruk av context må skjønnes 


// Lager objekt for forsvar
let forsvar = {
    x : feltStr * kolonner/2- feltStr,
    y : feltStr * rader - feltStr*2, 
    v : feltStr,
    bredde : feltStr * 2,
    hoyde : feltStr,
    bilde : new Image()
}

// Angrep
let angrepArr = [];
let skuddArr = [];
let skuddV = -10
/* 
// Lager objekt for angrep
let angrep = {
    x : feltStr,
    y : feltStr,
    v : 0.4,
    bredde : feltStr*2,
    hoyde : feltStr,
    rader : 2,
    kolonner : 3, 
    antall : 0,
    levende: true,
    bilde : new Image()
} */

let ncols = 3
let nrows = 2


//"https://raw.githubusercontent.com/ImKennyYip/space-invaders/master/alien-magenta.png"

function lagAngrepD(){
    for (let c = 0; c < ncols; c++){
         for( let r = 0; r < nrows; r++){
              let angriper = {
                bredde : feltStr*2,
                hoyde : feltStr,
                x : feltStr + c*feltStr*2,
                y : feltStr + r*feltStr,
                v : 6,
                levende : true,
                bilde : new Image(),
                antall: 0
             } 

             angriper.bilde.src = "https://raw.githubusercontent.com/ImKennyYip/space-invaders/master/alien-magenta.png"
            
             //console.log(angrepArr)
          /*    console.log(c*angrep.bredde)
             console.log("Angriper.x: " + angriper.x)
              */
 
             angrepArr.push(angriper)
             angriper.antall = angrepArr.length
         }
 
     }
     //angrep.antall = angrepArr.length
     console.log(angrepArr)
}




//Når nettsiden laster inn skal brettet tegnes
window.onload = function(){
    brett = document.getElementById("brett");
    brett.width = brettBredde;
    brett.height = brettHoyde;
    context = brett.getContext("2d"); //Dette brukes for å tegne på brettet

    //Setter bildet til forsvar
    forsvar.bilde.src = "https://www.pngall.com/wp-content/uploads/13/Space-Invaders-Ship.png"
    context.drawImage(forsvar.bilde, forsvar.x,forsvar.y,forsvar.bredde,forsvar.hoyde)

     //lagAngrep()
     lagAngrepD()

    // Tegner angrep 
    //context.drawImage(angrepArr[0].bilde, angrepArr[0].x,angrepArr[0].y,angrepArr[0].bredde,angrepArr[0].hoyde)
    
   
    // Setter nettsiden til å oppdatere for å lage en animasjon 
    requestAnimationFrame(oppdater)

    addEventListener("keydown", flyttForsvar)

    addEventListener("keyup",skyt) // Forskjellen på keyup og keydown er at man må slippe også, kan ikke skyte automatisk 
}
// Lager en uendelig loop med oppateringer (animasjon)
function oppdater(){
    // for å vise at den kjøres hele tiden 
    // console.log("oppdateres")
    requestAnimationFrame(oppdater)

    context.clearRect(0,0,brett.width, brett.height) // Klarerer lerretet for hver gang 

    //Oppdaterer bildet til forsvar
    context.drawImage(forsvar.bilde, forsvar.x,forsvar.y,forsvar.bredde,forsvar.hoyde)
    
 
     for(let i = 0; i < angrepArr.length; i ++){
        angriper = angrepArr[i];

         /* if(angriper.levende){
            context.drawImage(angriper.bilde, angriper.x,angriper.y,angriper.bredde,angriper.hoyde)
            if (angrepArr[i].x > 0 && angriper.x + angriper.bredde < brett.width) { 
                angriper.x = angriper.x + angriper.v
            }
            // Når angrepet treffer veggene
            else{
                angriper.v = angriper.v * -1
                angriper.x = angriper.x + angriper.v*2
                if (i == angrepArr.length-1){
                
                // Beveger angrepet en rad nærmere: 
                for (let j = 0; j < angrepArr.length; j++){
                    angrepArr[j].y += angriper.hoyde
                
                } 
            }
           }
        } */

        /* Didrik prøver seg */
        context.drawImage(angriper.bilde, angriper.x,angriper.y,angriper.bredde,angriper.hoyde)

        angriperLeft = angrepArr[0]
      /*   angriperMid = angrepArr[1] */
        angriperRight = angrepArr[angrepArr.length-1]
       
        console.log(angriperLeft)
        if (angriperRight.x + angriper.bredde >= brett.width  /* || angriperLeft.x <= 0  */ ) { 
            angriper.v *= -1
            angriper.y += angriper.hoyde

        }

        else if ( angriperLeft.x <= 0){
            angriper.v *= -1
            angriperLeft.x = angriper.x + angriper.v*2
            
            //angriperLeft.x = -1
/*             angriper.y += angriper.hoyde */
            
            //console.log(angriperLeft.x)
            //console.log("angriperfart" + angriperLeft.v)

        }

        angriper.x += angriper.v

        }

        // Kuler 
        for (let i = 0; i< skuddArr.length; i++){
            skudd = skuddArr[i];
            skudd.y += skuddV; 
            context.fillStyle= "white";
            context.fillRect(skudd.x,skudd.y,skudd.bredde,skudd.hoyde)

            // Kulenes kollisjon med angrep 

            for (let j = 0; j < angrepArr.length; j++){
                angriper = angrepArr[j];
                if(!skudd.brukt && angriper.levende && kollisjon(skudd, angriper)){
                    skudd.brukt = true
                    angriper.levende = false
                    angrepArr.splice(j, 1) // fjerner elemetet som blir skutt 
                    angriper.antall -= 1

            

                }

            }
        }

        // Fjerner kulene etter at de er blitt brukt 

        while(skuddArr.length > 0 && (skuddArr[0]. brukt || skuddArr[0].y < 0)){
           skuddArr.shift() //Fjerner det første elementet i arrayet.  
        }
    
    } 
 




// funksjon som flytter forsvaret
function flyttForsvar(e){
    console.log(forsvar.x)
    if(e.code == "ArrowLeft" && forsvar.x - forsvar.v >= 0){
        forsvar.x  -= forsvar.v

    }
    else if(e.code == "ArrowRight" && forsvar.x + forsvar.v + forsvar.bredde <= brett.width){
        forsvar.x = forsvar.x + forsvar.v
    }
}


 /* function lagAngrep(){
    for (let c = 0; c < angrep.kolonner; c++){
         console.log("c: " + c) 
        for( let r = 0; r < angrep.rader; r ++){
             console.log("r:" + r) 
               angrep = {
                x : angrep.x + c*angrep.bredde,
                y : angrep.y + r*angrep.hoyde,
                bredde : angrep.bredde,
                hoyde : angrep.hoyde,
                levende : true 
               } 
            
             angriper = {
               x : angrep.x + c*angrep.bredde,
               y : angrep.y + r*angrep.hoyde,
               bredde : angrep.bredde,
               hoyde : angrep.hoyde,
               v : 2,
               levende : true 
            } 
            console.log(angrepArr)
             console.log(c*angrep.bredde)
            console.log("Angriper.x: " + angriper.x)
             

            angrepArr.push(angriper)
        }

    }
    angrep.antall = angrepArr.length
    console.log(angrepArr)
} 
  */
function skyt(e){
    if (e.code == "Space"){
        let skudd ={
            x : forsvar.x + forsvar.bredde*15/32, //hvorfor 
            y : forsvar.y,
            bredde : feltStr/8,
            hoyde : feltStr/2,
            brukt : false // sjekker om kula treffer angrep
        }
        skuddArr.push(skudd)
    }
}

function kollisjon(a,b){
    return a.x < b.x + b.bredde && // øverste venstre hjørne til a treffer ikke øverste høyre hjørne i b 
    a.x + a.bredde > b.x && // øverste høyrne hjørne i a går forbi øverste venstre hjørne b 
    a.y < b.y + b.hoyde && // as øverste venstre hjørne når ikke bs nederste venstre hjørne 
    a.y + a.hoyde > b.y;// as nedre venstree hjørne går forbi bs nedre venstre hjørne 

    
}
