//==========================================================
// GLOBAL VARIABLES
//============================================================

//VARIABLES FOR THE MATHS EXPRESSION
//declared as undefined

let numberOne;
let operator;
let numberTwo;

//variable to store display value;
let displayNumber = "";

//VARIABLES THAT STORE MATHS BUTTONS TEXTCONTENT
//these are used to make operate functions switch statement more readable;
const plusOperator = "\u002B";
const minusOperator = "\u2212";
const multiplyOperator = "\u00D7";
const divideOperator = "\u00F7";


//==========================================================
// DOM ELEMENTS
//============================================================


//INDIVIDUAL BUTTONS

//NUMBERS

const button0 = document.querySelector("#button-0");
const button1 = document.querySelector("#button-1");
const button2 = document.querySelector("#button-2");
const button3 = document.querySelector("#button-3");
const button4 = document.querySelector("#button-4");
const button5 = document.querySelector("#button-5");
const button6 = document.querySelector("#button-6");
const button7 = document.querySelector("#button-7");
const button8 = document.querySelector("#button-8");
const button9 = document.querySelector("#button-9");

//MATHS OPERATORS
const divideBtn = document.querySelector("#divide-button");
const multiplyBtn = document.querySelector("#multiply-button");
const minusBtn = document.querySelector("#minus-button");
const plusBtn = document.querySelector("#plus-button");

//Equals button
const equals = document.querySelector("#equals-button");

//Clear buttons;
const clear = document.querySelector ("#ac-button");
const clearEntry = document.querySelector("#ce-button");

//Decimal place button;
const dot = document.querySelector("#dot-button");


//OTHER INDIVIDUAL ELEMENTS;

const currentDisplayText = document.querySelector("#current-display");
currentDisplayText.textContent = "0";
const previousExpressionDisplay = document.querySelector("#previous-expression-display");


//GROUPING DOM ELEMENTS;

//number and maths selector alls
const numbers = document.querySelectorAll(".number");
const arithmeticOperators = document.querySelectorAll(".arithmetic-operator");


//==========================================================
// GENERIC HELPER FUNCTIONS;
//============================================================

//VALID NUMBER CHECKS

//test if valid non zero number,returns true or false;
function isNonZeroNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) && number !== 0;
}

//test if valid number, returns true or false;
//tests if argument is string or number datatype;
function isValidNumber(value) {

    if(typeof value === "number") {
        return Number.isFinite(value);
    } else if (typeof value === "string") {
        
        if (value.trim().length === 0 ) {
            return false;
        }
        const number = Number(value);
        return Number.isFinite(number);
    } else { 
        return false;
    }
    
}


//FOUR BASIC MATHS OPERATIONS
//HELPER FUNCTIONS FOR OPERATE;

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


//i dont fully understand why this unicode conversion works in below function

//carries out calculations
//helper function in add maths operators and resolveEquation
function operate(numberOne, operator, numberTwo, event) {
     

    //converts from string into number;
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);
    
    let value;

    //divided by zero code with snarky message;
    if (operator === divideOperator && (numberTwo === 0 || numberTwo === -0)) {
        clearAll(event);
        currentDisplayText.textContent = "Clever!";
        // console.log("Clever!");
        return value;
    }

    //MATCHES OPERATOR VALUE WITH BASIC MATHS FUNCTION AND CALLS IT;
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
    
    // console.log( `value is : ${value}`);
    //convert to result back to string
    value = value.toString();
    
    return value;
}

//=============================
//HELPER FUNCTION FOR IS PRECISE AND REFINE FOR DISPLAY

//used for checking absolute length of number
function removeAllNonNumbers(stringedNumber) {
    
    //removes all characters except numbers
   let cleanedNumber = stringedNumber.replace(/\D/g, "");
//    console.log(typeof cleanedNumber);
   return cleanedNumber;
}


