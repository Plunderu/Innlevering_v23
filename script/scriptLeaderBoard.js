//Henter Leaderboardtabellen fra DOM 
const leaderBoardEl = document.querySelector("#leaderBoard")

// Funksjon som henter ut all lagring fra Local Storage, Bortsett fra Tilbakemelding
function allLagring() {
    let arkiv = [] // Definerer et tomt array 
    let keys = Object.keys(localStorage) // Keys blir et array med alle objektenes key
    let key

        for (let i = 0; key = keys[i]; i++) { // Itererer gjennom Local Sotrage 
            if(keys[i] !== "Tilbakemelding"){ //Fjerner tilbakemeldingslagringen fra leaderboard
                arkiv.push([key, Number(localStorage.getItem(key))]); // Pusher lagring i Local Storage inn i arkivArray som et array inne i et array der key er første index og poengsum andre (flerdimensjonelt array)
            }
            
        }
        return arkiv;
    }


let brukerArr = allLagring()

// Funksjon som sorterer et array på det andre index. 

function sorter(array) {
    array.sort(function(a, b) { //Uten denne funksjonen ville sorter funksjonen sortert      local storagen etter alfabetisk rekkefølge, grunnet det er det som er første index i arrayet. 
        return b[1] - a[1];}
        );
    
    }
    
    sorter(brukerArr)

    for(let i = 0; i<brukerArr.length && i<20;i++){ //Legger til de 20 beste poengene i tabellen. 
        leaderBoardEl.innerHTML += 
        `<tr>
            <td id="plass">${i+1}</td>
            <td>${brukerArr[i][0]}</td>
            <td>${brukerArr[i][1]}</td>
        </tr>`  
    }






