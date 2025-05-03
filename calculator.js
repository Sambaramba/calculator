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
//think its simpler to just parseFloat numbers in operate;
//do i need number datatype anywhere else
function operate(numberOne, operator, numberTwo, event) {
     
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);
    
    if (operator == divideOperator && (parseFloat(numberTwo) == 0 || parseFloat(numberTwo) == -0)) {
        clearAll(event);
        displayText.textContent = "Clever!";
        return;
    }

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

let displayNumber = "";

let displayText = document.querySelector("#display-text");

displayText.textContent = "0";


//code for adding/removing numbers event listeners;

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
//tests if argument is string or number datatype;
function isValidNumber(value) {

    if(typeof value === "number") {
        return Number.isFinite(value);
    } else if (typeof value === "string") {
       const number = Number(value);
       return Number.isFinite(number);
    } else return false;
    
}


function addToDisplay(event) {
    console.log(displayNumber);
    //This if breaks minus btn;
    // if (displayNumber.length === "0") {
    //     minusBtn.addEventListener("click", addMinusSign, { once: true });
    // }
    

    //think this now works;
    if (displayNumber.length >= 1 && !displayNumber.includes(".")) {
        dot.addEventListener("click", addDecimalPlace, { once: true });
    }

    let eventNum = event.target.textContent;
    // alert(typeof eventNum);
    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isValidNumber(numberOne) && operator && isValidNumber(displayNumber)) {
        addEqualsEventListener();
        // alert ("By jove this works!");
    }
    

    //Numbers count add/remove/increment code
  
    if (!numbers.count) {
        // displayNumber = "";
        numbers.count = 0
    };

    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return  displayText.textContent = displayNumber;
    }

    ++numbers.count;
    
    // console.log(typeof displayNumber);
    if (displayNumber.length === 0) {
        console.log("display num length is 0");
        displayNumber = eventNum;
        // alert(typeof displayNumber);
        return  displayText.textContent = displayNumber;
    }
    //do i create else statement to above if
    //then add below code;
    displayNumber += eventNum;
    

    //checks if valid number and adds maths operators if so
    // is if statement neccessary?
    if (isValidNumber(displayNumber)) {
        addArithmeticOperatorsEventListener();
    }
    
    
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

// addArithmeticOperatorsEventListener();


function removeArithmeticOperatorsEventListener() {
    arithmeticOperators.forEach((operator) => {
        operator.removeEventListener("click", addOperator);
    });
};

/*TODO? when click operator after numberTwo has value operate on 
equation then add result to num1 and new operator click to 
operator var*/


function addOperator(event) {
    console.log(event);
    // alert("Number One's starting value is: " + numberOne);
    // alert("Operators starting values is: " + operator);
    // alert("Numbers two's starting value is: " + numberTwo);

    //delete count property until next num btn is pressed
    delete numbers.count;
    console.log(event.target);

    let currentOperator = event.target.textContent;
    
    
    //adds display num to num1 if no numerical value
    // if(displayNumber.length === 0 && currentOperator === minusOperator) {
    //    displayNumber = minusOperator;
    //    return;
    // }

    if (!isValidNumber(numberOne)) {
        numberOne = displayNumber;
        // displayText.textContent = displayNumber;
        displayNumber = "";
        // alert("numberOne value is: " + numberOne);
    }

    
    //if num2 has number value make it undefined;
    //below if doesn't execute
    if(isValidNumber(numberTwo)) {
        // console.log("this if executed");
        numberTwo = undefined;
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


/*does not give correct answers for scientific notation*/
function resolveEquation(event) {
    
    //reset count property for addToDisplay();
    delete numbers.count;
    
    //readd event listener for repeat operations
    addArithmeticOperatorsEventListener();
    
    numberOne = parseFloat(numberOne);
    displayNumber = parseFloat(displayNumber);
    numberTwo = parseFloat(numberTwo);
    // console.log(numberOne);
    // console.log(displayNumber);
    // console.log(numberTwo);

    

    if (isValidNumber(numberOne) && isValidNumber(displayNumber) && !isValidNumber(numberTwo)) {
        numberTwo = displayNumber;
    }

    //move below into operate function?
    //would code work better if its a helper function?
    // if (operator == divideOperator && parseFloat(numberTwo) == 0) {
    //     clearAll(event);
    //     displayText.textContent = "Clever!";
    //     return;
    // }
    /*Could below code become a function so can use for maths operators*/
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        displayNumber = operate(numberOne, operator, numberTwo);

        //convert to number then to string with no dps
        //doesn't work for neg expos so need to refactor;
        //added toPrecision as start
        //want to remove zeros from end of num1
        //also for display length check remove non nums before check
        //need to decide what size numbers to work with;
        // numberOne = Number(displayNumber).toFixed(15);
        // console.log(numberOne);
        // console.log(typeof numberOne);
        
        //want this to remove dps and - sign from length for condition;
        if (displayNumber.length >= 9) {
            displayNumber = toScientificNotation(displayNumber, 5);
        }
        displayText.textContent = displayNumber;
        displayNumber = "";
        
    };
     console.log(numberOne);
    return 
}

/*create function to process result of operate to/from scientific notation*/
// function ();

//expecting string as argument
//will lose precision with bigint numbers;
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

// dot button selector and function for its click event;

let dot = document.querySelector("#dot");

function addDecimalPlace(event) {
    let dotSign = event.target.textContent
    displayNumber += dotSign;
    
}


//MINUS BUTTON CODE TO ADD MINUS SIGN TO START OF NUMBERS

let minusBtn = document.querySelector("#minus");



function addMinusSign(event) {
    // let minusSign = event.target.textContent;
    // if (minusSign === "-") {
    //     alert("It's alive! it's aliiiive!");
    // }
    displayNumber += "-";
    console.log(displayNumber);
}

//does 2nd part of condition do what i want?
if (displayNumber.length === 0 && operator !== minusOperator) {
    alert("minus event code");
    minusBtn.addEventListener("click", addMinusSign);
}


//update the if to update array without last zero
//if doesn't end in zero update array as is
//need to return string
function removeTrailingZeros(number) {
     
    //returns number if zero;`
    if (+number === 0) {
        return number;
    }
    //work out what sized numbers to work with in calculator
    //toFixed is temporary fix;
    let standardNumber = Number(number).toFixed(15);
    let array = standardNumber.split("");
    

    for (let i = array.length; i >= 1; i--) {

            const last = array[array.length - 1];
            if (last === "0") {
                    array.pop();
                // console.log(array);
            } 
            // else return array;
        
            // console.log(array.length);
    }
    // console.log(array);
    return array.join("");
}

Number.MIN_SAFE_INTEGER;
Number.MAX_SAFE_INTEGER;