//checks if number is in precise range returning true or false;
function isPrecise(stringedNumber) {
    console.log(typeof stringedNumber);
    
    //for Scientific Numbers
    if (stringedNumber.toLowerCase().includes("e")) {
            console.log("triggered SN if in isPrecise");
            let baseIndex = stringedNumber.toLowerCase().indexOf("e");
            let significant = stringedNumber.slice(0, baseIndex);
            let cleanedSignificant = removeAllNonNumbers(significant);

            if (cleanedSignificant.length <= 15) {
                    return true;
            }  else { 
                console.log("SN num isn't precise");
                return false;
            }; 
    }

    //for decimals
    if (stringedNumber.includes(".")) {
       let cleanedDecimalNum = removeAllNonNumbers(stringedNumber);
       if (cleanedDecimalNum.length <= 15) {
          return true;
        }
    }
    //for integers
    let pureNumber = Number(stringedNumber);
    if (Number.isSafeInteger(pureNumber)) {
    return true;
    }
    return false;
}


//REFINE FOR DISPLAY HELPER FUNCTIONS
//=================================


function removeExcessDecimalPlaces(stringedNumber) {
    console.log(stringedNumber);
    
    
    let refinedNumber;
    
    if (stringedNumber.includes("e")) {
        console.log("got e in remove dps");
        
        let number = Number(stringedNumber);
        let nonExponential = number.toFixed(15);
        console.log(nonExponential);
        return removeTrailingZeros(nonExponential);
        
    }
    
    //variables to check if number starts with single num before decimal place.
    const minusNumberThenDecimal = /^-\d\./;
    const numberThenDecimal = /^\d\./;

    if (numberThenDecimal.test(stringedNumber) || 
        minusNumberThenDecimal.test(stringedNumber))
        {   
            refinedNumber = Number(stringedNumber).toFixed(11);
        } else {
            refinedNumber = Number(stringedNumber).toFixed(2);
        };
    
    //remove zeros from end of number;
    refinedNumber = removeTrailingZeros(refinedNumber);
    
    return refinedNumber;
} 


function removeTrailingZeros(number) {
     
    //exits out if scientific notation number;
    if (number.includes("e")) {
        console.log("we got some e");
        return number;
    }
    //stores index of dp;
    let dot = number.indexOf(".");
    
    //if number doesn't contain dot return number as is;
    if (dot === -1) {
        return number;
    }
    
    //splits into two parts at the index of the dp;
    let beforeDecimalPlace = number.slice(0, dot);
    let afterDecimalPlace = number.slice(dot);
    
    let array = afterDecimalPlace.split("");
    let removedZeros;

    
    //create array to remove trailing zeros
    for (let i = array.length; i >= 0; i--) {

            const last = array[array.length - 1];
            if (last === "0" || last === ".") {
                    array.pop();
            } 
            //change back to string when removed zeros off end;
            removedZeros = array.join("");
    }
    
    // attach two parts back together and return;
    return beforeDecimalPlace + removedZeros;
}



//displays Nan or result dependant on num length;
//used to display result 
function refineResultForDisplay(stringedNumber) {

    // remove excess dps from result;  
    let refinedNumber = removeExcessDecimalPlaces(stringedNumber);
    console.log(`refined number is ${refinedNumber}`);
    //removes all non numbers for results length check
    let cleanedNumber = removeAllNonNumbers(refinedNumber);
    
    
    if (cleanedNumber.length > 12) {
        clearAll();
        console.log("is NaN");
        currentDisplayText.textContent = "NaN";
        
    } else {
        currentDisplayText.textContent = refinedNumber;
        // if (isValidNumber(numberTwo)) {
        // answerText.textContent = `${numberOne} ${operator} ${numberTwo}`;
        // } else { 
        //     answerText.textContent = `${numberOne} ${operator}`;
        // }
        // numberOne = displayNumber;
        // console.log(`number one is ${numberOne}`);
        // console.log(numberTwo);
        console.log("less than 12");
        
    }
    return;
}  







//=====================================================
//FEATURE: ADD NUMBERS TO CALCULATOR
//=====================================================




