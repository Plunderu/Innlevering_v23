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

/* function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push(localStorage.getItem(keys[i]) );
    }
    console.log(values)
    return values;

    
} */

function allStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( [key, Number(localStorage.getItem(key))]);
    }
    archive.sort()

    return archive;
}

let a = allStorage()






