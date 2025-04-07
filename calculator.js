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


/*TODO: Remove event when numbers.count gets to 9*/


let numbers = document.querySelectorAll(".number");


//add tally for tally of numbers clicked
// numbers.count = 0;



function addNumbersEventListener () {
    numbers.forEach((number) => {
        number.addEventListener("click", addToDisplay)
        });
    };

addNumbersEventListener();

function removeNumbersEventListener() {
    numbers.forEach((number) => {
        number.removeEventListener("click", addToDisplay)
        })
    };


function addToDisplay(event) {
  
    if (!numbers.count) {
        numbers.count = 0
    };

    // alert(numbers.count);
    if (numbers.count >= 9) {
        removeNumbersEventListener();
        // numbers.count = 0;
        return  displayText.textContent;
    }

    

    ++numbers.count;
    alert(numbers.count);
    

    let eventNum = event.target.textContent;
    
    if (displayNumber === "0") {
        displayNumber = eventNum;
        return  displayText.textContent = displayNumber;
    }

    displayNumber += eventNum;
    
    
    return displayText.textContent = displayNumber;
};

/*Code to add click event to operator buttons*/

let arithmeticOperators = document.querySelectorAll(".arithmetic-operator");


//function to reuse add arithmetic operators click event code
function addArithmeticOperatorsEventListener() {
arithmeticOperators.forEach ((operator) => {
    operator.addEventListener("click", addOperator);
    });
};

addArithmeticOperatorsEventListener();

//TODO update operator but keep display number
//when number btn is pressed after thats start of 2nd num

function addOperator(event) {
    
    //get operator btn value
    let currentOperator = event.target.textContent;

    //update variables for operator function
    numberOne = displayNumber;
    displayText.textContent = displayNumber;
    // displayText.textContent = `${numberOne} ${currentOperator}`;
    
    //do i need func call if updated 1st if statement in addToDisplay
    // removeNumbersEventListener();
    //do i update operator with currentOperator now?
    operator = currentOperator;
    // displayNumber = "0";
    // numbers.count = 0;
    /*when do i want to add numbers EL again?*/
    addNumbersEventListener();
    /*do i need to return this and could it be more useful*/
    return currentOperator;
};

//TODO NEXT
//stop/remove eventListener for arithmetic operators after click
//do i want to allow for changing of aritmetic operator?
//create equals selector with click event
//named function adds current display num to numberTwo
//readds eventlistener to aritmetic buttons
//then calls operate with the 3 variables
//then displays the result in the display
//resets all eventlisteners and buttons


let clear = document.querySelector ("#ac-button");

//CAN'T COMPLETE UNTIL SORTED OPERATORS ADD/REMOVE LIKE NUMBERS

clear.addEventListener("click", clearAll);

function clearAll(event) {
    alert(event.target);
    displayNumber = "0";
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
    numbers.count = 0;
    removeNumbersEventListener();
    displayText.textContent = displayNumber;
    addNumbersEventListener();

}
