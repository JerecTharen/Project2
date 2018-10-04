
function myFunc(childNumb, element) {
    console.log(element);
    console.log(document.querySelectorAll("td"));
    let myVar = document.querySelectorAll("td");
    console.log(myVar);
    let myVarL = myVar.length;
    console.log(myVarL);
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