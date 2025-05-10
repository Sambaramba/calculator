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
        number.addEventListener("click", addNumberToDisplay)
        });
    };

addNumbersEventListener();

function removeNumbersEventListener() {
    numbers.forEach((number) => {
        number.removeEventListener("click", addNumberToDisplay)
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


function addNumberToDisplay(event) {
    console.log(displayNumber);
    

    //this fixes issue after divide by zero
    //dont understand when displayNumber becomes undefined though
    if (displayNumber === undefined) {
        console.log("this aint no proper number");
        displayNumber = "";
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
    
    
    displayNumber += eventNum;
    

    //checks if valid number and adds maths operators if so
    // is if statement neccessary?
    if (isValidNumber(displayNumber)) {
        console.log("valid");
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
    // console.log(event);
    // alert("Number One's starting value is: " + numberOne);
    // alert("Operators starting values is: " + operator);
    // alert("Numbers two's starting value is: " + numberTwo);

    //delete count property until next num btn is pressed
    delete numbers.count;
    // console.log(event.target);

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
    //or could add code just after operate is called to a func and call
    //either could make code cleaner/more readable;

    //DOESN'T WORK WHEN DIVIDING -ve SN numbers BY LARGE NUMBERS
    //remove zeros doesn't work when got 0.00000
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        displayNumber = operate(numberOne, operator, numberTwo);
        console.log(displayNumber);
        displayNumber = Number(displayNumber).toFixed(5);
        console.log(displayNumber);

        displayNumber = removeTrailingZeros(displayNumber);
        console.log(displayNumber);
        numberOne = displayNumber;
        //convert to number then to string with no dps
        //doesn't work for neg expos so need to refactor;
        //added toPrecision as start
        //want to remove zeros from end of num1
        //also for display length check remove non nums before check
        //need to decide what size numbers to work with;
        
        
        //want this to remove dps and - sign from length for condition;
        /*could add answer variable above and for this if*/
        if (displayNumber.length >= 9) {
            displayText.textContent = toScientificNotation(displayNumber, 5);
            // console.log(displayNumber);
        } else {
            displayText.textContent = displayNumber;
            console.log("less than 9");
            
        }
        displayNumber = "";
        // console.log(displayNumber);
    };
     console.log(numberOne);
     console.log(numberTwo);
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

//add minus sign listener;
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

//Code to add a decimal place to number

let dot = document.querySelector("#dot");

dot.addEventListener("click", addDecimalPlace);

function addDecimalPlace(event) {

    let dotSign = event.target.textContent;
    if (!displayNumber.includes(dotSign) && isValidNumber(displayNumber)) {
        displayNumber += dotSign;
        displayText.textContent = displayNumber;
        console.log("added dot event");
     }
}



    


//MINUS BUTTON CODE TO ADD MINUS SIGN TO START OF NUMBERS

let minusBtn = document.querySelector("#minus");



function addMinusSign(event) {
    if (!displayNumber.length) {
    displayNumber += "-";
    displayText.textContent = displayNumber;
    }
    console.log(displayNumber);
}

function addMinusSignEventListener() {
    minusBtn.addEventListener("click", addMinusSign, {once: true});
}

function removeMinusSignEventListener() {
    minusBtn.removeEventListener("click", addMinusSign);
}

addMinusSignEventListener();

//does 2nd part of condition do what i want?
// if (displayNumber.length === 0 && operator !== minusOperator && !displayNumber.includes("-")) {
//     alert("minus event code");
    
// }


//want to check if number contains a dot
//if not return number as is
//if it does find the index index of the dot
//then split into 2 parts at dot
//for second part if ends in zero keep removing until it doesn't
//need to return a string

function removeTrailingZeros(number) {
     

    //think can move this condition into the dot if below
    //returns number if zero;
    // if (+number === 0) {
    //     return number;
    // }
    
    //stores ondex of dp;
    let dot = number.indexOf(".");
    
    //if number doesn't contain dot return number as is;
    if (dot === -1) {
        return number;
    }
    
    //splits into two parts at the index of the dp;
    let beforeDot = number.slice(0, dot);
    let afterDot = number.slice(dot);
    
    let array = afterDot.split("");
    let removedZeros;

    
    //create array to remove trailing zeros
    for (let i = array.length; i >= 0; i--) {

            const last = array[array.length - 1];
            if (last === "0" || last === ".") {
                    array.pop();
                // console.log(array);
            } 
            //change back to string when removed zeros off end;
            removedZeros = array.join("");
    }
    
    // attach two parts back together
    return beforeDot + removedZeros;
}

// Number.MIN_SAFE_INTEGER;
// Number.MAX_SAFE_INTEGER;