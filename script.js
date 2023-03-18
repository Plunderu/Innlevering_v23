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

    // Tegner angrep 
    angrep.bilde.src = "angrep.png"
    context.drawImage(angrep.bilde, angrep.x,angrep.y,angrep.bredde,angrep.hoyde)
    
    lagAngrep()
    
    // Setter nettsiden til å oppdatere for å lage en animasjon 
    requestAnimationFrame(oppdater)

    addEventListener("keydown", flyttForsvar)
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
        context.drawImage(angrep.bilde, angriper.x,angriper.y,angriper.bredde,angriper.hoyde)
         if(angriper.levende){
            if (angriper.x > 0 && angriper.x + angriper.bredde < brett.width) { 
                angriper.x = angriper.x + angriper.v
            }
            else{
                angriper.v = angriper.v * -1
                angriper.x = angriper.x + angriper.v
           }
        }  
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

function lagAngrep(){
    for (let c = 0; c < angrep.kolonner; c++){
       /*  console.log("c: " + c) */
        for( let r = 0; r < angrep.rader; r ++){
            /* console.log("r:" + r) */
/*                angrep = {
                x : angrep.x + c*angrep.bredde,
                y : angrep.y + r*angrep.hoyde,
                bredde : angrep.bredde,
                hoyde : angrep.hoyde,
                levende : true 
               } */
             angriper = {
               x : angrep.x + c*angrep.bredde,
               y : angrep.y + r*angrep.hoyde,
               bredde : angrep.bredde,
               hoyde : angrep.hoyde,
               v : 2,
               levende : true 
            } 
            //console.log(angrepArr)
         /*    console.log(c*angrep.bredde)
            console.log("Angriper.x: " + angriper.x)
             */

            angrepArr.push(angriper)
        }

    }
    angrep.antall = angrepArr.length
    console.log(angrepArr)
}











