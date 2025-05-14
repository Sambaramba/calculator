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
    
    //divided by zero code
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


//Numbers event function to them to display;
function addNumberToDisplay(event) {
    console.log(displayNumber);
    

    //this fixes issue after divide by zero
    //dont understand when displayNumber becomes undefined though
    if (displayNumber === undefined) {
        console.log("this aint no proper number");
        displayNumber = "";
    }
    

    let eventNum = event.target.textContent;

    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isValidNumber(numberOne) && operator && isValidNumber(displayNumber)) {
        addEqualsEventListener();
        // alert ("By jove this works!");
    }
    

    //Numbers count add/remove/increment code
    if (!numbers.count) {
        // displayNumber = "";
        numbers.count = 0
        addArithmeticOperatorsEventListener();
        console.log("maths operator added");
    };

    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return  displayText.textContent = displayNumber;
    }

    ++numbers.count;
    
    //adds number selected to displayNumber;
    displayNumber += eventNum;
    

    //checks if valid number and adds maths operators if so
    // is if statement neccessary?
    //find way to not add multiple times
    //is that neccessary;
    // if (isValidNumber(displayNumber)) {
    //     console.log("valid");
    //     addArithmeticOperatorsEventListener();
    // }


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

    
    operator = currentOperator;
    
    //removes equals event if no number 2
    if(isValidNumber(numberOne) && operator) {
        console.log("equals removed");
        removeEqualsEventListener();
    }
    
    addNumbersEventListener();
    
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
    addArithmeticOperatorsEventListener();
    
    numberOne = parseFloat(numberOne);
    displayNumber = parseFloat(displayNumber);
    numberTwo = parseFloat(numberTwo);
    // console.log(numberOne);
    // console.log(displayNumber);
    // console.log(numberTwo);

    
    //add current display number to 2nd number var
    if (isValidNumber(numberOne) && isValidNumber(displayNumber) && !isValidNumber(numberTwo)) {
        numberTwo = displayNumber;
    }

   console.log(operator);
    /*Could below code become a function so can use for maths operators*/
    //or could add code just after operate is called to a func and call
    //either could make code cleaner/more readable;

    //DOESN'T WORK WHEN DIVIDING -ve SN numbers BY LARGE NUMBERS
    //remove zeros doesn't work when got 0.00000
    //toFixed code line doesn't work with large  -ve SN nums
    //actually it might be working but might need to add toPrecsion instead;
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        displayNumber = operate(numberOne, operator, numberTwo);
        console.log(displayNumber);
    
        
        //removes all non numbers for results length check
        let cleanedNumber = cleanNumber(displayNumber);
        console.log(cleanedNumber.length);
        
        //If length above 9 convert to scientific notation and display;
        if (cleanedNumber.length > 12) {
            clearAll();
            console.log("is NaN");
            displayText.textContent = "NaN";
            // displayText.textContent = toScientificNotation(displayNumber, 7);
            
        } else {
            displayText.textContent = displayNumber;
            NumberOne = displayNumber;
            displayNumber = "";
            console.log("less than 9");
            
        }
        
        
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

//ADD DECIMAl PLACE TO NUMBERS CODE;

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



//ADD MINUS SIGN TO START OF NUMBERS CODE;

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

function refineNumber(stringedNumber) {

    let refinedNumber;
    if (stringedNumber.startsWith("0.") || 
        stringedNumber.startsWith("-0."))
        {   
            console.log("To 8 dps");
            refinedNumber = Number(stringedNumber).toFixed(8);
        } else {
            console.log("To 2 dps");
            refinedNumber = Number(stringedNumber).toFixed(2);
        };
    
    //remove zeros from end of number;
    return removeTrailingZeros(refinedNumber);
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

function cleanNumber(stringedNumber) {
    //is the if needed;
    // if (stringedNumber.includes("e")) {
    //     return stringedNumber;
    // }
   let cleanedNumber = stringedNumber.replace(/\D/g, "");
   console.log(typeof cleanedNumber);
   return cleanedNumber;
}

/*CURRENTLY UNUSED OR BROKEN CODE*/

//does this work with floating points?
// Number.MIN_SAFE_INTEGER;
// Number.MAX_SAFE_INTEGER;
// function checkIfSafeInteger(number) {
//     if (number < Number.MIN_SAFE_INTEGER ||
//         number > Number.MAX_SAFE_INTEGER) {
//         console.log("NaN");
//     }
//  }


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