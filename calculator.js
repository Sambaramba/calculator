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


// Checks if a value is a valid finite number or a numeric string
function isValidNumber(value) {
    
    // Check if value is a number type and finite
    if (typeof value === "number") {
        return Number.isFinite(value);
    }
    // Check if value is a non-empty string representing a finite number
    if (typeof value === "string") {
        // empty or whitespace-only strings are invalid
        if (value.trim().length === 0 ) {
            return false;
        }
        const numberFromString = Number(value);
        return Number.isFinite(numberFromString);
    }

    // All other types are invalid
    return false;
    
}



//For checking absolute length of number
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

    const isScientificNotation =stringedNumber.toLowerCase().includes("e")

    //return exponent
    if(isScientificNotation) {
        const exponentIndex = stringedNumber.toLowerCase().indexOf("e");
        const exponent = stringedNumber.slice(exponentIndex + 1);
        return exponent;
    }
    //return undefined if not scientific notation
    return undefined;
}

// Extracts the significand 
function getSignificand(stringedNumber) {
    
    const isScientificNotation =stringedNumber.toLowerCase().includes("e")

    //return significand
    if(isScientificNotation) {
        const exponentIndex = stringedNumber.toLowerCase().indexOf("e");
        const significand = stringedNumber.slice(0, exponentIndex);
        return significand;
    }
    //return undefined if not scientific notation
    return undefined;
}

// Returns the exponent part including "e" (the non-significand part)
function getNonSignificandPart(stringedNumber) {
    
    const isScientificNotation =stringedNumber.toLowerCase().includes("e")

    //return exponent expression
     if(isScientificNotation) {
        const exponentIndex = stringedNumber.toLowerCase().indexOf("e");
        const nonSignificandPart = stringedNumber.slice(exponentIndex);
        return nonSignificandPart;
    }
    //return undefined if not scientific notation
    return undefined;
}



//=================================================================
//SCIENTIFIC NOTATION / NUMBER FORMAT HELPERS
//=====================================================================

//Checks if number starts with 0.0000/00000 (small decimals); returns true or false
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




//Checks if decimal ends with 3+ zeros before a single end digit; returns true or false
function hasTrailingZerosBeforeDigit(stringedNumber) {
    
    //Ensure input is a string: otherwise, return false
    if(typeof stringedNumber !== "string") return false;

    
    const endsWithZerosThenDigit = /(0{3,})\d$/;
    const isScientificNotation = stringedNumber.toLowerCase().includes("e")

    if(isScientificNotation) {
       const significand = getSignificand(stringedNumber);
       return endsWithZerosThenDigit.test(significand);
    }

    //For Decimal numbers
    if(stringedNumber.includes(".")) {
       return endsWithZerosThenDigit.test(stringedNumber);
    }

    //Returns false for integers
    return false;
}

//--------------------------------------------------------------------
//FIND NUMBERS LENGTH FUNCTIONS
//--------------------------------------------------------------------

//returns total length of scientific notation number or undefined;
function getScientificNumberLength(stringedNumber) {
    
    //exits function if not a string
    if(typeof stringedNumber !== "string") {
        return undefined;
    }

    //finds combined total length of significand and exponent expression if scientific notation
    if (stringedNumber.toLowerCase().includes("e")) {
            let significand = getSignificand(stringedNumber);
            let exponent = getExponent(stringedNumber);

            let cleanedSignificand = removeAllNonNumbers(significand);
            let cleanedExponent = removeAllNonNumbers(exponent);

            //convert both to numbers and add together to find total digits;
            let totalSignificantDigits = Number(cleanedSignificand.length) + Number(cleanedExponent);
            return totalSignificantDigits;       
    }
    //return undefined for other number types
    return undefined;
}


//Returns length of decimal number or undefined
function getDecimalNumberLength(stringedNumber) {
    
    if(typeof stringedNumber !== "string") {
        return undefined;
    }
    const hasDecimalPoint = stringedNumber.includes(".");
    const isScientificNotation = stringedNumber.toLowerCase().includes("e");
    
    
    //Finds length for pure decimal numbers
    if (hasDecimalPoint && !isScientificNotation) {
            const cleanedDecimalNumber = removeAllNonNumbers(stringedNumber);
            return cleanedDecimalNumber.length;   
    }
    
    //Returns undefined for integers and scientific notation numbers
    return undefined;
}

