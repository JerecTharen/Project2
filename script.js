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
    let myVar = document.querySelectorAll("td");
    // console.log(myVar);
    let myVarL = myVar.length;
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
}
fillCal();
