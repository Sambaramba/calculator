//==========================================================
// GLOBAL VARIABLES
//============================================================

//VARIABLES FOR THE MATHS EXPRESSION
let numberOne = undefined;
let operator = undefined;
let numberTwo = undefined;

//VARIABLES THAT STORE DISPLAY VALUES
let currentDisplayNumber = "";


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
const divideButton = document.querySelector("#divide-button");
const multiplyButton = document.querySelector("#multiply-button");
const minusButton = document.querySelector("#minus-button");
const plusButton = document.querySelector("#plus-button");

//Equals button
const equalsButton = document.querySelector("#equals-button");

//Clear buttons;
const allClearButton = document.querySelector ("#ac-button");
const clearEntryButton = document.querySelector("#ce-button");

//Decimal place button;
const decimalPointButton = document.querySelector("#dot-button");


//OTHER INDIVIDUAL ELEMENTS;

// Select and initialize the current display element
let currentDisplayText = document.querySelector("#current-display");
currentDisplayText.textContent = "0";

// Select and clear the previous expression display
let previousExpressionDisplay = document.querySelector("#previous-expression-display");
previousExpressionDisplay.textContent = "";


//GROUPING DOM ELEMENTS;

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

    //removes all non-number characters
   let cleanedNumber = stringedNumber.replace(/\D/g, "");
   return cleanedNumber;
}


// --------------------------------------
// SCIENTIFIC NOTATION HELPERS
// --------------------------------------


// Extracts exponent from scientific notation string;
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
function hasTrailingZerosBeforeDigit(stringedNumber) {

    let numberToCheck = stringedNumber;
    const endsWithZerosThenDigit = /(0{3,})\d$/;
    
    //Ensure input is a string: otherwise, return false
    if(typeof stringedNumber !== "string") {
        return false;
    }

    //return false if numbers not a decimal
    if(!numberToCheck.includes(".")) {
        return false;
    }
    
    //Extract significand if numbers is scientfic notation
    if(stringedNumber.toLowerCase().includes("e")) {
       const significand = getSignificand(stringedNumber);
       numberToCheck = significand;
    } 
    //Test if the string ends with three or more zeros followed by a digit
    if (endsWithZerosThenDigit.test(numberToCheck)) {
         return true;
    }
    return false;
}

//--------------------------------------------------------------------
//FIND NUMBERS LENGTH FUNCTIONS
//--------------------------------------------------------------------


function getScientificNumberLength(stringedNumber) {
    
    
    if(typeof stringedNumber !== "string") {
        return undefined;
    }
    
    if (stringedNumber.toLowerCase().includes("e")) {
            let significand = getSignificand(stringedNumber);
            let exponent = getExponent(stringedNumber);

            let cleanedSignificand = removeAllNonNumbers(significand);
            let cleanedExponent = removeAllNonNumbers(exponent);

            //convert both to numbers and add together to find total digits;
            let totalSignificantDigits = Number(cleanedSignificand.length) + Number(cleanedExponent);
            return totalSignificantDigits;       
    }
    return undefined;
}



function getDecimalNumberLength(stringedNumber) {
    
    if(typeof stringedNumber !== "string") {
        return undefined;
    }

    if (stringedNumber.includes(".") && 
       !stringedNumber.toLowerCase().includes("e")) {
            let cleanedDecimalNum = removeAllNonNumbers(stringedNumber);
            return cleanedDecimalNum.length;   
    }

    return undefined;
}

//---------------------------------------------------
//REMOVE ZEROS FUNCTIONS
//--------------------------------------------------------------------


function removeTrailingZeros(stringedNumber) {
     
    //exits out if scientific notation number;
    if (stringedNumber.includes("e")) {
        return stringedNumber;
    }
    
    const decimalPoint = stringedNumber.indexOf(".");
    
    //exit out of function if number is an integer
    if (decimalPoint === -1) {
        return stringedNumber;
    }
    
    //splits into two parts at the decimal place;
    const beforeDecimalPoint = stringedNumber.slice(0, decimalPoint);
    const afterDecimalPoint = stringedNumber.slice(decimalPoint);
    
    let afterDecimalPointArray = afterDecimalPoint.split("");
    let withoutTrailingZeros;

    
    //create array to remove all trailing zeros
    for (let i = afterDecimalPointArray.length; i >= 0; i--) {

            const lastCharacter = afterDecimalPointArray[afterDecimalPointArray.length - 1];

            //check if last character is either 0 or decimal point
            if (lastCharacter === "0" || lastCharacter === ".") {
                    //then remove last character
                    afterDecimalPointArray.pop();
            } 
            //change back to string when removed zeros off end;
            withoutTrailingZeros = afterDecimalPointArray.join("");
    }
    // attach two parts back together and return;
    return beforeDecimalPoint + withoutTrailingZeros;
}


