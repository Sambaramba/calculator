//==========================================================
// GLOBAL VARIABLES
//============================================================

//VARIABLES FOR THE MATHS EXPRESSION


let numberOne = undefined;
let operator = undefined;
let numberTwo = undefined;

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
const equalsButton = document.querySelector("#equals-button");

//Clear buttons;
const allClearButton = document.querySelector ("#ac-button");
const clearEntryButton = document.querySelector("#ce-button");

//Decimal place button;
const decimalPlaceButton = document.querySelector("#dot-button");


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


//Reuseable number check
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

//used for checking absolute length of number
function removeAllNonNumbers(stringedNumber) {

    //removes all characters except numbers
   let cleanedNumber = stringedNumber.replace(/\D/g, "");
//    console.log(typeof cleanedNumber);
   return cleanedNumber;
}


// --------------------------------------
// SCIENTIFIC NOTATION HELPERS
// --------------------------------------


// Extracts exponent from scientific notation string (e.g. "1e-6" => "-6")
function getExponent(stringedNumber) {

    //return exponent
    if(stringedNumber.toLowerCase().includes("e")) {
        let indexOfBase = stringedNumber.toLowerCase().indexOf("e");
        let exponent = stringedNumber.slice(indexOfBase + 1);
        return exponent;
    }
    //or return no value
    return undefined;
}

// Extracts significand from scientific notation string
function getSignificand(stringedNumber) {
    //return significand
    if(stringedNumber.toLowerCase().includes("e")) {
        let indexOfBase = stringedNumber.toLowerCase().indexOf("e");
        let significand = stringedNumber.slice(0, indexOfBase);
        console.log(`type of significand in get significand is ${typeof significand}`);
        return significand;
    }
    //or return no value;
    return undefined;
}

// Returns the exponent part including "e" 
function removeSignificand(stringedNumber) {

    //return exponent expression
     if(stringedNumber.toLowerCase().includes("e")) {
        let indexOfBase = stringedNumber.toLowerCase().indexOf("e");
        let removedSignificandNumber = stringedNumber.slice(indexOfBase);
        return removedSignificandNumber;
    }
    //or return no value;
    return undefined;
}


//=================================================================
//SCIENTIFIC NOTATION / NUMBER FORMAT HELPERS
//=====================================================================

//Checks if number starts with 0.0000/00000 (small decimals);
function isSmallProperDecimal(stringedNumber) {

     //for scientific notation numbers
    if (stringedNumber.toLowerCase().includes("e")) {
        let exponent = getExponent(stringedNumber);
        return (exponent !== undefined && exponent <= -5) ? true : false;
    
    } else {
        //for normal decimal/zero-padded strings
        let startsWithFivePlusZeros = /^0(\.0{4,}|0{4,})/;
        return startsWithFivePlusZeros.test(stringedNumber) ? true : false; 
    }
}




//Checks if decimal ends with 3+ zeros before a single digit
function checkPaddedZerosWithEndNumber(stringedNumber) {

    let numberToCheck = stringedNumber;
    const endsWithZerosThenDigit = /(0{3,})\d$/;
    
    //convert to string
    if(typeof stringedNumber !== "string") {
        // numberToCheck = stringedNumber.toString();
        return false;
    }
    //remove integers
    if(!numberToCheck.includes(".")) {
        return false;
        //check if need to change return statement to undefined.
    }
    
    //update with significand
    if(stringedNumber.toLowerCase().includes("e")) {
       const significand = getSignificand(stringedNumber);
       numberToCheck = significand;
    } 

    if (endsWithZerosThenDigit.test(numberToCheck)) {
         return true;
    }
    return false;
}



//helper function to find digits in scientific numbers
//do i want to return stringed number when not SN number?
//or undefined/null/NaN?
function getScientificNumberLength(stringedNumber) {
    
    
    if(typeof stringedNumber !== "string") {
        return undefined;
    }
    //for Scientific Numbers
    if (stringedNumber.toLowerCase().includes("e")) {
            let significand = getSignificand(stringedNumber);
            let exponent = getExponent(stringedNumber);

            let cleanedSignificand = removeAllNonNumbers(significand);
            let cleanedExponent = removeAllNonNumbers(exponent);
            //convert to both to numbers and add to find total digits;
            let totalSignificantDigits = Number(cleanedSignificand.length) + Number(cleanedExponent);
            console.log(`totalSignificantDigits = ${totalSignificantDigits}`)
            return totalSignificantDigits;       
    }
    return undefined;
}



