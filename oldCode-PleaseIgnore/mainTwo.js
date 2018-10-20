let userI = document.getElementById("userInput");
let taskSpace = document.getElementById("taskList");
let allTasks = [];

class Task{
    constructor(taskNum){
        this.listI = `<li id="item${taskNum}">${userI.value}</li>`;
        this.delBTN = `<button id="delete${taskNum}" onclick="">DELETE TASK</button>`;
        this.editBTN = `<button id="edit${taskNum}" onclick="">EDIT TASK</button>`;
        this.checkBox = `<input id="check${taskNum}" type="checkbox">`;
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
