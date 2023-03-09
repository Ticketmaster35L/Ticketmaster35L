const prompt = require("prompt-sync")();

let bugName = prompt("Please enter your issue. ", "A problem with code.");
let bugStatus = prompt("Please enter the status of your issue. ", "status");
let assignedPerson = prompt("Please specify which person this issue is for. ", "John Doe");

let dateBase = new Date();
let currentDay = dateBase.getDate();
let currentMonth = dateBase.getMonth();
let currentYear = dateBase.getFullYear();
let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

const ticket = {name: bugName, status: bugStatus, creationDate: currentDate, assignedUser: assignedPerson};

//console.log(ticket.name);

//console.log(ticket.status);

//console.log(ticket.creationDate);

//console.log(ticket.assignedUser);

jsonString = JSON.stringify(ticket);

module.exports = { 
    'jsonString': jsonString
}

//console.log(jsonString);



//Whichever file importing the JSON must set the appropriate variable
//to 'require('./processJSON.js')' if it is to use jsonString as the
//value of that variable