//---------------------------------------------------
//REMOVE ZEROS FUNCTIONS
//--------------------------------------------------------------------

// Returns the input string with trailing zeros removed from the decimal portion, if any
function removeTrailingZeros(stringedNumber) {
     
    const isScientificNotation = stringedNumber.includes("e")
    if (isScientificNotation) {
        return stringedNumber;
    }
    
    const decimalPoint = stringedNumber.indexOf(".");
    // Return early if the number is an integer 
    if (decimalPoint === -1) {
        return stringedNumber;
    }
    
    // Split the string into two parts: before and after the decimal point
    const beforeDecimalPoint = stringedNumber.slice(0, decimalPoint);
    const afterDecimalPoint = stringedNumber.slice(decimalPoint + 1);
    
    let afterDecimalPointArray = afterDecimalPoint.split("");
    

    // Remove trailing zeros and the decimal point if no digits remain after it
    while (
        afterDecimalPointArray.length > 0 && 
        afterDecimalPointArray[afterDecimalPointArray.length - 1] === "0"
    ) {
        afterDecimalPointArray.pop();
    }
    // Convert the array back to a string after trimming
    const withoutTrailingZeros = afterDecimalPointArray.join("");

    if (withoutTrailingZeros.length === 0) {
        return beforeDecimalPoint
    }
    //Attach two parts back together and return the result;
    return beforeDecimalPoint + "." + withoutTrailingZeros;
}


/*Removes the last digit for decimal or scientific notation numbers (as a string),
then trims any trailing zeros from the resulting number.*/
//returns undefined for integers
function removeTrailingZerosAndFinalDigit(stringedNumber) {
    
    if(typeof stringedNumber !== "string") {
        return undefined;
    }
    
    const isScientificNotation = stringedNumber.toLowerCase().includes("e")
    const hasDecimalPoint = stringedNumber.includes(".")
    let withoutEndDigit;
    let withoutEndDigitAndTrailingZeros;

    //for scientific notation numbers
    if(isScientificNotation) {
        let significand = getSignificand(stringedNumber);
        let nonSignificandPart = removeSignificand(stringedNumber);
        withoutEndDigit = significand.slice(0, -1);
        withoutEndDigitAndTrailingZeros = removeTrailingZeros(withoutEndDigit);
        return withoutEndDigitAndTrailingZeros + nonSignificandPart;

    } 
    //For decimals
    if (hasDecimalPoint) {
        withoutEndDigit = stringedNumber.slice(0, -1);
        withoutEndDigitAndTrailingZeros = removeTrailingZeros(withoutEndDigit);  
        return withoutEndDigitAndTrailingZeros;
    }
    //If numbers neither a decimal or in scientific notation form; return undefined;
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


// Refines a numeric string by removing excess decimal places
function removeExcessDecimalPlaces(stringedNumber) {
    
    const isScientificNumber = stringedNumber.includes("e");
    let refinedNumber;
    
    //for scientific notation numbers
    if (isScientificNumber) {
        
        const number = Number(stringedNumber);

        //Convert to full decimal string
        const nonExponential = number.toFixed(15);

        //return stringed decimal number with trimmed trailing zeros
        return removeTrailingZeros(nonExponential);
        
    }
    
    // Match numbers that start with a single digit before the decimal point
    const singleDigitThenDecimal = /^\d\./;
    const negativeSingleDigitThenDecimal = /^-\d\./;
    
    //refine to 11 decimal place if it does;
    if (singleDigitThenDecimal.test(stringedNumber) || 
        negativeSingleDigitThenDecimal.test(stringedNumber))
        {   
            refinedNumber = Number(stringedNumber).toFixed(11);
        } else {
            //Otherwise refine to 2 decimal places 
            refinedNumber = Number(stringedNumber).toFixed(2);
        }
    
    //Trim trailing zeros
    return removeTrailingZeros(refinedNumber);
} 



//Check if number is in javascripts precise number range; returning true or false;
function isPrecise(stringedNumber) {
     
    if (typeof stringedNumber !== "string") return false;
    
    //For Scientific Notation
    const scientificLength = getScientificNumberLength(stringedNumber);
    if (scientificLength !== undefined && scientificLength <= 15) {
        return true;
    } 

    //For decimal numbers
    const decimalLength = getDecimalNumberLength(stringedNumber);
    if(decimalLength !== undefined && decimalLength <= 15) {
        return true;
    }
    
    //For integers
    const numericValue = Number(stringedNumber);
    if (Number.isSafeInteger(numericValue)) {
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
            return; 
        }
        // Otherwise, it's too long or invalid — clear and show NaN
        clearAll();
        currentDisplayText.textContent = "NaN";
        return;
        }
    //Display the refined result if in acceptable limits;   
    currentDisplayText.textContent = refinedNumber;
    return;
}  



