var domAllLists = document.getElementById("allLists");
var domTasks = document.getElementById("allTasks");
var allLists = [];

function clearFields(){
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskTime").value = "";
}
clearFields();


class TaskList {
    constructor(listName,tasks,date){
        this.listName= listName;
        this.tasks = tasks;
        this.date = date;
    }
    findsList(){

    }
}

class ToDoItem {
    constructor(itemName, done, time,description){
        this.itemName = itemName;
        this.done = done;
        this.time = time;
        this.description = description;
    }
    markComplted(){
        this.done = true;
    }
}


function addList(){
    var dateNum = document.getElementById("largeDay").innerHTML;
    var monthName = document.getElementById("monthHere").innerHTML;
    var date = `${monthName}/${dateNum}`;
    var listName = prompt("Enter the list name: ");
    if (listName === ""){

    }
    else{
        allLists.push(new TaskList(listName,[],date));
        domAllLists.innerHTML = "<i onclick='addList()' class='far fa-plus-square'></i>";
        for (let i=0;i<allLists.length;i++){
            domAllLists.innerHTML += `<span class="listBox">${allLists[i].listName}</span>`;
        }
        // window.localStorage.setItem('all',allLists);
        // console.log(allLists);
    }
    localStorage.setItem('the tasks',JSON.stringify(allLists));
}


function addTask(){
    var dateNum = document.getElementById("largeDay").innerHTML;
    var monthName = document.getElementById("monthHere").innerHTML;
    var date = `${monthName}/${dateNum}`;
    var theList = undefined;
    for (let i = 0;i <allLists.length;i++){
        if (allLists[i].date === date){}
        theList = i;
    }
    var name = document.getElementById("taskName").value;
    var desc = document.getElementById("taskDescription").value;
    var time = document.getElementById("taskTime").value;
    allLists[theList].tasks.push(new ToDoItem(name,false,time,desc));
    // console.log(allLists[theList]);
    domTasks.innerHTML = "";
    for (let i = 0; i < allLists[theList].tasks.length; i++){
        domTasks.innerHTML += `<li><div class="nameAndDone"><i onclick="completeTask(this)" class="far fa-square"></i><h3>${allLists[theList].tasks[i].itemName}</h3><i onclick="remover(this)" class="fas fa-trash-alt"></i><i onclick="editor(this)" class="far fa-edit"></i></div></li>`;
    }
    clearFields();
    localStorage.setItem('the tasks',JSON.stringify(allLists));
}


function completeTask(element){
    var dateNum = document.getElementById("largeDay").innerHTML;
    var monthName = document.getElementById("monthHere").innerHTML;
    var date = `${monthName}/${dateNum}`;
    var theList = undefined;
    for (let i = 0;i <allLists.length;i++){
        if (allLists[i].date === date){}
        theList = i;
    }
    var theTask = undefined;
    var taskNamer = element.parentElement.getElementsByTagName("h3")[0];
    for (let i = 0; i < allLists[theList].tasks.length;i++){
        if (allLists[theList].tasks[i].itemName === taskNamer.innerHTML){
            theTask = i;
        }
    }
    if (allLists[theList].tasks[theTask].done === false){
        taskNamer.setAttribute("class","");
        element.setAttribute("class","far fa-check-square");
        allLists[theList].tasks[theTask].done = true;
        taskNamer.setAttribute("class","makegreen striker");
    }
    else if(allLists[theList].tasks[theTask].done === true){
        taskNamer.setAttribute("class","");
        element.setAttribute("class","far fa-square");
        allLists[theList].tasks[theTask].done = false;
    }
}

function editor(element){

}


function remover(element){
    var dateNum = document.getElementById("largeDay").innerHTML;
    var monthName = document.getElementById("monthHere").innerHTML;
    var date = `${monthName}/${dateNum}`;
    var theList = undefined;
    for (let i = 0;i <allLists.length;i++){
        if (allLists[i].date === date){}
        theList = i;
    }
    var theTask = undefined;
    var taskNamer = element.parentElement.getElementsByTagName("h3")[0];
    for (let i = 0; i < allLists[theList].tasks.length;i++){
        if (allLists[theList].tasks[i].itemName === taskNamer.innerHTML){
            theTask = i;
        }
    }
    allLists[theList].tasks.splice(theTask,1);
    domTasks.innerHTML = "";
    for (let i = 0; i < allLists[theList].tasks.length; i++){
        domTasks.innerHTML += `<li><div class="nameAndDone"><i onclick="completeTask(this)" class="far fa-square"></i><h3>${allLists[theList].tasks[i].itemName}</h3><i onclick="remover(this)" class="fas fa-trash-alt"></i><i onclick="editor(this)" class="far fa-edit"></i></div></li>`;
    }
}