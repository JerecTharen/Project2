let myTaskList = document.getElementById("taskList");
let myUserInput = document.getElementById("userInput");

let theList = [];

function addToList(){
    theList.push(`<li>${myUserInput.value}</li>`);
    myTaskList.innerHTML = "";
    for (let i = 0; i < theList.length; i ++){
        myTaskList.innerHTML += theList[i];
    }
    let listItems = myTaskList.getElementsByTagName("li");
    for (let x = 0; x < listItems.length; x++){
        listItems[x].setAttribute(`id`, `myItem${x}`);
    }
    console.log(myTaskList.innerHTML);
    myUserInput.value = "";
}