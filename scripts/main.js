function add(a, b) { return a + b };

function subs(a, b) { return a - b };

function mult(a, b) { return a * b };

function div(a, b) {
    if (b === 0) {
        alert("Can't divide by zero you dummy");
        return "error";
    }
    return (a / b);
}

function module(a,b){
    return a%b;
}

function square(a,b){
    return a**(1/b);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subs(num1, num2);
        case "*":
            return mult(num1, num2);
        case "/":
            return div(num1, num2);
        case "%":
            return module(num1,num2);
        case "sqr":
            return square(num1, num2);
    }   
}

function clearCalculator(){
    displayValue = 0;
    savedNumber = 0;
    canOperate = false;
    canEqual = false;
    firstEntry = false;
    clear = true;
    firstNumber = true;
    display.textContent = "";
}

function writeDisplay(value) {
    if (clear) {
        display.textContent = "";
        clear = false;
    }
    display.textContent += value;
    displayValue = parseFloat(display.textContent);
    console.log(displayValue);
    // console.log(display.textContent);
    canOperate = true;
    if (firstEntry){
        canEqual = true;
    }
}

function makeOperation(operator){
    if (canOperate) {
        operatorValue = operator.value;
        console.log(operatorValue);
        if (firstNumber) {
            savedNumber = displayValue;
            display.textContent = "";
            firstNumber = false;
        } else if (display.textContent != "") {
            savedNumber = operate(previousOperator, savedNumber, displayValue);
            if (savedNumber != "error") {
                display.textContent = (Math.round(savedNumber * 1000) / 1000);
                clear = true;  
            } 
        }

        if (savedNumber == "error") {
            clearCalculator();
        } else {
            firstEntry= true;
            canOperate = false;
            previousOperator = operatorValue;
        }
    }
}

function enterEqual(){
    if (canEqual){
        savedNumber = operate(operatorValue, savedNumber,displayValue);
        if (savedNumber == "error") {
            clearCalculator();
        }else {
            display.textContent = (Math.round(savedNumber * 1000) / 1000);
            displayValue = savedNumber;
            firstNumber = true;
            clear = true;
            canEqual = false;
            firstEntry = false;
        }    
    }
}

function erase(){
    let displayArray = display.textContent.split("");
    displayArray.pop();
    display.textContent = displayArray.join("");
    displayValue = parseFloat(display.textContent);
}

function displayDot(){
    if (display.textContent.indexOf(".") == -1){
        display.textContent += ".";
        displayValue = parseFloat(display.textContent);
    }
}


let firstNumber = true;
let savedNumber = 0;
let clear = false;
let canOperate = false;
let canEqual = false;
let firstEntry= false;
let previousOperator;
let operatorValue;
let keyTouch = new Audio("media/keyTouch.mp3");
let displayValue = 0;

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll(".numbers");
numberButtons.forEach((number) => {
    let value  = number.value;
    // console.log(value);
    number.addEventListener('click', () => writeDisplay(value));   
})


const operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
    operator.addEventListener('click', () => makeOperation(operator));
})

const equal = document.querySelector("#equal");
equal.addEventListener('click', enterEqual);

const clearButton =document.querySelector("#clear");
clearButton.addEventListener('click', clearCalculator);

const calcButtons = document.querySelectorAll(".calcButtons");
calcButtons.forEach(calcButton => {
    calcButton.addEventListener('click', () => keyTouch.play());
});

const dot = document.querySelector("#dot");
dot.addEventListener('click', displayDot);

const backspace = document.querySelector("#backspace");
backspace.addEventListener('click', erase);

let operatorsList = ["/", "*", "-", "+"];

document.addEventListener('keyup', (event) => {
    keyTouch.play();
    if (operatorsList.includes(event.key)){
        let operator = {
            value: event.key,
        }
        makeOperation(operator);
    } else if (event.key === "Enter" ){
        enterEqual();
    } else if (event.key === "."){
        displayDot();
    } else if (event.key === "Backspace"){
        erase();
    }else {
        let value = parseInt(event.key);
        if (value >= 0 && value <= 9){
            writeDisplay(value);
        }
    }
})