function getDecimalNumberLength(stringedNumber) {
    
    //remove non string data types;
    if(typeof stringedNumber !== "string") {
        return undefined;
    }

    //for decimals
    if (stringedNumber.includes(".") && !stringedNumber.toLowerCase().includes("e")) {
       let cleanedDecimalNum = removeAllNonNumbers(stringedNumber);
       return cleanedDecimalNum.length;   
    }
    //if not decimal return as is;
    return undefined;
}



function removeTrailingZeros(stringedNumber) {
     
    //exits out if scientific notation number;
    if (stringedNumber.includes("e")) {
        console.log("we got some e");
        return stringedNumber;
    }
    //stores index of dp;
    const decimalPlace = stringedNumber.indexOf(".");
    
    //if number doesn't contain dot return number as is;
    if (decimalPlace === -1) {
        return stringedNumber;
    }
    
    //splits into two parts at the index of the dp;
    const beforeDecimalPlace = stringedNumber.slice(0, decimalPlace);
    const afterDecimalPlace = stringedNumber.slice(decimalPlace);
    
    let afterDecimalArray = afterDecimalPlace.split("");
    let minusTrailingZeros;

    
    //create array to remove trailing zeros
    for (let i = afterDecimalArray.length; i >= 0; i--) {

            const lastCharacter = afterDecimalArray[afterDecimalArray.length - 1];
            if (lastCharacter === "0" || lastCharacter === ".") {
                    //then remove last character
                    afterDecimalArray.pop();
            } 
            //change back to string when removed zeros off end;
            minusTrailingZeros = afterDecimalArray.join("");
    }

    // attach two parts back together and return;
    return beforeDecimalPlace + minusTrailingZeros;
}



function removeZerosFollowedByEndNumber(stringedNumber) {


    if(typeof stringedNumber !== "string") {
        return undefined;
    }
    
    let removedEndDigitNumber = undefined;
    let removedtrailingDigitsNumber = undefined
    

    ///for scientific notation numbers
    if(stringedNumber.toLowerCase().includes("e")) {
        let significand = getSignificand(stringedNumber);
        let nonSignificandPart = removeSignificand(stringedNumber);
        removedEndDigitNumber = significand.slice(0, -1);
        removedtrailingDigitsNumber = removeTrailingZeros(removedEndDigitNumber);
        return removedtrailingDigitsNumber + nonSignificandPart;

    } 
    //For decimals
    else if (stringedNumber.includes(".")) {
        removedEndDigitNumber = stringedNumber.slice(0, -1);
        removedtrailingDigitsNumber = removeTrailingZeros(removedEndDigitNumber);  
        return removedtrailingDigitsNumber;
    } else  {
       return undefined;
    }
    
   
}



// ===================================================================================
// BASIC MATH OPERATIONS
// ========================================================================================


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


//========================================================================
//INTERMEDIATE HELPER FUNCTIONS
//===========================================================================



