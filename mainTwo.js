let userI = document.getElementById("userInput");
let taskSpace = document.getElementById("taskList");
let allTasks = [];

class Task{
    constructor(){
        this.listI = `<li>${userI.value}</li>`;
        this.delBTN = `<button onclick="">DELETE TASK</button>`;
        this.editBTN = `<button onclick="">EDIT TASK</button>`;
        this.checkBox = `<input type="checkbox">`;
    }
}

function addToList(){
    let aTask = new Task();

    userI.value = "";
    taskSpace.innerHTML = "";
    for (i=0;i<allTasks.length;i++){
        taskSpace.innerHTML += allTasks[i];
    }
}
