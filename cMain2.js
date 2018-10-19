class MyData {
    constructor(numOfLists,numOfTasks,theData){
        this.numOfLists = numOfLists;
        this.numOfTasks = numOfTasks;
        this.theData = theData;
    }
}

class TaskList {
    constructor(listID, listName,tasks,date,active){
        this.listID = listID;
        this.listName= listName;
        this.tasks = tasks;
        this.date = date;
        this.active = active;
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
        let localData = JSON.parse(tempVar);
        listNum = localData.numOfLists;
        taskNum = localData.numOfTasks;
        allLists = localData.theData;
    }

})();

function setStorage(){
    var temp = new MyData(listNum,taskNum,allLists);
    localStorage.setItem('jerecsCalendar',JSON.stringify(temp));
}


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
    for (let i = 0;i < allLists.length;i++){
        allLists[i].active = false;
    }
    allLists.push(new TaskList(listNum,prompt('Please Enter a Name For your List'),[],grabDate(),true));
    currentList = listNum;
    listNum++;
    setStorage();
    clearFields();
    drawPage();
}

function switchList(element){
    currentList = element.id;
}

function addTask(){
    for (let i = 0;i < allLists.length;i++){
        allLists[i].active = false;
    }
    allLists[currentList].tasks.push(new ToDoItem(taskNum,userTaskName.value,false,userTaskTime.value,userTaskDesc.value));
    taskNum++;
    for (let i = 0;i < allLists.length;i++){
        allLists[i].active = false;
    }
    setStorage();
    clearFields();
    drawPage();
}

function drawPage(){
    domAllLists.innerHTML = "<i onclick='addList()' class='far fa-plus-square'></i>";
    for (let i=0;i < allLists.length;i++){
        if (allLists[i].date === `${monthName.innerHTML}/${dateNum.innerHTML}`){
            if (allLists[i].active === true){
                domAllLists.innerHTML += `<span id="list${allLists[i].listID}" class="listBox active">${allLists[i].listName}</span>`;
            }
            else{
                domAllLists.innerHTML += `<span id="list${allLists[i].listID}" class="listBox">${allLists[i].listName}</span>`;
            }
        }
    }
    // for (let i=0;i<allLists.length;i++){
    //     domAllLists.innerHTML += `<span class="listBox">${allLists[i].listName}</span>`;
    // }
}
drawPage();