function removeExcessDecimalPlaces(stringedNumber) {
    
    let refinedNumber = undefined;
    
    //convert scientific notation numbers to normal number
    //then remove zeros from end
    if (stringedNumber.includes("e")) {
        console.log("got e in remove dps");
        
        let number = Number(stringedNumber);
        let nonExponential = number.toFixed(15);
        
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



//checks if number is in precise range returning true or false;
function isPrecise(stringedNumber) {

    console.log(`number at isPrecise start is ${stringedNumber}`);
    
    //for Scientific Numbers
    
    let scientificNotationLength = getScientificNumberLength(stringedNumber);
    
    if (scientificNotationLength <= 15 && 
        scientificNotationLength !== undefined) {
            return true;
    } 

    //for decimals
    let decimalNumberLength = getDecimalNumberLength(stringedNumber);

    if(decimalNumberLength <= 15 && 
       decimalNumberLength !== undefined) {
        return true;
    }
    

    //for integers
    let pureNumber = Number(stringedNumber);
    if (Number.isSafeInteger(pureNumber)) {
    return true;
    }
    return false;
}



//displays Nan or result dependant on num length;
//used to display result 
function refineResultForDisplay(stringedNumber) {

    // remove excess dps from result;  
    let refinedNumber = removeExcessDecimalPlaces(stringedNumber);

    //removes all non numbers for results length check
    let cleanedNumber = removeAllNonNumbers(refinedNumber);
    //keeps result to 12 digits max and updates display
    if (cleanedNumber.length > 12) {
        // console.log(`refined number before make zero is: ${refinedNumber}`);

        //update refined number to zero if is small decimal;
        // refinedNumber = makeSmallProperDecimalsZero(refinedNumber);
        // console.log(`refined number after make zero is: ${refinedNumber}`);
        if (isSmallProperDecimal(refinedNumber)) {
            refinedNumber = "0";
            console.log("is small decimal over 12 digits");
            console.log(`refined number after small proper decimal check is: ${refinedNumber}`);
            console.log(`refined number is ${refinedNumber} (should be zero)`);
            return currentDisplayText.textContent = refinedNumber;
        }
            
        // } else {
            // console.log(`type of cleaned number is ${typeof cleanedNumber}`);
            console.log(`cleaned number with over 12 or more digits is: ${cleanedNumber}`);
            clearAll();
            return currentDisplayText.textContent = "NaN";
        }
       
        
    // } else {
        

        currentDisplayText.textContent = refinedNumber;
    // }
    // console.log(`refined number at refine for display end is ${refinedNumber}`);
    // console.log(`display number at refine for display end is ${displayNumber}`);
    // console.log(`numberOne number at refine for display end is ${numberOne}`);
    // console.log(`numberTwo number at refine for display end is ${numberTwo}`);
    return;
}  



//===============================================================================================
//MAIN HELPER FUNCTIONS---
//=============================================================================================



function operate(numberOne, operator, numberTwo, event) {
     

    //converts from string into number;
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);
    
    let value;

    //divided by zero code with snarky message;
    if (operator === divideOperator && (numberTwo === 0 || numberTwo === -0)) {
        clearAll(event);
        currentDisplayText.textContent = "Clever!";
        //why am i returning value? is it for result? could i do NaN?
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
    
    //convert to result back to string
    value = value.toString();
    
    console.log(`value after calculation in operate is ${value}`);

    if (checkPaddedZerosWithEndNumber(value))  {
        console.log(`value before remove 3+ zero then num func is ${value}`);
         value = removeZerosFollowedByEndNumber(value);
        console.log(`value after remove 3+ zero then num func is ${value}`);
    }
    
    
    return value;
}






//=====================================================
//FEATURE: ADD NUMBERS TO CALCULATOR
//=====================================================



//Numbers event function to them to display;
function addNumberToDisplay(event) {

    //this fixes issue after divide by zero
    //dont understand when displayNumber becomes undefined though
    if (displayNumber === undefined) {
        console.log("this aint no proper number");
        displayNumber = "";
    };

    //display 1st part of calculation for clarity;
    if (isValidNumber(numberOne) && operator) {
        previousExpressionDisplay.textContent = `${numberOne} ${operator}`;
    }

    //resets calculator after pressed equals;
    if (!isValidNumber(numberOne) && operator && isValidNumber(displayNumber)) {
        clearAll();
    }

    //stores number value to add to display later;
    let eventNum = event.target.textContent;

    //Adds count variable if there isn't one already;
    //also add events for dot,clear entry and maths ops
    if (!numbers.count) {
          numbers.count = 0;
          addDecimalPlaceEventListener();
          addClearEntryEventlistener();
          addArithmeticOperatorsEventListener();   
    };

    //keeps length of each number to 9 max
    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return currentDisplayText.textContent = displayNumber;
    }
    
    //increment to keep record of current number length;
    ++numbers.count;

    
    //Either replace displayNumber or add to it
    if (displayNumber === "0") {
        displayNumber = eventNum;
    } else {
        displayNumber += eventNum;
    }

    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isValidNumber(numberOne) && numbers.count === 1) {
        addEqualsEventListener();
    }
    return currentDisplayText.textContent = displayNumber;
};


//code for adding/removing numbers event listeners;

function addNumbersEventListener () {
    numbers.forEach((number) => {
        number.addEventListener("click", addNumberToDisplay);
    });
};

function removeNumbersEventListener() {
    numbers.forEach((number) => {
        number.removeEventListener("click", addNumberToDisplay);
    });
};

//add numbers event at beginning;
addNumbersEventListener();




//=====================================================
//FEATURE: ADD MATHS OPERATORS TO CALCULATOR;
//=====================================================



