let myTaskList = document.getElementById("taskList");
let myUserInput = document.getElementById("userInput");

let theList = [];
let anotherList = [];
function toMakeGreen(element){
    let listItems = myTaskList.getElementsByTagName("li");
    let checkers = myTaskList.getElementsByTagName("input");
    let idNum = element.id.slice(7);

    if (document.getElementById(`myCheck${idNum}`).checked){
        document.getElementById(`myItem${idNum}`).setAttribute("class","makegreen");
    }
    else {
        document.getElementById(`myItem${idNum}`).setAttribute("class","");
    }

    // switch(document.getElementById(`myCheck${idNum}`).checked){
    //     case false:
    //         document.getElementById(`myItem${idNum}`).setAttribute("class","makegreen");
    //         break;
    //     case true:
    //         document.getElementById(`myItem${idNum}`).setAttribute("class","");
    //         break;
    // }
    // document.getElementById(`myItem${idNum}`).setAttribute("class","makegreen");


}

// function findGreen(){
//     let isGreen = [];
//
//     return isGreen;
// }

function addToList(){
    theList.push(`<li>${myUserInput.value}</li><input type="checkbox">`);
    let isGreen= [];
    switch(theList.length){
        case 1:
            break;
        default:
            for (let y = 0; y < theList.length-1; y ++) {
                if (document.getElementById(`myItem${y}`).className !== "") {
                    isGreen.push(y);
                }
                console.log(isGreen);
            }
            break;
    }

    myTaskList.innerHTML = "";
    for (let i = 0; i < theList.length; i ++){
        myTaskList.innerHTML += theList[i];
    }
    let listItems = myTaskList.getElementsByTagName("li");
    let checkers = myTaskList.getElementsByTagName("input");
    for (let x = 0; x < listItems.length; x++){
        listItems[x].setAttribute(`id`, `myItem${x}`);
        checkers[x].setAttribute(`id`, `myCheck${x}`);
        checkers[x].setAttribute("onclick", "toMakeGreen(this)");
        listItems[x].setAttribute("class", "");
    }
    for (let xy = 0; xy < isGreen.length; xy ++){
        listItems[isGreen[xy]].setAttribute("class", "makegreen");
        checkers[isGreen[xy]].checked = true;
    }
    console.log(myTaskList.innerHTML);
    myUserInput.value = "";
}