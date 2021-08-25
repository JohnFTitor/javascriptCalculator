function add(a,b) {return a+b};

function subs(a,b) {return a-b};

function mult(a,b) {return a*b};

function div(a,b) {
    if (b === 0){
        alert("Can't divide by zero you dummy");
        return;
    } 
    return (a / b);
}

function operate(operator, num1, num2) {
    switch (operator){
        case "+":
            return add(num1,num2);
        case "-":
            return subs(num1,num2);
        case "x":
            return mult(num1,num2);
        case "/":
            return div(num1,num2);                     
    }
}
