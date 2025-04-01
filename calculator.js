//FOUR BASIC MATHS OPERATIONS

function add (a, b ) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b ) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


//VARIABLES FOR THE MATHS EXPRESSION

let numberOne;
let operator;
let numberTwo;

/*THINK OPERATOR PARAMETER HAS TO BE A FUNCTION*/

function operate(numberOne, operator, numberTwo) {

     let value = "";

    switch (operator) {
        
        case "+": 
            value = add(numberOne, numberTwo);
            break;

        case "-": 
            value = subtract(numberOne, numberTwo);
            break;

        case "*": 
            value = multiply(numberOne, numberTwo);
            break;

        case "/": 
            value = divide(numberOne, numberTwo);
            break;

        default: console.log("That is not a arthmetic operator");

    }
    return value;
}

/*DISPLAY TEXT SELECT AND UPDATE CODE*/

/*TODO LIST*/
/*when numbers get to big for display stop showing them*/


let displayNumber = 0;


let displayText = document.querySelector("#display-text");
displayText.textContent = displayNumber;


function addToDisplay(displayNum, eventTargetNum) {
    if (displayNum === 0) {
        displayNumber = eventTargetNum;
        return displayNumber;
    }

    let eventNumString = String(eventTargetNum);
    let displayNumToString = String(displayNum);

    if (displayNumToString.length >= 9) {
        return displayNumToString;
    }
    
    displayNumber += eventNumString;

    return displayNumber;
}


let numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        let eventNum = event.target.textContent;
        displayText.textContent = addToDisplay(displayNumber, eventNum);
        //   alert(displayNumber);
    });
    // number.removeEventListener("click", () => {
    //     if (displayNumber >= ) {
    //     }
    // })
});