/*Removes the last digit of a decimal or scientific notation number (as a string),
then trims any trailing zeros from the resulting number.*/
function removeTrailingZerosAndFinalDigit(stringedNumber) {

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
    if (stringedNumber.includes(".")) {
        removedEndDigitNumber = stringedNumber.slice(0, -1);
        removedtrailingDigitsNumber = removeTrailingZeros(removedEndDigitNumber);  
        return removedtrailingDigitsNumber;
    }
    //If netiher a decimal or a scientific notation number return undefined;
    return undefined;
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
    if (stringedNumber.includes("e")) {
        
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



//checks if number is in javascripts precise number range; returning true or false;
function isPrecise(stringedNumber) {

    
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




function refineResultForDisplay(stringedNumber) {
    
    // remove excess decimal places 
    let refinedNumber = removeExcessDecimalPlaces(stringedNumber);
    
    //removes all non numbers for digit length check
    let cleanedNumber = removeAllNonNumbers(refinedNumber);

    // Limit result to 12 digits max
    if (cleanedNumber.length > 12) {
        // If it's a small proper decimal, display as 0
        if (isSmallProperDecimal(refinedNumber)) {
            refinedNumber = "0";
            currentDisplayText.textContent = refinedNumber;
            return 
        }
        // Otherwise, it's too long or invalid — clear and show NaN
        clearAll();
        currentDisplayText.textContent = "NaN";
        return
        }
    //Display the refined result if in acceptable limits;   
    currentDisplayText.textContent = refinedNumber;
    return;
}  



//===============================================================================================
//MAIN HELPER FUNCTIONS---
//=============================================================================================



function operate(numberOne, operator, numberTwo, event) {

    // Define Unicode operator symbols for clarity
    const plusOperator = "\u002B";
    const minusOperator = "\u2212";
    const multiplyOperator = "\u00D7";
    const divideOperator = "\u00F7";

    //converts from string into number for maths functions;
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);
    
    let value;

    //divided by zero code with snarky message;
    if (operator === divideOperator && (numberTwo === 0 || numberTwo === -0)) {
        clearAll();
        previousExpressionDisplay.textContent = "";
        currentDisplayText.textContent = "Clever!";
        return undefined;
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

        default: 
        return undefined;
    }
    
    //convert to result back to string
    value = value.toString();

    // Clean up result if it ends with 3+ zeros before a digit 
    if (hasTrailingZerosBeforeDigit(value))  {
         value = removeTrailingZerosAndFinalDigit(value);
    }

    return value;
}




//=====================================================
//FEATURE: ADD NUMBERS TO CALCULATOR
//=====================================================



//Numbers event function to them to display;
function addNumberToDisplay(event) {
     

    previousExpressionDisplay.textContent = "";
    //this fixes issue after divide by zero
    //dont understand when displayNumber becomes undefined though
    //seems superflouous
    // if (currentDisplayNumber === undefined) {
    //     console.log("this aint no proper number");
    //     currentDisplayNumber = "";
    // };

    //display 1st part of calculation for clarity;
    if (isValidNumber(numberOne) && operator) {
        // previousExpressionDisplayNumber = `${numberOne} ${operator}`
        previousExpressionDisplay.textContent = `${numberOne} ${operator}`;
    }

    //resets calculator after pressed equals;
    if (!isValidNumber(numberOne) && operator && isValidNumber(currentDisplayNumber)) {
        clearAll();
    }

    //stores number value to add to display later;
    let eventNum = event.target.textContent;

    //Adds count variable if there isn't one already;
    //also add events for dot,clear entry and maths ops
    if (!numbers.count) {
          numbers.count = 0;
          addDecimalPointEventListener();
          addClearEntryEventlistener();
          addArithmeticOperatorsEventListener();   
    };

    //keeps length of each number to 9 max
    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return currentDisplayText.textContent = currentDisplayNumber;
    }
    
    //increment to keep record of current number length;
    ++numbers.count;

    
    //Either replace displayNumber or add to it
    if (currentDisplayNumber === "0") {
        currentDisplayNumber = eventNum;
    } else {
        currentDisplayNumber += eventNum;
    }

    // console.log(`currentDisplayNumber at addNum end is ${currentDisplayNumber}`);

    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isValidNumber(numberOne) && numbers.count === 1) {
        addEqualsEventListener();
    }
    return currentDisplayText.textContent = currentDisplayNumber;
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

    //Stores maths operator value;
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
    if (!isValidNumber(numberOne)&& isValidNumber(currentDisplayNumber)) {
        numberOne = currentDisplayNumber;
        currentDisplayNumber = "";
        // previousExpressionDisplay.textContent = `${numberOne} ${currentOperator}`;
        addNumbersEventListener();
    }

    //add current display number to 2nd number var
    if (isValidNumber(numberOne) && operator &&
        isValidNumber(currentDisplayNumber) && !isValidNumber(numberTwo)) {
            numberTwo = currentDisplayNumber;
            currentDisplayNumber = "";
    }

    //If variables have values carries out caluclation
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        
        //return stringed number/undefined;
        let result = operate(numberOne, operator, numberTwo);
        previousExpressionDisplay.textContent = `${numberOne} ${operator} ${numberTwo} =`
        
        //If operate() returned undefined;
        //Result will be undefined and calculator will display Clever!;
        if(!isValidNumber(result)) {
            previousExpressionDisplay.textContent = "";
            return;
        }
        
        // if runs when number has lost precision
        if(!isPrecise(result)) {
            if (isSmallProperDecimal(result)) {
                result = "0";
            } else {
                clearAll();
                previousExpressionDisplay.textContent = `${result} =`;
                currentDisplayText.textContent = "Precision Error";
                return;
            }       
        }
        //runs if result is in acceptable limits
        numberOne = result;
        numberTwo = undefined;
        operator = currentOperator;
        addNumbersEventListener();
        removeEqualsEventListener();
        refineResultForDisplay(result); 
        return;  
    };
    
    operator = currentOperator;

    //stops breaking calculator for repeat calculations;
    if(isValidNumber(numberOne) && operator && !isValidNumber(numberTwo)) {
        removeEqualsEventListener();   
    }
    
    return;
    
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

    //resets count for next number;
    delete numbers.count;

    // Enable chained equals by setting numberOne to the last result
    if(!isValidNumber(numberOne) && isValidNumber(currentDisplayNumber) && isValidNumber(numberTwo)) {
        numberOne = currentDisplayNumber;
    }
    
    //Assigns 2nd operand a value to allow equation to run;
    if (isValidNumber(numberOne) && isValidNumber(currentDisplayNumber) && !isValidNumber(numberTwo)) {
        numberTwo = currentDisplayNumber;
    }


    //CALCULATE AND DISPLAY RESULT CODE IF ALL VARIABLES HAVE A VALUE
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {

        let result = operate(numberOne, operator, numberTwo);
        previousExpressionDisplay.textContent = `${numberOne} ${operator} ${numberTwo} =`;
        removeClearEntryEventListener();

        //If operate() returned undefined
        //calculator will display Clever!;
        if(!isValidNumber(result)) {
            previousExpressionDisplay.textContent = "";
            return;
        }
        
        if(!isPrecise(result)) {
            if (isSmallProperDecimal(result)) {
                result = "0";
            } else {
                //runs if lost precision and not small proper decimal;
                clearAll();
                previousExpressionDisplay.textContent = `${result} =`
                currentDisplayText.textContent = "Precision Error";
                return;
            }
                
        }
        //runs if result is in acceptable limits
        numberOne = undefined;
        currentDisplayNumber = result;
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
    currentDisplayNumber = "";
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
    numbers.count = 0;
    // delete numbers.count;
    removeNumbersEventListener();
    removeArithmeticOperatorsEventListener();
    currentDisplayText.textContent = "0";
    previousExpressionDisplay.textContent = "";
    addNumbersEventListener();
    removeEqualsEventListener();
}

