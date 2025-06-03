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

function operate(numberOne, operator, numberTwo, event) {
     

    //converts from string into number;
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);
    

    let value;

    
    //divided by zero code with snarky message;
    if (operator === divideOperator && (numberTwo === 0 || numberTwo === -0)) {
        clearAll(event);
        displayText.textContent = "Clever!";
        // console.log("Clever!");
        return value;
    }

     
     

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
    
    console.log( `value is : ${value}`);
    //convert to result back to string
    value = value.toString();
    
    
    
    
    
    return value;
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

function removeNumbersEventListener() {
    numbers.forEach((number) => {
        number.removeEventListener("click", addNumberToDisplay)
        })
};

//add numbers event at beginning;
addNumbersEventListener();

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


//Numbers event function to them to display;
function addNumberToDisplay(event) {
    // console.log(displayNumber);
    

    //this fixes issue after divide by zero
    //dont understand when displayNumber becomes undefined though
    if (displayNumber === undefined) {
        console.log("this aint no proper number");
        displayNumber = "";
    }

    
    let eventNum = event.target.textContent;
    
    //adds maths op event listener at code start and reset start;
    if (!numbers.count && !isValidNumber(numberOne)) {
        addArithmeticOperatorsEventListener();
        console.log("maths op event added in addNum");
    }

    //Adds count variable if there isn't one already;
    if (!numbers.count) {
          numbers.count = 0;
          addDotEventListener();
          console.log("added dot event in addNum");
        
        //Resets if is not minus;
        if (displayNumber !== "-") {
            displayNumber = "";
        }
    };

    

    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return displayText.textContent = displayNumber;
    }

    ++numbers.count;
    console.log(numbers.count);

    
    
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
        // removeMinusSignEventListener();
        console.log(("add equals event in addNum"));
    }
    // console.log(event.target);
    // console.log(displayNumber);
    return displayText.textContent = displayNumber;
};




//ADD MATHS OPERATORS EVENT CODE;

let arithmeticOperators = document.querySelectorAll(".arithmetic-operator");


//function to reuse add arithmetic operators click event code
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


function addOperator(event) {
    // console.log(event);
    // console.log("Number One's starting value is: " + numberOne);
    console.log("Operators starting value in addOp is: " + operator);
    // console.log("Numbers two's starting value is: " + numberTwo);
    // console.log("Display number's starting value is: " + displayNumber);


    let currentOperator = event.target.textContent;
    // console.log(`current operator is ${currentOperator}`);
    
    
    //delete count property until next num btn is pressed
    delete numbers.count;
    
    
    //adds minus to displayNumber start if operator is divide or multiply;
    if (currentOperator === minusOperator) {
        if(operator === divideOperator || operator === multiplyOperator) {
            displayNumber = "-";
            displayText.textContent = displayNumber;
            removeArithmeticOperatorsEventListener();
            return;
        }
    }

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
        console.log("numberOne value is: " + numberOne);
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
        
        //if condtion is met exit out of whole function;
        //result will be undefined and display showing Clever!;
        if(!isValidNumber(result)) {
            return;
        }
        
        // if runs when number has lost precision
        //else runs if result is still precise;
        if(!isPrecise(result)) {
            console.log("result isn't precise");
            console.log(`Value of result is ${result}`);
            clearAll();
            return displayText.textContent = "Error";
                
        } else {
            numberOne = result;
            numberTwo = undefined;
            operator = currentOperator;
            console.log(`Value of result is ${result}`);
            console.log(`Value of displayNumber is ${displayNumber}`);
            addNumbersEventListener();
            removeEqualsEventListener();
            return refineResultForDisplay(result);
        }
        
    };

    operator = currentOperator;
    console.log(`operator value is now ${operator}`);

    
    //removes equals event if condition met
    if(isValidNumber(numberOne) && operator && !isValidNumber(numberTwo)) {
        console.log("equals removed from add op");
        removeEqualsEventListener();
        
        
    }
    
    // could refactor and return something
    return
    
};




//EQUALS BUTTON EVENT CODE;

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
    }



    //wack code block in another function?
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {

        let result = operate(numberOne, operator, numberTwo);

        if(!isValidNumber(result)) {
            return;
        }

        if(!isPrecise(result)) {
            console.log("result isn't precise");
            clearAll();
            return displayText.textContent = "Error";
                
        } else {
            numberOne = undefined;
            displayNumber = result;
            console.log(`Value of displayNumber is ${displayNumber}`);
            // addNumbersEventListener();
            return refineResultForDisplay(result);
        }
        
    };
     console.log("bottom of resolve Equation runs");
    
}


//CLEAR BUTTON CODE
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
    addMinusSignEventListener();

}

//BACKSPACE BUTTON CODE