//===============================================================================================
//MAIN HELPER FUNCTIONS---
//=============================================================================================


//
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
    
    //convert result back to string
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



//Numbers event function for adding them to variables and the display;
function addNumberToDisplay(event) {
     
    //resets previous display after precision errors
    previousExpressionDisplay.textContent = "";
    

    //display 1st two parts of calculation for user clarity;
    if (isValidNumber(numberOne) && operator) {
        previousExpressionDisplay.textContent = `${numberOne} ${operator}`;
    }

    //resets calculator after equals was pressed;
    if (!isValidNumber(numberOne) && operator && isValidNumber(currentDisplayNumber)) {
        clearAll();
    }

    //stores selected number value to add to current number and display;
    let eventNumber = event.target.textContent;

    //Add count when add first number to display
    //Add listeners for decimal point,clear entry and maths operators;
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
    
    
    if (currentDisplayNumber === "0") {
        //replaces to stop adding multiple zeros at beginning
        currentDisplayNumber = eventNumber;
    } else {
        //Otherwise adds number to end
        currentDisplayNumber += eventNumber;
    }

    
    //Only adds equals event when 2nd number variable conatins a number;
    if (isValidNumber(numberOne) && numbers.count === 1) {
        addEqualsEventListener();
    }

    //Update with current number
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

    //Stores value of selected maths operator
    let currentOperator = event.target.textContent;

    //highlights current maths operator button;
    event.target.focus();
    
    //delete count property until next number buttons pressed
    delete numbers.count;
    // numbers.count = 0;
    

    //resets 2nd number variables value for repeat operations
    if (isValidNumber(numberTwo)) {
        numberTwo = undefined;
    }

    //Add display number to numberOne variable if it has no value;
    if (!isValidNumber(numberOne)&& isValidNumber(currentDisplayNumber)) {
        numberOne = currentDisplayNumber;
        currentDisplayNumber = "";
        addNumbersEventListener();
    }

    //add current display number to 2nd number var
    if (isValidNumber(numberOne) && operator &&
        isValidNumber(currentDisplayNumber) && !isValidNumber(numberTwo)) {
            numberTwo = currentDisplayNumber;
            currentDisplayNumber = "";
    }

    //If variables have values carries out caluclation
    if (isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        
        //return stringed number/undefined;
        let result = operate(numberOne, operator, numberTwo);
        previousExpressionDisplay.textContent = `${numberOne} ${operator} ${numberTwo} =`
        
        //If operate() returned undefined;
        //Result will be undefined and calculator will display Clever!;
        if (!isValidNumber(result)) {
            previousExpressionDisplay.textContent = "";
            return;
        }
        
        
        if (!isPrecise(result)) {
            //If pass test update result to zero
            if (isSmallProperDecimal(result)) {
                result = "0";
            } else {
                //Reset calculator and inform user in displays
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


function resolveEquation(event) {

    //resets count for next number;
    delete numbers.count;
    // numbers.count = 0;

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
    // delete numbers.count
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
    if (isValidNumber(currentDisplayNumber) && !currentDisplayNumber.includes(decimalPoint)) {
            currentDisplayNumber += decimalPoint;
            currentDisplayText.textContent = currentDisplayNumber;
     }
}


function addDecimalPointEventListener() {
    decimalPointButton.addEventListener("click", addDecimalPoint);
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

