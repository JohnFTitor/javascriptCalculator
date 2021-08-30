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

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subs(num1, num2);
        case "x":
            return mult(num1, num2);
        case "/":
            return div(num1, num2);
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

let firstNumber = true;
let savedNumber = 0;
let clear = false;
let canOperate = false;
let canEqual = false;
let firstEntry= false;
let previousOperator;
let operatorValue;
let keyTouch = new Audio("media/keyTouch.mp3");

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll(".numbers");
let displayValue = 0;
numberButtons.forEach((number) => {
    let value  = number.value;
    // console.log(value);
    number.addEventListener('click', () => {
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
    })   
})


const operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
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
    })
})

const equal = document.querySelector("#equal");
equal.addEventListener('click', () => {
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
})

const clearButton =document.querySelector("#clear");
clearButton.addEventListener('click', clearCalculator);

const calcButtons = document.querySelectorAll(".calcButtons");
calcButtons.forEach(calcButton => {
    calcButton.addEventListener('click', () => keyTouch.play());
});