//AC button add click event;
allClearButton.addEventListener("click", clearAll);




//=====================================================
//FEATURE: CLEAR ENTRY BUTTON CODE
//=====================================================


function deleteCharacter(event) {
    
    //re-enables number input once back under limit;
    if(currentDisplayNumber.length === 9) {
        addNumbersEventListener();
    }

    let lastCharacter = currentDisplayNumber.charAt(currentDisplayNumber.length - 1);
    let numberCheck = /\d/;

    //if last digit is number decrement the count
    if(numberCheck.test(lastCharacter)) {
        --numbers.count;
    }
    
    //remove last digit and update current display
    currentDisplayNumber = currentDisplayNumber.slice(0, -1);
    currentDisplayText.textContent = currentDisplayNumber;
    
    if (currentDisplayNumber.length === 0) {
        removeDecimalPointEventListener();
        removeClearEntryEventListener();
        currentDisplayNumber = "";
        currentDisplayText.textContent = "0";
        return;
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


function addDecimalPoint(event) {

    const decimalPoint = event.target.textContent;

    if (!currentDisplayNumber.includes(decimalPoint) && 
        isValidNumber(currentDisplayNumber)) {
            currentDisplayNumber += decimalPoint;
            currentDisplayText.textContent = currentDisplayNumber;
     }
}


function addDecimalPointEventListener() {
    decimalPointButton.addEventListener("click", addDecimalPoint, {once: true});
}

function removeDecimalPointEventListener() {
    decimalPointButton.removeEventListener("click", addDecimalPoint);
}



//===========================================
//FEATURE: ATTACH KEYS TO CALCULATOR BUTTONS
//=================================================


//Tracks keys that are being held down;
let heldDownKeys = {};

//Code to attach keydown to click events for buttons
document.addEventListener('keydown', (event) => {
    
    let key = event.key;
    event.preventDefault();

    // Adds key to heldDownKeys with a true flag if it isn't already pressed
    if(heldDownKeys[key]) return;
    heldDownKeys[key] = true;
    
    //trigger button click if key not already held
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
            decimalPointButton.click();
            break;
        case "Enter":
            equalsButton.click();
            break;
        case "/":
            divideButton.click();
            break;
        case "*":
            multiplyButton.click();
            break;
        case "-":
            minusButton.click();
            break;
        case "+":
            plusButton.click();
            break;
        default: console.log("this shouldn't run");
    }
});

//reset key hold flag
document.addEventListener("keyup", (event) => {
       heldDownKeys[event.key] = false;
});

