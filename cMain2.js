class MyData {
    constructor(numOfLists,numOfTasks,theData){
        this.numOfLists = numOfLists;
        this.numOfTasks = numOfTasks;
        this.theData = theData;
    }
}

class TaskList {
    constructor(listID, listName,tasks,date){
        this.listID = listID;
        this.listName= listName;
        this.tasks = tasks;
        this.date = date;
    }
    changeLName(){
        this.listName = prompt("Please enter a list name");
    }
    addToTasks(){
        this.tasks.push(new ToDoItem(taskNum, userTaskName.value,false,userTaskTime.value,userTaskDesc.value));
        taskNum++;
    }
    removeFromTasks(taskID){
        this.tasks.splice(taskID,1);
    }
    changeLTime(){
        theDate = grabDate();
        this.date = theDate;
    }
}

class ToDoItem {
    constructor(taskID, itemName, done, time,description){
        this.taskID = taskID;
        this.itemName = itemName;
        this.done = done;
        this.time = time;
        this.description = description;
    }
    markComplted(){
        this.done = true;
    }
    changeName(){
        this.itemName = userTaskName.value;
    }
    changeTime(){
        this.time = userTaskTime.value;
    }
    changeDesc(){
        this.description = userTaskDesc;
    }
}


var domAllLists = document.getElementById("allLists");
var domTasks = document.getElementById("allTasks");
var userTaskName = document.getElementById("taskName");
var userTaskDesc = document.getElementById("taskDescription");
var userTaskTime = document.getElementById("taskTime");
var dateNum = document.getElementById("largeDay");
var monthName = document.getElementById("monthHere");
var listNum = 0;
var taskNum = 0;
var allLists = [];
var currentList = undefined;
var theData = new MyData(listNum,taskNum,allLists);
(function(){
    if (localStorage.getItem("jerecsCalendar") !== null){
        let tempVar = localStorage.getItem("jerecsCalendar");
        sessionData = JSON.parse(tempVar);
        listNum = sessionData.numOfLists;
        taskNum = sessionData.numOfTasks;
        allLists = sessionData.theData;
    }

})();


function clearFields(){
    userTaskName.value = "";
    userTaskDesc.value = "";
    userTaskTime.value = "";
}
clearFields();

function grabDate(){
    return `${monthName.innerHTML}/${dateNum.innerHTML}`;
}



function addList(){
    allLists.push(new TaskList(listNum,prompt('Please Enter a Name For your List'),[],grabDate()));
    listNum++;
    localStorage.setItem('jerecsCalendar',JSON.stringify(allLists));
    clearFields();
}

function switchList(element){
    currentList = element.id;
}

function addTask(){
    allLists[currentList].tasks.push(new ToDoItem(taskNum,userTaskName.value,false,userTaskTime.value,userTaskDesc.value));
    taskNum++;
    localStorage.setItem('jerecsCalendar',JSON.stringify(allLists));
    clearFields();
}