//Numbers event function to them to display;
function addNumberToDisplay(event) {
    console.log(`display number at addNum start is ${displayNumber}`);   
    console.log(`number one at addNum start is ${numberOne}`);
    console.log(`number two at addNum start is ${numberTwo}`);
    console.log(`operator at addNum start is ${operator}`);

    //this fixes issue after divide by zero
    //dont understand when displayNumber becomes undefined though
    if (displayNumber === undefined) {
        console.log("this aint no proper number");
        displayNumber = "";
    };

    //resets calculator after pressed equals;
    if (!isValidNumber(numberOne) && operator && isValidNumber(displayNumber)) {
        console.log("cleared for fresh calculation");
        clearAll();
    }

    
    let eventNum = event.target.textContent;
    // console.log(eventNum);

    //Adds count variable if there isn't one already;
    //also add events for dot,clear entry and maths ops
    if (!numbers.count) {
          numbers.count = 0;
          addDotEventListener();
          addClearEntryEventlistener();
          addArithmeticOperatorsEventListener();
          console.log("added dot, maths ops and clearEntry events in addNum");
        
        
    };

    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return currentDisplayText.textContent = displayNumber;
    }

    ++numbers.count;
    // console.log(numbers.count);

    
    
    //Either replace displayNumber or add to it
    if (displayNumber === "0") {
        displayNumber = eventNum;
        // numbers.count === 1;
    } else {
        displayNumber += eventNum;
    }

    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isValidNumber(numberOne) && numbers.count === 1) {
        addEqualsEventListener();
        // console.log(("add equals event in addNum"));
    }
    // console.log(event.target);
    // console.log(displayNumber);
    return currentDisplayText.textContent = displayNumber;
};


//code for adding/removing numbers event listeners;

function addNumbersEventListener () {
    numbers.forEach((number) => {
        number.addEventListener("click", addNumberToDisplay);
        // number.addEventListener("keydown", addNumberToDisplay);
    });
};

//would it be easier to add/remove on mousedown,mouseup?
function removeNumbersEventListener() {
    numbers.forEach((number) => {
        number.removeEventListener("click", addNumberToDisplay);
        // number.removeEventListener("keydown", addNumberToDisplay);
    });
};

//add numbers event at beginning;
addNumbersEventListener();




//=====================================================
//FEATURE: ADD MATHS OPERATORS TO CALCULATOR;
//=====================================================


//function to reuse add arithmetic operators click event code

function addOperator(event) {
    // console.log(event);
    // console.log("Number One's starting value is: " + numberOne);
    // console.log("Operators starting value in addOp is: " + operator);
    // console.log("Numbers two's starting value is: " + numberTwo);
    // console.log("Display number's starting value is: " + displayNumber);
    let currentOperator = event.target.textContent;
    // console.log(`current operator is ${currentOperator}`);

    //highlights maths operator button;
    event.target.focus();
    
    //delete count property until next num btn is pressed
    delete numbers.count;
    

    //resets 2nd num value for repeat operations
    if(isValidNumber(numberTwo)) {
        // console.log("reset num2 value in addOperator");
        numberTwo = undefined;
    }

    
    //Add display number to numberOne variable if it has no value;
    if (!isValidNumber(numberOne)&& isValidNumber(displayNumber)) {
        numberOne = displayNumber;
        // displayText.textContent = displayNumber;
        displayNumber = "";
        addNumbersEventListener();
        // console.log("numberOne value is: " + numberOne);
    }

    //add current display number to 2nd number var
    if (isValidNumber(numberOne) && operator &&
        isValidNumber(displayNumber) && !isValidNumber(numberTwo)) {

            numberTwo = displayNumber;
            displayNumber = "";
    }
    
    //wack code block in another function?
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        
        //return stringed number/undefined;
        let result = operate(numberOne, operator, numberTwo);
        operator = currentOperator;

        
        //Result will be undefined and display showing Clever!;
        if(!isValidNumber(result)) {
            return;
        }
        
        // if runs when number has lost precision
        if(!isPrecise(result)) {
            console.log("result isn't precise");
            console.log(`Value of result is ${result}`);
            clearAll();
            previousExpressionDisplay.textContent = "";
            currentDisplayText.textContent = "Precision Error";
            return;
                
        } else {
            numberOne = result;
            numberTwo = undefined;
            // operator = currentOperator;
            previousExpressionDisplay.textContent = `${numberOne} ${operator}`;
            console.log(`Value of result is ${result}`);
            console.log(`Value of displayNumber is ${displayNumber}`);
            addNumbersEventListener();
            removeEqualsEventListener();
            return refineResultForDisplay(result);
        }
        
    };

    

    operator = currentOperator;
    console.log(`operator value is now ${operator}`);

    //display 1st part of calculation for clarity;
    if (isValidNumber(numberOne) && operator) {
        previousExpressionDisplay.textContent = `${numberOne} ${operator}`;
    }
    
    //removes equals event if condition met
    if(isValidNumber(numberOne) && operator && !isValidNumber(numberTwo)) {
        console.log("equals removed from add op");
        removeEqualsEventListener();
        
        
    }
    
    // could refactor and return something
    return
    
};

