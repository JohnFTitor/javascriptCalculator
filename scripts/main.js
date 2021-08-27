function add(a, b) { return a + b };

function subs(a, b) { return a - b };

function mult(a, b) { return a * b };

function div(a, b) {
    if (b === 0) {
        alert("Can't divide by zero you dummy");
        return;
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
    })   
})

let firstNumber = true;
let savedNumber = 0;
let clear = false;
let canOperate = false;
let previousOperator;
let operatorValue;

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
                display.textContent = (Math.round(savedNumber * 1000) / 1000);
                clear = true;
            }
            canOperate = false;
            previousOperator = operatorValue;
        }
    })
})

const equal = document.querySelector("#equal");
equal.addEventListener('click', () => {
    savedNumber = operate(operatorValue, savedNumber,displayValue);
    display.textContent = (Math.round(savedNumber * 1000) / 1000);
    displayValue = savedNumber;
    firstNumber = true;
    clear = true;
})