function addOperator(event) {
    console.log(`type of display number at addOp start is ${typeof displayNumber}`);
    let currentOperator = event.target.textContent;

    //highlights current maths operator button;
    event.target.focus();
    
    //delete count property until next num btn is pressed
    delete numbers.count;
    

    //resets 2nd num value for repeat operations
    if(isValidNumber(numberTwo)) {
        numberTwo = undefined;
    }

    //Add display number to numberOne variable if it has no value;
    if (!isValidNumber(numberOne)&& isValidNumber(displayNumber)) {
        numberOne = displayNumber;
        displayNumber = "";
        addNumbersEventListener();
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
        previousExpressionDisplay.textContent = `${numberOne} ${operator} ${numberTwo} =`;
        
        //Result will be undefined and display showing Clever!;
        //could make this more clear
        if(!isValidNumber(result)) {
            return;
        }
        
        // if runs when number has lost precision
        if(!isPrecise(result)) {
            console.log("result is inprecise");
            if (isSmallProperDecimal(result)) {
                console.log(`${result} is a small decimal`)
                result = "0";
            } else {
                console.log(`${result} is not a small decimal`)
                clearAll();
                currentDisplayText.textContent = "Precision Error";
                return;
            }       
        }
        //runs if result is within fine limits
        numberOne = result;
        numberTwo = undefined;
        // console.log(`Number one if result is fine in add operators is ${numberOne}`);
        // console.log(`result if result is fine in add operators is ${result}`);
        // console.log(`Number two if result is fine in add operators is ${numberTwo}`);
        // console.log(`display number if result is fine in add operators is ${displayNumber}`);
        addNumbersEventListener();
        removeEqualsEventListener();
        return refineResultForDisplay(result);    
    };

    operator = currentOperator;

    //stops breaking calculator for repeat calculations;
    if(isValidNumber(numberOne) && operator && !isValidNumber(numberTwo)) {
        removeEqualsEventListener();   
    }
    
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
    console.log(`type of display number at resolveEquation start is ${typeof displayNumber}`);
    //reset count property for addToDisplay();
    delete numbers.count;

    //readd event listener for repeat operations
    //think this can be deleted;
    // addArithmeticOperatorsEventListener();


    
    //if number One doesn't have a value add displayNumber to it
    if(!isValidNumber(numberOne) && isValidNumber(displayNumber) && isValidNumber(numberTwo)) {
        numberOne = displayNumber;
    }
    
    //If number 2 doesn't have value add displayNumber to it;
    if (isValidNumber(numberOne) && isValidNumber(displayNumber) && !isValidNumber(numberTwo)) {
        numberTwo = displayNumber;
    }


    //CALCULATE AND DISPLAY RESULT CODE
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {

        let result = operate(numberOne, operator, numberTwo);
        previousExpressionDisplay.textContent = `${numberOne} ${operator} ${numberTwo} =`;

        //when divide by zero exit out of whole function
        if(!isValidNumber(result)) {
            return;
        }

        if(!isPrecise(result)) {
            console.log("result is inprecise");
            if (isSmallProperDecimal(result)) {
                console.log(`${result} is a small decimal`)
                result = "0";
            } else {
                console.log(`${result} is not a small decimal`)
                clearAll();
                // previousExpressionDisplay.textContent = "";
                currentDisplayText.textContent = "Precision Error";
                return;
            }
                
        }
            // previousExpressionDisplay.textContent = `${numberOne} ${operator} ${numberTwo} =`;
            console.log("refine result code in resolveEquation ran");
            numberOne = undefined;
            displayNumber = result;
            return refineResultForDisplay(result);
        
    };   
}

//Equals click event add/remove code

function addEqualsEventListener() {
    equalsButton.addEventListener("click", resolveEquation);
}

function removeEqualsEventListener() {
    equalsButton.removeEventListener("click", resolveEquation);
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
    previousExpressionDisplay.textContent = "";
    addNumbersEventListener();
    addArithmeticOperatorsEventListener();
    removeEqualsEventListener();
}

//AC button add click event;
allClearButton.addEventListener("click", clearAll);




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
        removeDecimalPlaceEventListener();
        displayNumber = "";
        removeClearEntryEventListener();
        return currentDisplayText.textContent = "0";
    }
}

//Clear entry add/remove click event funcs;
function addClearEntryEventlistener() {
clearEntryButton.addEventListener("click", deleteCharacter);
}

function removeClearEntryEventListener() {
    clearEntryButton.removeEventListener("click", deleteCharacter);
}







//=====================================================
//FEATURE: ADD DECIMAl PLACE TO NUMBERS CODE;
//=====================================================