//maths operators event listener;

function addArithmeticOperatorsEventListener() {
    arithmeticOperators.forEach ((operator) => {
        operator.addEventListener("click", addOperator);
        });
};


function removeArithmeticOperatorsEventListener() {
    arithmeticOperators.forEach((operator) => {
        operator.removeEventListener("click", addOperator);
    });
};



//=====================================================
//FEATURE: EQUALS BUTTON EVENT CODE;
//=====================================================


/*does not give correct answers for scientific notation*/
function resolveEquation(event) {
    
    //reset count property for addToDisplay();
    delete numbers.count;

    //readd event listener for repeat operations
    //think this can be deleted;
    addArithmeticOperatorsEventListener();
    
    console.log(`numberOne at equals start is ${numberOne}`);
    console.log(`displayNumber at equals start is ${displayNumber}`);
    console.log(`numberTwo at equals start is ${numberTwo}`);
    console.log(`operator at equals start is ${operator}`);


    if(!isValidNumber(numberOne) && isValidNumber(displayNumber) && isValidNumber(numberTwo)) {
        numberOne = displayNumber;
    }
    
    //add current display number to 2nd number var
    if (isValidNumber(numberOne) && isValidNumber(displayNumber) && !isValidNumber(numberTwo)) {
        numberTwo = displayNumber;
        console.log(`number two has been updated to: ${numberTwo}`);
    }



    //wack code block in another function?
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {

        let result = operate(numberOne, operator, numberTwo);
        // answerText.textContent = `${numberOne} ${operator} ${numberTwo}`
        // console.log(`result after operate is: ${result}`);
        // console.log(`type of result is: ${typeof result}`);
        if(!isValidNumber(result)) {
            console.log(`not valid result if ran`);
            return;
        }

        if(!isPrecise(result)) {
            console.log("result isn't precise");
            clearAll();
            previousExpressionDisplay.textContent = "";
            currentDisplayText.textContent = "Precision Error";
            return;
                
        } else {
            //added number two to below expression but haven't commited yet;
            previousExpressionDisplay.textContent = `${numberOne} ${operator} ${numberTwo}`;
            numberOne = undefined;
            displayNumber = result;
            console.log(`numberOne at equals end is ${numberOne}`);
            console.log(`displayNumber at equals end is ${displayNumber}`);
            console.log(`numberTwo at equals end is ${numberTwo}`);
            console.log(`operator at equals end is ${operator}`);
            // addNumbersEventListener();
            return refineResultForDisplay(result);
        }
        
    };
     console.log("bottom of resolve Equation runs");
    
}

//Equals click event add/remove code

function addEqualsEventListener() {
    equals.addEventListener("click", resolveEquation);
}

function removeEqualsEventListener() {
    equals.removeEventListener("click", resolveEquation);
}


//=====================================================
//FEATURE: ALL CLEAR BUTTON CODE
//=====================================================


function clearAll(event) {
    displayNumber = "";
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
    numbers.count = 0;
    removeNumbersEventListener();
    removeArithmeticOperatorsEventListener();
    currentDisplayText.textContent = "0";
    previousExpressionDisplay.textContent = " ";
    addNumbersEventListener();
    addArithmeticOperatorsEventListener();
    removeEqualsEventListener();
}

//AC button add click event;
clear.addEventListener("click", clearAll);




//=====================================================
//FEATURE: CLEAR ENTRY BUTTON CODE
//=====================================================


function deleteCharacter(event) {
    
    //readds number event
    if(displayNumber.length === 9) {
        addNumbersEventListener();
    }
    
    //stores value of last character
    let lastCharacter = displayNumber.charAt(displayNumber.length - 1);
    
    //decrements count property if last character is number
    if(Number(lastCharacter)) {
        --numbers.count;
    }
    //stores number with last character removed
    let numberMinusLastCharacter = displayNumber.slice(0, -1);

    displayNumber = numberMinusLastCharacter;
    currentDisplayText.textContent = numberMinusLastCharacter;
    
    if (displayNumber.length === 0) {
        // delete numbers.count;
        removeDotEventListener();
        console.log("remove count var,dot and clear entry events in delete char");
        displayNumber = "";
        removeClearEntryEventListener();
        return currentDisplayText.textContent = "0";
    }
}

