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
    markCompleted(){
        if (this.done === false){
            this.done = true;
        }
        else{
            this.done = false;
        }
    }
    changeName(){
        this.itemName = prompt("Please Enter a new task name: ");
    }
    changeTime(){
        this.time = prompt("Please Enter a new reminder time: ");
    }
    changeDesc(){
        this.description =  prompt("Please Enter a new task description: ");
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
// var theData = new MyData(listNum,taskNum,allLists);
(function(){
    if (localStorage.getItem("jerecsCalendar") !== null){
        let tempVar = localStorage.getItem("jerecsCalendar");
        let localData = JSON.parse(tempVar);
        listNum = localData.numOfLists;
        taskNum = localData.numOfTasks;
        let thisData = new MyData(listNum,taskNum,localData.theData);
        for (let i =0;i < thisData.theData.length;i++){
            allLists.push(new TaskList(thisData.theData[i].listID,thisData.theData[i].listName,[],thisData.theData[i].date,thisData.theData[i].active));
        }
        for (let x = 0;x<allLists.length;x++){
            if (thisData.theData[x] !== undefined){
                for (let y =0; y < thisData.theData[x].tasks.length;y++){
                    if(thisData.theData[x].tasks !== undefined){
                        allLists[x].tasks.push(new ToDoItem(thisData.theData[x].tasks[y].taskID,thisData.theData[x].tasks[y].itemName,thisData.theData[x].tasks[y].done,thisData.theData[x].tasks[y].time,thisData.theData[x].tasks[y].description));
                    }
                }
            }
        }
        // allLists = new TaskList(localData.theData.)localData.theData;
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

function drawPage(){
    domTasks.innerHTML = "";
    domAllLists.innerHTML = "<i onclick='addList()' class='far fa-plus-square'></i>";
    for (let i=0;i < allLists.length;i++){
        if (allLists[i].date === `${monthName.innerHTML}/${dateNum.innerHTML}`){
            if (allLists[i].active === true){
                domAllLists.innerHTML += `<span class="listBox active"><span onclick="switchList(this)" id="list${allLists[i].listID}">${allLists[i].listName}</span><i onclick="removeList(${allLists[i].listID})" class="fas fa-times"></i><i onclick="listEditor(${allLists[i].listID})" class="far fa-edit"></i></span>`;
            }
            else{
                domAllLists.innerHTML += `<span class="listBox"><span onclick="switchList(this)" id="list${allLists[i].listID}">${allLists[i].listName}</span><i onclick="removeList(${allLists[i].listID})" class="fas fa-times"></i><i onclick="listEditor(${allLists[i].listID})" class="far fa-edit"></i></span>`;
            }
        }
    }

    for (let y=0;y<allLists.length;y++){
        if (allLists[y].active === true){
            for (x=0;x<allLists[y].tasks.length;x++){
                if (allLists[y].tasks[x].done === true){
                    domTasks.innerHTML += `<li><div class="nameAndDone"><i onclick="completeTask(${allLists[y].tasks[x].taskID})" class="far fa-check-square"></i><h3 onclick="showDesc(${allLists[y].tasks[x].taskID})" class="striker">${allLists[y].tasks[x].itemName}</h3><i onclick="remover(${allLists[y].tasks[x].taskID})" class="fas fa-trash-alt"></i><i onclick="editor(${allLists[y].tasks[x].taskID})" class="far fa-edit"></i></div></li>`;
                }
                else{
                    domTasks.innerHTML += `<li><div class="nameAndDone"><i onclick="completeTask(${allLists[y].tasks[x].taskID})" class="far fa-square"></i><h3 onclick="showDesc(${allLists[y].tasks[x].taskID})">${allLists[y].tasks[x].itemName}</h3><i onclick="remover(${allLists[y].tasks[x].taskID})" class="fas fa-trash-alt"></i><i onclick="editor(${allLists[y].tasks[x].taskID})" class="far fa-edit"></i></div></li>`;
                }
            }
        }
    }
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
    var temp = element.id;
    // console.log(temp);
    currentList = Number(temp.slice(4));
    // console.log(typeof currentList);
    for (let y=0;y<allLists.length;y++){
        allLists[y].active = false;
    }
    for (let i = 0;i < allLists.length;i++){
        if (allLists[i].listID === currentList){
            allLists[i].active = true;
        }
    }
    drawPage();
}

function removeList(theID){
    for (let i = 0; i < allLists.length; i++){
        if (allLists[i].listID === theID){
            allLists.splice(i,1);
        }
    }
    drawPage();
    setStorage();
}

function listEditor(theID){
    for (let i = 0; i < allLists.length; i++){
        if (allLists[i].listID === theID){
            allLists[i].changeLName();
        }
    }
    drawPage();
    setStorage();
}

function addTask(){
    for (let i = 0;i < allLists.length;i++){
        allLists[i].active = false;
    }
    for (let i = 0;i < allLists.length;i++){
        if (allLists[i].listID === currentList){
            allLists[i].active = true;
            allLists[i].tasks.push(new ToDoItem(taskNum,userTaskName.value,false,userTaskTime.value,userTaskDesc.value));
        }
    }
    taskNum++;

    setStorage();
    clearFields();
    drawPage();
}

function completeTask(theID){
    for (let i = 0;i< allLists.length;i++){
        if (allLists[i].active === true){
            for (x=0;x<allLists[i].tasks.length;x++){
                if (allLists[i].tasks[x].taskID === theID){
                    allLists[i].tasks[x].markCompleted();
                }

            }
        }
    }
    drawPage();
    setStorage();
}

function remover(theID){
    for (let i = 0;i< allLists.length;i++){
        if (allLists[i].active === true){
            for (x=0;x<allLists[i].tasks.length;x++){
                if (allLists[i].tasks[x].taskID === theID){
                    allLists[i].tasks.splice(x,1);
                }

            }
        }
    }
    drawPage();
    setStorage();
}

function changeStuff(theID){
    for (let i = 0;i< allLists.length;i++){
        if (allLists[i].active === true){
            for (x=0;x<allLists[i].tasks.length;x++){
                if (allLists[i].tasks[x].taskID === theID){
                    allLists[i].tasks[x].itemName = userTaskName.value;
                    allLists[i].tasks[x].time = userTaskTime.value;
                    allLists[i].tasks[x].description = userTaskDesc.value;
                }
            }
        }
    }
    clearFields();
    document.getElementById("taskButton").setAttribute("onclick","addTask()");
    document.getElementById("taskButton").innerHTML = "SUBMIT TASK";
    setStorage();
    drawPage();
}

function editor(theID){
    for (let i = 0;i< allLists.length;i++){
        if (allLists[i].active === true){
            for (x=0;x<allLists[i].tasks.length;x++){
                if (allLists[i].tasks[x].taskID === theID){
                    alert("Please enter new information for the task");
                    document.getElementById("taskButton").setAttribute("onclick",`changeStuff(${theID})`);
                    document.getElementById("taskButton").innerHTML = "CHANGE TASK";
                }

            }
        }
    }
    drawPage();
    setStorage();
}

function showDesc(theID){
    for (let i = 0;i< allLists.length;i++){
        if (allLists[i].active === true){
            for (x=0;x<allLists[i].tasks.length;x++){
                if (allLists[i].tasks[x].taskID === theID){
                    alert(`Description: ${allLists[i].tasks[x].description} \n Due at(in 24 hour time): ${allLists[i].tasks[x].time}`);
                }

            }
        }
    }
    drawPage();
    setStorage();
}


drawPage();







let theDate = new Date();
let thisMonth = theDate.getMonth();
let thisYear = theDate.getFullYear();
let firstOfMonth = new Date(`${thisMonth + 1}/1/${thisYear}`);
let lastOfMonth = new Date(`${thisMonth + 2}/1/${thisYear}`);
console.log(firstOfMonth);
let firstDay = firstOfMonth.getDay();
let lastDay = lastOfMonth.getDay();
console.log(`${firstDay}, ${lastDay-1}`);
function fillContent(theID, theContent){
    return document.getElementById(theID).innerHTML = theContent;
}

function myFunc(childNumb, element) {
    // console.log(element);
    // console.log(document.querySelectorAll("td"));
    var myVar = document.querySelectorAll("td");
    // console.log(myVar);
    var myVarL = myVar.length;
    // console.log(myVarL);
    for (let i = 0; i < myVarL; i++){
        myVar[i].setAttribute("class", "");
    }
    //document.getElementsByTagName("td").setAttribute("class", "");
    element.setAttribute("class", "makegreen");
    document.getElementById("largeDay").innerHTML = element.innerHTML;
    if (childNumb == 1) {
        document.getElementById("largeDayName").innerHTML = "Sunday";
    }
    else if (childNumb == 2){
        document.getElementById("largeDayName").innerHTML = "Monday";
    }
    else if (childNumb == 3) {
        document.getElementById("largeDayName").innerHTML = "Tuesday";
    }
    else if (childNumb == 4) {
        document.getElementById("largeDayName").innerHTML = "Wednesday";
    }
    else if (childNumb == 5) {
        document.getElementById("largeDayName").innerHTML = "Thursday";
    }
    else if (childNumb == 6) {
        document.getElementById("largeDayName").innerHTML = "Friday";
    }
    else if (childNumb == 7) {
        document.getElementById("largeDayName").innerHTML = "Saturday";
    }
    for (let x=0;x< allLists.length;x++){
        allLists[x].active = false;
    }
    drawPage();
}
(function (month){
    switch(month){
        case 0:
            fillContent("monthHere","January");
            break;
        case 1:
            fillContent("monthHere", "February");
            break;
        case 2:
            fillContent("monthHere", "March");
            break;
        case 3:
            fillContent("monthHere", "April");
            break;
        case 4:
            fillContent("monthHere", "May");
            break;
        case 5:
            fillContent("monthHere", "June");
            break;
        case 6:
            fillContent("monthHere", "July");
            break;
        case 7:
            fillContent("monthHere", "August");
            break;
        case 8:
            fillContent("monthHere", "September");
            break;
        case 9:
            fillContent("monthHere", "October");
            break;
        case 10:
            fillContent("monthHere", "November");
            break;
        case 11:
            fillContent("monthHere", "December");
            break;
        default:
            console.log("error in month");
    }
    console.log(firstOfMonth);
})(thisMonth);
//35 td's
function fillCal(){
    for (let index = firstDay, indexDate = 1; index < document.getElementsByTagName("td").length-(7-lastDay);index++,indexDate++){
        let loopDate = new Date(`${thisMonth+1}/${indexDate}/${thisYear}`);
        document.getElementsByTagName("td")[index].innerHTML = indexDate.toString();
        document.getElementsByTagName("td")[index].setAttribute("onclick", `myFunc(${loopDate.getDay()+1}, this)`)
    }
    myFunc(theDate.getDay()+1,document.getElementsByTagName("td")[theDate.getDate()]);
}
fillCal();

// function checkTime(){
//     var timeLoop = new Date();
//     var theHour = timeLoop.getHours();
//     var theMinutes = timeLoop.getMinutes();
//     var theDay = timeLoop.getDay();
//     var theMonth = timeLoop.getMonth();
//     for (let i = 0; i < allLists.length; i++){
//         let temp = allLists[i].date.split("/");
//         switch(temp[0]){
//             case "January":
//                 temp[0] = 0;
//                 break;
//             case "February":
//                 temp[0] = 1;
//                 break;
//             case "March":
//                 temp[0] = 2;
//                 break;
//             case "April":
//                 temp[0] = 3;
//                 break;
//             case "May":
//                 temp[0] = 4;
//                 break;
//             case "June":
//                 temp[0] = 5;
//                 break;
//             case "July":
//                 temp[0] = 6;
//                 break;
//             case "August":
//                 temp[0] = 7;
//                 break;
//             case "September":
//                 temp[0] = 8;
//                 break;
//             case "October":
//                 temp[0] = 9;
//                 break;
//             case "November":
//                 temp[0] = 10;
//                 break;
//             case "December":
//                 temp[0] = 11;
//                 break;
//         }
//         if (temp[0] === theMonth){
//             if (temp[1] === theDay){
//                 for (let x = 0; x < allLists[i].tasks.length; x++){
//                     let temp2 = allLists[i].tasks[x].time.split(":");
//                     if (temp2[0] === theHour){
//                         if (temp2[1] === theMinutes){
//                             alert(`Your task of: ${allLists[i].tasks[x].itemName} is due now \n Description: ${allLists[i].tasks[x].description}`);
//                         }
//                     }
//
//                 }
//             }
//         }
//
//     }
//     checkTime();
// }
// checkTime();