let clearEntry = document.querySelector("#ce-button");

clearEntry.addEventListener("click", deleteCharacter);

function deleteCharacter(event) {
    let numberMinusLastCharacter;

    if(displayNumber.length === 9) {
        addNumbersEventListener();
    }
    
    let lastCharacter = displayNumber.charAt(displayNumber.length-1);
    numberMinusLastCharacter = displayNumber.replace(lastCharacter, "");
    displayNumber = numberMinusLastCharacter;
    displayText.textContent = numberMinusLastCharacter;

    if (displayNumber.length === 0) {
        delete numbers.count;
        removeDotEventListener();
        console.log("remove count var and dot event in delete char");
        displayNumber = "";
        return displayText.textContent = "0";
    }
}

//ADD DECIMAl PLACE TO NUMBERS CODE;

let dot = document.querySelector("#dot");

function addDotEventListener() {
    dot.addEventListener("click", addDecimalPlace, {once: true});
}

function removeDotEventListener() {
    dot.removeEventListener("click", addDecimalPlace);
}

function addDecimalPlace(event) {

    let dotSign = event.target.textContent;
    if (!displayNumber.includes(dotSign) && isValidNumber(displayNumber)) {
        displayNumber += dotSign;
        displayText.textContent = displayNumber;
        console.log("added dot event");
     }
}





//ADD MINUS SIGN TO START OF NUMBERS CODE;

let minusBtn = document.querySelector("#minus");



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

  



//gives zero with exponential numbers
//need to figure out how to convert to non exponential
//add whether to do it here or in operate;
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
            console.log("To 11 dps");
            refinedNumber = Number(stringedNumber).toFixed(11);
        } else {
            console.log("To 2 dps");
            refinedNumber = Number(stringedNumber).toFixed(2);
        };
    
    //remove zeros from end of number;
    // console.log(refinedNumber);
    refinedNumber = removeTrailingZeros(refinedNumber);
    // console.log(refinedNumber);
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
    // console.log(removedZeros);
    // console.log(beforeDecimalPlace);
    
    // attach two parts back together and return;
    return beforeDecimalPlace + removedZeros;
}


//used for checking absolute length of number
function removeAllNonNumbers(stringedNumber) {
    
    //removes all characters except numbers
   let cleanedNumber = stringedNumber.replace(/\D/g, "");
//    console.log(typeof cleanedNumber);
   return cleanedNumber;
}




    

//displays Nan or result dependant on num length;
function refineResultForDisplay(stringedNumber) {


    // if(stringedNumber.includes("e-") && getExponent(stringedNumber) < 300) {
    //     displayText.textContent = "0";
        
    //     return
    // }
    
    
    // remove excess dps from result;  
    let refinedNumber = removeExcessDecimalPlaces(stringedNumber);
    console.log(`refined number is ${refinedNumber}`);
    //removes all non numbers for results length check
    let cleanedNumber = removeAllNonNumbers(refinedNumber);
    
    //USE THIS IF TO CHECK ANY LENGTH
    // if (num.toFixed(0).length > 12)
    //If length above 12 convert to scientific notation and display;
    if (cleanedNumber.length > 12) {
        clearAll();
        console.log("is NaN");
        displayText.textContent = "NaN";
        // displayText.textContent = toScientificNotation(displayNumber, 7);
        
    } else {
        displayText.textContent = refinedNumber;
        // numberOne = displayNumber;
        console.log(`number one is ${numberOne}`);
        // console.log(numberTwo);
        console.log("less than 12");
        
    }
    return;
}  



//checks if number is in precise range returning true or false;
function isPrecise(stringedNumber) {
    console.log(typeof strindedNumber);
    
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



/*CURRENTLY UNUSED OR BROKEN CODE*/


//code for adding minus sign for next step;

     //if operator has value and displayNumber is minus
    //Would 2nd part of condition be better as .includes check?
    //haven't commited 3rd part of condition yet;

    // if (numberOne && operator && displayNumber === "-") {
    //     removeArithmeticOperatorsEventListener();
    //     console.log("remove maths ops");
    //     return;
    // }

    //code to make 2nd number negative
    // if (isValidNumber(numberOne) && 
    // operator && 
    // currentOperator === minusOperator && 
    // !isValidNumber(displayNumber)) {
    //     removeArithmeticOperatorsEventListener();
    //     return displayNumber = "-";
    // }
    
    //Adds minus event if operator has value;
    // if(operator && !isValidNumber(displayNumber)) {
    //     console.log("add minus in add maths op func");
    //     addMinusSignEventListener();
    //     return;
    // }   

//does 2nd part of condition do what i want?
// if (displayNumber.length === 0 && operator !== minusOperator && !displayNumber.includes("-")) {
//     alert("minus event code");
    
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