//Clear entry add/remove click event funcs;
function addClearEntryEventlistener() {
clearEntry.addEventListener("click", deleteCharacter);
}

function removeClearEntryEventListener() {
    clearEntry.removeEventListener("click", deleteCharacter);
}







//=====================================================
//FEATURE: ADD DECIMAl PLACE TO NUMBERS CODE;
//=====================================================


function addDecimalPlace(event) {

    let dotSign = event.target.textContent;
    if (!displayNumber.includes(dotSign) && isValidNumber(displayNumber)) {
        displayNumber += dotSign;
        currentDisplayText.textContent = displayNumber;
        console.log("added dot event");
     }
}


function addDotEventListener() {
    dot.addEventListener("click", addDecimalPlace, {once: true});
}

function removeDotEventListener() {
    dot.removeEventListener("click", addDecimalPlace);
}




//===========================================
//FEATURE: ATTACH KEYS TO CALCULATOR BUTTONS
//=================================================


//Object to store flag of held down keys
let heldDownKeys = {};

//Code to attach keydown to click events for buttons
document.addEventListener('keydown', (event) => {
    
    //store key in variable
    let key = event.key;
    console.log(event);
    event.preventDefault();
    if(heldDownKeys[key]) return;
    heldDownKeys[key] = true;
    
    //
    switch(key) {
        case "Delete":
            clear.click();
            break;
        case "Backspace":
            clearEntry.click();
            break;
        case "0":
            console.log("0 key pressed");
            button0.click();
            break;
        case "1":
            console.log("1 key pressed");
            button1.click();
            break;
        case "2":
            console.log("2 key pressed");
            button2.click();
            break;
        case "3":
            console.log("3 key pressed");
            button3.click();
            break;
        case "4":
            console.log("4 key pressed");
            button4.click();
            break;
        case "5":
            console.log("5 key pressed");
            button5.click();
            break;
        case "6":
            console.log("6 key pressed");
            button6.click();
            break;
        case "7":
            console.log("7 key pressed");
            button7.click();
            break;
        case "8":
            console.log("8 key pressed");
            button8.click();
            break;
        case "9":
            console.log("9 key pressed");
            button9.click();
            break;
        case ".":
            console.log("dot key selected");
            dot.click();
            break;
        case "Enter":
            equals.click();
            console.log("enter key selected");
            break;
        case "/":
            divideBtn.click();
            break;
        case "*":
            multiplyBtn.click();
            break;
        case "-":
            minusBtn.click();
            break;
        case "+":
            plusBtn.click();
            break;
        default: console.log("this shouldn't run");
    }
});

document.addEventListener("keyup", (event) => {
       heldDownKeys[event.key] = false;
});














/*CURRENTLY UNUSED OR BROKEN CODE*/


//UNUSED

//ADD MINUS SIGN TO START OF NUMBERS CODE;
/*
let minusBtn = document.querySelector("#minus-button");



function addMinusSign(event) {
    console.log(event.target.textContent);
    if (!displayNumber.length) {
    displayNumber = "-";
    displayText.textContent = displayNumber;
    console.log(`display numbers value is now ${displayNumber}`);
    return displayNumber;
    }
}

function addMinusSignEventListener() {
    minusBtn.addEventListener("click", addMinusSign, {once: true});
}

function removeMinusSignEventListener() {
    minusBtn.removeEventListener("click", addMinusSign);
}

addMinusSignEventListener();
*/

//for adding to number.count if in addnumbers func
//Resets if is not minus;
/*
if (displayNumber !== "-") {
    displayNumber = "";
}
*/

//in add operator func:-
//adds minus to displayNumber start if operator is divide or multiply;
    /*
    if (currentOperator === minusOperator &&
        (operator  === multiplyOperator ||
        operator === divideOperator)) {
        // if(operator === divideOperator || operator === multiplyOperator) {
            displayNumber = "-";
            displayText.textContent = displayNumber;
            console.log("added minus to display num and remove maths ops in addop");
            removeArithmeticOperatorsEventListener();
            return;
        // }
    }
    */

//add in clear entry func
// addMinusSignEventListener();



//Code for calculator accepting scientific notation

