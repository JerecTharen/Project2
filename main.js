let myTaskList = document.getElementById("taskList");
let myUserInput = document.getElementById("userInput");

let theList = [];

function toMakeGreen(element){
    let listItems = myTaskList.getElementsByTagName("li");
    let checkers = myTaskList.getElementsByTagName("input");
    let idNum = element.id.slice(7);
    document.getElementById(`myItem${idNum}`).setAttribute("class","makegreen");


}

function addToList(){
    theList.push(`<li>${myUserInput.value}</li><input type="checkbox">`);
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
    }
    console.log(myTaskList.innerHTML);
    myUserInput.value = "";
}