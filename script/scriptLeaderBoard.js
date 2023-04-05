const leaderBoardEl = document.querySelector("#leaderBoard")

/* let brukerArr = []
for(let i = 0; i<localStorage.length; i++){
    console.log(localStorage.getItem[i])
}
console.log(localStorage)
leaderBoardEl.innerHTML += `<tr>
<td>1</td>
<td>${localStorage.getItem("Eirik")}</td>
<td></td>
</tr>`   */


function allLagring() {

    let arkiv = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) { //Dette må skjønnes
        arkiv.push( [key, Number(localStorage.getItem(key))]);
    }

    return arkiv;
}

let brukerArr = allLagring()

//write a function to sort a two-dimensinal array by the second element

function sorter(array) {
    array.sort(function(a, b) {
        return b[1] - a[1];
     });
    
    }
    
    sorter(brukerArr)
    
    console.log(brukerArr)

    for(let i = 0; i<brukerArr.length;i++){
        leaderBoardEl.innerHTML += 
        `<tr>
            <td id="plass">${i+1}</td>
            <td>${brukerArr[i][0]}</td>
            <td>${brukerArr[i][1]}</td>
        </tr>`  
    }






