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
/*when numbers get too big for display stop showing them*/


let displayNumber = "0";


let displayText = document.querySelector("#display-text");
displayText.textContent = displayNumber;

/*TODO: Remove event when displaynumber gets to 9*/


function addToDisplay(displayNum, event) {

    ++numbers.count;
    let eventNum = event.target.textContent;
    
    if (displayNum === "0") {
        displayNumber = eventNum;
        return displayNumber;
    }

    if (numbers.count >= 9) {
        return displayNum;
    }

    displayNumber = displayNum + eventNum;
    

    return displayNumber;
}


let numbers = document.querySelectorAll(".number");


//add tally for tally of numbers clicked

numbers.count = 0;


numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        
        displayText.textContent = addToDisplay(displayNumber, event);
        alert(numbers.count);
    });
    // number.removeEventListener("click", () => {
    //     if (displayNumber >= ) {
    //     }
    // })
});


