/*
Wilson Chu
Feb 9, 2024
Activity06 - Variables
*/
console.log("---- I am in V A R I A B L E S ----");

console.log("Q1 ---------------");
var var1 = "Iowa";
console.log(var1);

var var1 = 124;
console.log(var1);

console.log("Yes");

// Q2 : Is it valid ?
console.log("Q2 ----------------");
let var2 = "Ames";
console.log(var2);
var2 = 124;
// Is it valid ?
console.log("Not");

console.log("Q3 ----------------");
let var3 = "ISU";
console.log(var3);
var3 = 2023;
console.log(var3);
console.log("Valid ? Yes")

console.log("Q4 ----------------");
let var4;
const var5 = 1;
console.log("What's the error : Const is not given a value");

console.log("Q5 ----------------");
const var6 = 3.1415;
var6 = 2.8;
console.log("What's the error : Can't change value of a const");

let first_name = "Abraham";
console.log(" Can't have a space in between variable name ");
let numbers = [1,2];
console.log("Can't use numbers at the start of a variable name");
let citystate = "Ames Iowa";
console.log(" Can't have a dash in beteween variable name ");

let mainCity = "DesMoines";
console.log("This is the Capital :", MainCity)
console.log("Main city variable doesn't match up with the camel cased version declared earlier")

if (5 === 5) {
    var var7 = 100;
    }
    console.log(var7);
    if (5 === 5) {
    let var8 = 100;
    }
    console.log(var8);
    console.log("let has it's scope limited to only the body of code it resides in")
    