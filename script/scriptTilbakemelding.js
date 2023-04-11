// Henter elementer fra DOM 
let kjonnEls = document.querySelectorAll("input[type=radio]")

let fantEls = document.querySelectorAll("input[type=checkbox]")

let ferdighetEls = document.querySelectorAll("option")

let annetEl = document.querySelector("textarea")

let submitBtn = document.querySelector("button[type=submit]")

// Tilbakemeldingsobjekt
tilbakemelding = {
    kjonn : "",
    fant: "",
    ferdighet: "",
    annet: "" 
}


submitBtn.addEventListener("click", sendTilbakemelding)

//funksjon som sender bestillingen 
function sendTilbakemelding(e){
    console.log(ferdighetEls.length)
    e.preventDefault()
    // e er hendelsesobjektet 
    // Vanlig å bruke evt eller event istedenfor e 
    console.log("sender bestilling")

    for(let i = 0; i<kjonnEls.length; i++){
        if(kjonnEls[i].checked){
            tilbakemelding.kjonn = kjonnEls[i].value
        }
    }

    fantArr = []

    for(let i = 0; i<fantEls.length; i++){
        if(fantEls[i].checked){
            fantArr.push(fantEls[i].value)
        }
    }

    tilbakemelding.fant = fantArr

    for(let i = 0; i < ferdighetEls.length; i++){
        if(ferdighetEls[i].selected){
            tilbakemelding.ferdighet = ferdighetEls[i].value
        }
    }

    tilbakemelding.annet = annetEl.value


    localStorage.setItem(`Tilbakemelding`, JSON.stringify(tilbakemelding))

    submitBtn.innerHTML = "Takk for din tilbakemelding"
}






