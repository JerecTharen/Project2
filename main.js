let myTaskList = document.getElementById("taskList");
let myUserInput = document.getElementById("userInput");

let theList = [];

function addToList(){
    theList.push(`<li>${myUserInput.value}</li>`);
    myTaskList.innerHTML = "";
    for (let i = 0; i < theList.length; i ++){
        myTaskList.innerHTML += theList[i];
    }
    myUserInput.value = "";

}