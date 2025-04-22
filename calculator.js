//FOUR BASIC MATHS OPERATIONS
//they accept 2 numbers and then operate on them

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
//declared as undefined

let numberOne;
let operator;
let numberTwo;

//store arithmetic buttons textContent in unicode form
//these are used to make operate functions switch statement more readable;
const plusOperator = "\u002B";
const minusOperator = "\u2212";
const multiplyOperator = "\u00D7";
const divideOperator = "\u00F7";


//i dont really know why this unicode conversion works in below function
//think its simler to just parseFloat numbers in operate
//do i need number datatype anywhere else
function operate(numberOne, operator, numberTwo) {
     
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);

     let value;
     

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


//Could play around with making displayNumber undefined at start
//could instead set display text to "0";

let displayNumber = "";

let displayText = document.querySelector("#display-text");

displayText.textContent = "0";



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

//test if valid non zero number,returns true or false;
function isNonZeroNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) && number !== 0;
}

//test if valid number, returns true or false
function isValidNumber(value) {
    const number = Number(value);
    return Number.isFinite(number);
}


function addToDisplay(event) {

    if (displayNumber.length >= 1) {
        dot.addEventListener("click", addDecimalPlace, { once: true });
    }

    let eventNum = event.target.textContent;
    // alert(typeof eventNum);
    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isValidNumber(numberOne) && operator && isValidNumber(displayNumber)) {
        addEqualsEventListener();
        // alert ("By jove this works!");
    }
    
    //remove maths operators when num1 is legal num and operator is truthy
    if (isValidNumber(numberOne) && operator) {
        removeArithmeticOperatorsEventListener();
    }

    //Numbers count add/remove/increment code
  
    if (!numbers.count) {
        displayNumber = "";
        numbers.count = 0
    };

    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return  displayText.textContent = displayNumber;
    }

    ++numbers.count;
    
    
    if (displayNumber.length === "0") {
        displayNumber = eventNum;
        // alert(typeof displayNumber);
        return  displayText.textContent = displayNumber;
    }
    //do i create else statement to above if
    //then add below code;
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

    // alert("Number One's starting value is: " + numberOne);
    // alert("Operators starting values is: " + operator);
    // alert("Numbers two's starting value is: " + numberTwo);

    //delete count property until next num btn is pressed
    delete numbers.count;

    let currentOperator = event.target.textContent;
    
    //adds display num to num1 if no numerical value
    //this runs
    if (!isValidNumber(numberOne)) {
        numberOne = displayNumber;
        // alert("numberOne value is: " + numberOne);
    }
    
    //if num2 has number value make it undefined;
    //below if doesn't execute
    if(isValidNumber(numberTwo)) {
        // alert("This if has been executed!");
        numberTwo = undefined;
        // alert("numberTwo's value is now: " + numberTwo);
        // alert(numberTwo);
    }
   
    
    
    

    //then add keep showing in display
    // displayText.textContent = displayNumber;

    // displayText.textContent = `${numberOne} ${currentOperator}`;

    
    
    //remove click event for numbers less than 9 long
    removeNumbersEventListener();
    
    operator = currentOperator;
    
    
    addNumbersEventListener();
    
    // could refactor and return something
    return
    
};

const equals = document.querySelector("#equals");

function addEqualsEventListener() {
    equals.addEventListener("click", resolveEquation);
}

function removeEqualsEventListener() {
    equals.removeEventListener("click", resolveEquation);
}



function resolveEquation(event) {
    
    //reset count property for addToDisplay();
    delete numbers.count;
    
    //readd event listener for repeat operations
    addArithmeticOperatorsEventListener();
    
    numberOne = parseFloat(numberOne);
    displayNumber = parseFloat(displayNumber);
    numberTwo = parseFloat(numberTwo);
    

    if (isValidNumber(numberOne) && operator && numberTwo == undefined) {
        numberTwo = parseFloat(displayNumber);
        alert("This bloody works!");
        
    }

    if (isValidNumber(numberOne) && !isValidNumber(numberTwo)) {
        numberTwo = displayNumber;
    }

    
    if (operator == divideOperator && parseFloat(numberTwo) == 0) {
        clearAll(event);
        displayText.textContent = "Clever!";
        return;
    }
   
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        displayNumber = operate(numberOne, operator, numberTwo);

        //convert to number then to string with no dps
        numberOne = Number(displayNumber).toFixed(0);
        
        if (displayNumber.length >= 9) {
            displayNumber = toScientificNotation(displayNumber, 5);
        }
        displayText.textContent = displayNumber;
        displayNumber = "";
        
        
    };

    return 
}


function toScientificNotation (number, dps) {
    return Number.parseFloat(number).toExponential(dps);
}

// function getRoundedNumber(number, decimalPlaces) {
//     return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
// }


//doesnt work for negative exponents yet
//think if you have value as number not string will convert
// function fromScientificNotation (number) {
//     if (parseFloat(number) && number.includes("e")) {

//       let index = number.search("e");
//       let baseNumber = number.slice(0, index);
//       let exponent = number.slice(index + 1);
//       if(number.includes("+")) {
//         Number(number).toString();
//       }
//         if (exponent.startsWith("-")) {
//             console.log("negative");
//             let removedNegative = exponent.replace("-", "");
//             console.log(removedNegative);  
//             console.log(baseNumber / (10 ** removedNegative));
//             return baseNumber / (10 ** removedNegative);
//         } else {
//             return baseNumber * (10 ** exponent)
//         };
//     }
//     console.log("this runned");
//     return number;
// }


//clear button code
let clear = document.querySelector ("#ac-button");

clear.addEventListener("click", clearAll);

function clearAll(event) {
    displayNumber = "";
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
    numbers.count = 0;
    removeNumbersEventListener();
    removeArithmeticOperatorsEventListener();
    displayText.textContent = "0";
    addNumbersEventListener();
    addArithmeticOperatorsEventListener();
    removeEqualsEventListener();

}

// dot button code

let dot = document.querySelector("#dot");


// do i want to use once or clearer/better like other EL's?
//decide first next time.
//could just add at beginning of addToDisplay();


function addDecimalPlace(event) {

    let dotSign = event.target.textContent
    displayNumber += dotSign;
    
}
