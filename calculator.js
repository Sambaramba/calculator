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

//variables for each arithmetic buttons text unicode values
const plusOperator = "\u002B";
const minusOperator = "\u2212";
const multiplyOperator = "\u00D7";
const divideOperator = "\u00F7";


/*THINK OPERATOR PARAMETER HAS TO BE A FUNCTION*/


//minus button symbol need converting to /
// multiply button needs converting to *
//subtract needs converting
//plus works!!!!
// so dont need to convert to string like in console.log
function operate(numberOne, operator, numberTwo) {

     let value = "";
     

    switch (operator) {
        
        case plusOperator : 
            value = add(numberOne, numberTwo);
            break;

        case minusOperator : 
            value = subtract(numberOne, numberTwo);
            break;

        case multiplyOperator : 
            value = multiply(numberOne, numberTwo);
            break;

        case divideOperator : 
            value = divide(numberOne, numberTwo);
            break;

        default: console.log("That is not a arthmetic operator");

    }

    
    return value.toString();
}

/*DISPLAY TEXT SELECT AND UPDATE CODE*/

/*TODO LIST*/
/*when numbers get too big for display stop showing them*/

//Could play around with making this falsy to start
let displayNumber = "0";

let displayText = document.querySelector("#display-text");

displayText.textContent = displayNumber;



let numbers = document.querySelectorAll(".number");


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

    

    //removes listener when got 1st 2 operate values;
    if (numberOne && operator) {
        removeArithmeticOperatorsEventListener();
    }
  
    if (!numbers.count) {
        displayNumber = "0";
        numbers.count = 0
    };

    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return  displayText.textContent;
    }

    ++numbers.count;
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

function removeArithmeticOperatorsEventListener() {
    arithmeticOperators.forEach((operator) => {
        operator.removeEventListener("click", addOperator);
    });
};

/*TODO? when click operator after numberTwo has value operate on 
equation then add result to num1 and new operator click to 
operator var*/


function addOperator(event) {
    
   
    let currentOperator = event.target.textContent;
    
    
    numberOne = displayNumber;

    //then add keep showing in display
    displayText.textContent = displayNumber;

    // displayText.textContent = `${numberOne} ${currentOperator}`;

    //delete count property until next num btn is pressed
    delete numbers.count;
    
    //remove click event for numbers less than 9 long
    removeNumbersEventListener();
    
    operator = currentOperator;
    // operator = convertedCurrentOperator;
    
    addNumbersEventListener();
    
    // could refactor and return something
    return
    
};

const equals = document.querySelector("#equals");

equals.addEventListener("click", resolveEquation);

function resolveEquation(event) {
    

    //convert variables to number values;
    numberOne = parseFloat(numberOne);
    numberTwo = displayNumber;
    numberTwo = parseFloat(numberTwo);
    

    //if num1 + num2 have no values return displayNumber value
    if (!numberOne) {
        numberOne = displayNumber;
        displayText.textContent = numberOne;
        // clearAll();
        // addArithmeticOperatorsEventListener();
        return
    }
    //does this keep number one showing in display text
    //needs a return statement potentially
    if (numberOne && !numberTwo) {
        displayText.textContent = numberOne;
    }

    
    if(numberOne && operator && numberTwo) {
        displayNumber = operate(numberOne, operator, numberTwo);

        if (displayNumber.length >= 9) {
            displayNumber = toScientificNotation(displayNumber, 5);
            // console.log("This works!");
        }
        displayText.textContent = displayNumber;
        // numberOne = displayNumber;
        // alert(typeof operator);
    };

    return 
}

function toScientificNotation (number, decimalPlaces) {
    return Number.parseFloat(number).toExponential(decimalPlaces);
}

//TODO NEXT
//named function adds current display num to numberTwo
//readds eventlistener to aritmetic buttons
//then calls operate with the 3 variables
//then displays the result in the display
//resets all eventlisteners and buttons


let clear = document.querySelector ("#ac-button");

//CAN'T COMPLETE UNTIL SORTED OPERATORS ADD/REMOVE LIKE NUMBERS

clear.addEventListener("click", clearAll);

function clearAll(event) {
    displayNumber = "0";
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
    numbers.count = 0;
    removeNumbersEventListener();
    removeArithmeticOperatorsEventListener();
    displayText.textContent = displayNumber;
    addNumbersEventListener();
    addArithmeticOperatorsEventListener();

}