function addDecimalPlace(event) {

    const decimalPlace = event.target.textContent;
    if (!displayNumber.includes(decimalPlace) && isValidNumber(displayNumber)) {
        displayNumber += decimalPlace;
        currentDisplayText.textContent = displayNumber;
     }
}


function addDecimalPlaceEventListener() {
    decimalPlaceButton.addEventListener("click", addDecimalPlace, {once: true});
}

function removeDecimalPlaceEventListener() {
    decimalPlaceButton.removeEventListener("click", addDecimalPlace);
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
    // console.log(`key is ${key}`);
    event.preventDefault();
    if(heldDownKeys[key]) return;
    heldDownKeys[key] = true;
    
    //
    switch(key) {
        case "Delete":
            allClearButton.click();
            break;
        case "Backspace":
            clearEntryButton.click();
            break;
        case "0":
            button0.click();
            break;
        case "1":
            button1.click();
            break;
        case "2":
            button2.click();
            break;
        case "3":
            button3.click();
            break;
        case "4":
            button4.click();
            break;
        case "5":
            button5.click();
            break;
        case "6":
            button6.click();
            break;
        case "7":
            button7.click();
            break;
        case "8":
            button8.click();
            break;
        case "9":
            button9.click();
            break;
        case ".":
            decimalPlaceButton.click();
            break;
        case "Enter":
            equalsButton.click();
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

/*TEST FOR NON-ZERO NUMBER
//test if valid non zero number,returns true or false;
// function isNonZeroNumber(value) {
//     const number = Number(value);
//     return Number.isFinite(number) && number !== 0;
// }

/*FOR CONVERTING SMALL DECIMALS TO ZERO
//converts number to zero if it's a small proper decimal;
//don't think need to return stringedNumber after the check func;
// function makeSmallProperDecimalsZero(stringedNumber) {
     
//     //for scientific notation numbers
//     if (stringedNumber.toLowerCase().includes("e")) {
//         let exponent = getExponent(stringedNumber);

//         //converts Scientific numbers to zero if they represent very small decimals
//         return (exponent !== undefined && exponent <= -5) ? "0" : stringedNumber;
    
//     } else {
//         //for normal decimal/zero-padded strings
//         let startsWithFivePlusZeros = /^0(\.0{4,}|0{4,})/;
//         return startsWithFivePlusZeros.test(stringedNumber) ? "0" : stringedNumber; 
//     }
// }

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


/*OLD IS PRECISE FUNC CODE*/
    // if (stringedNumber.toLowerCase().includes("e")) {
    //         console.log("triggered SN if in isPrecise");
            // let baseIndex = stringedNumber.toLowerCase().indexOf("e");
            // let significand = stringedNumber.slice(0, baseIndex);
            // let significand = getSignificand(stringedNumber);
            // let exponent = getExponent(stringedNumber);

            // let cleanedSignificand = removeAllNonNumbers(significand);
            // let cleanedExponent = removeAllNonNumbers(exponent);
            //convert to nums and add to find  total digits;
            // let totalSignificantDigits = Number(cleanedSignificand.length) + Number(cleanedExponent);
            // console.log(`totalSignificantDigits = ${totalSignificantDigits}`)
            //added exponent to check certain amount of zeros;
            // let exponent = stringedNumber.slice(baseIndex + 1);
            // if (exponent <= -5) {
            //     console.log(`exponent value in is precise is ${exponent}`);
            // }


     //else { 

        // let exponent = getExponent(stringedNumber);

        // if(exponent !== undefined && exponent <= -7) {
        //     console.log(`stringed num is ${stringedNumber}`);
        //     value = 0;
        // }
    //     console.log("SN num isn't precise");
    //     console.log("SN num is over 15 digits long");
    //     return false;
    // }; 
    // }

    // if (stringedNumber.includes(".")) {
    //    let cleanedDecimalNum = removeAllNonNumbers(stringedNumber);
    //    if (cleanedDecimalNum.length <= 15) {
    //       return true;
    //     }
    // }


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


// function getNumberLength(stringedNumber) {

//     //remove non string data types;
//     if(typeof stringedNumber !== "string") {
//         return stringedNumber;
//     }

//     //for integers
//     let pureNumber = Number(stringedNumber);
//     if (Number.isSafeInteger(pureNumber)) {
//     return true;
//     }
//     return false;


//     //if not decimal return as is;
//     return stringedNumber;

// }

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