//code to add to isPrecise();
/*
let exponent = stringedNumber.slice(baseIndex + 1);
if (exponent.includes("-")) {
      exponent = exponent.replace("-", "");
      console.log(`Exponent is now: ${exponent}`);
}
*/

/*
//expects string as argument
function toScientificNotation (number, dps) {
    return Number.parseFloat(number).toExponential(dps);
}
*/


//code to add to removeExcessDecimalPlaces
/*
let significand;
significand = getSignificand(stringedNumber);
return refinedNumber = Number(significand).toFixed(6);
*/


//Code to return different elements of SN num

//used to find value of exponent
/*
function getExponent(stringedNumber) {
    if(stringedNumber.toLowerCase().includes("e")) {
        let indexOfBase = stringedNumber.toLowerCase().indexOf("e");
        let exponent = stringedNumber.slice(indexOfBase + 1);
        return exponent;
    }
    return stringedNumber;
}
*/

//used to find value of significant in SN numbers;
/*
function getSignificand(stringedNumber) {
    if(stringedNumber.toLowerCase().includes("e")) {
        let indexOfBase = stringedNumber.toLowerCase().indexOf("e");
        let significand = stringedNumber.slice(0, indexOfBase);
        return significand;
    }
    return stringedNumber;
}
*/

// used to fit numbers in display
// converts to SN earlier than built-in js;
// function is broken
/*
function convertToScientificNotation(number) {

    if (Math.abs(number).toString().length >= 12) {
    return number.toExponential();
    }

    return number;
    
}
*/





//BROKEN CODE

//doesnt work for negative exponents yet
//think if you have value as number not string will convert
//doesn't work yet;
// function fromScientificNotation(number) {
//     if (number.includes("e")) {
      
//       let baseIndex = number.search("e");
//       let coefficient = parseFloat(number.slice(0, baseIndex));
//       let exponent = number.slice(baseIndex + 1);

//       let nonScientificNum;
        
//       if (exponent.startsWith("-")) {
//             console.log("negative");
//             let removedNegative = exponent.replace("-", "");
//             console.log(removedNegative);
//             exponent = parseFloat(removedNegative);
//             nonScientificNum = coefficient / (10 ** exponent);
//             console.log(nonScientificNum);
//             return nonScientificNum;
//         } else {
//             nonScientificNum = coefficient * (10 ** exponent);
//             return nonScientificNum;
//         };
//     }
//     console.log("this runned");
//     return number;
// }

//KEY PRESS UNUSED/BROKEN CODE;

// function addNumbersKeydownEvent() {
//     numbers.forEach((number) => {
//         number.addEventListener("keydown", addNumberToDisplay);
        
//         });
        
// };


// function removeNumbersKeydownEvent() {
//     numbers.forEach((number) => {
//         number.removeEventListener("keydown", (event) => {
//             console.log(event);
//             console.log(event.key);
//             console.log(document.activeElement);
//          });
//     });
// };

// displayText.addEventListener("keydown", (event) => {
//     console.log(event.key);
// });

// document.addEventListener("keydown", (event) => {
//     console.log(document.activeElement);
//     // console.log(event.key);
//     if (/\d/.test(event.key)) {
//         console.log("Number key pressed:", event.key);
//         if (!displayNumber.length) {
//             displayNumber = event.key;
//             displayText.textContent = displayNumber;
//         } else {
//             displayNumber += event.key;
//             displayText.textContent = displayNumber;
//         }
//     };
// });

// addNumbersKeydownEvent();


// document.addEventListener('keydown', (event) => {
//     let target = event.target;
//     console.log(event);
//     console.log(event.key);
//     let key = event.key;
//     console.log(event.target);
//     // console.log(event.class);
//     switch(key) {
//         case '.':
//                dot.click();
//             break;
//         case 'equals':
//             equals.focus();
//             break;
//         case 'report':
            
//             break;
//     }
// });

//  console.log(document.activeElement);
//     console.log(event.key);
//     console.log(event.target);

//    if (/\d/.test(event.key)) {
//         console.log("Number key pressed:", event.key);
//         if (!displayNumber.length) {
//             displayNumber = event.key;
//             displayText.textContent = displayNumber;
//         } else {
//             displayNumber += event.key;
//             displayText.textContent = displayNumber;
//         }
//     };