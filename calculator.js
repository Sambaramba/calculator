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

//change isFinite to !isNan if want infinity returned
function isNonZeroNumber(value) {
    const number = +value;
    return isFinite(number) && number !== 0;
}


function addToDisplay(event) {

    
    let eventNum = event.target.textContent;
    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isFinite(numberOne) && operator && isFinite(displayNumber)) {
        addEqualsEventListener();
    }
    
    //remove maths operators when num1 is legal num and operator is truthy
    if (isFinite(numberOne) && operator) {
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

    //delete count property until next num btn is pressed
    delete numbers.count;
    
    //is this what i want to do?
    if(Number.isFinite(numberTwo)) {
        numberTwo = undefined;
        alert(numberTwo);
    }
   
    let currentOperator = event.target.textContent;
    
    
    numberOne = displayNumber;

    //then add keep showing in display
    displayText.textContent = displayNumber;

    // displayText.textContent = `${numberOne} ${currentOperator}`;

    
    
    //remove click event for numbers less than 9 long
    removeNumbersEventListener();
    
    operator = currentOperator;
    // operator = convertedCurrentOperator;
    
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


//does equals work if operands have Scientific notation values?
/*equals btn doesn.t work when clicked again,
 to operate on result with another operator and new num2 value,
 so when trying to operate with new math operator and num*/

 /*when press equals after 1st equation and 
 operator pressed again displays 1*/

 /* need to readd operators listener after equation */


function resolveEquation(event) {
    

    delete numbers.count;
    /*-numberOne check with created non zero fun
    -if is a number then check if operator is a value
    -if have both have truthy values check if displaynum and numberOne are the same
    -if they are return num1 value?
     */
    
    //how to get number 2 to only be display num if undefined;
    //add if statement to check?
    //then if already pressed equals pressing again would calulate result with num2 again;


    //convert variables to number values;
    //is it better to parseFloat in operate func?
    /*error as only want to add display num to num2 
    if number buttons been pressed after num1 and operator have values*/
    numberOne = parseFloat(numberOne);
    displayNumber = parseFloat(displayNumber);
    
    
    //if num1 + num2 have no values return displayNumber value
    /*THIS DOESN'T WORK*/
    //NUMBERONE WANTS TO STAY UNDEFINED
    // if (!Number.isFinite(numberOne)) {
    //     alert(numberOne);
    //     numberOne = displayNumber;
    //     alert(numberOne);
    //     displayText.textContent = numberOne;
    //     // clearAll();
    //     // addArithmeticOperatorsEventListener();
    //     return
    // }
    //does this keep number one showing in display text
    //needs a return statement potentially
    //is num2 check correct?
    //add isFinite check
    if (numberOne && !numberTwo) {
        displayText.textContent = numberOne;
    }
    
    //do i parsefloat num2 in below condition?
    if (numberOne && operator && !numberTwo) {
        numberTwo = parseFloat(displayNumber);
    }

    //change numberTwo condition to displayNumber?
    if(numberOne && operator && numberTwo) {
        displayNumber = operate(numberOne, operator, numberTwo);
        // addArithmeticOperatorsEventListener();

        if (displayNumber.length >= 9) {
            displayNumber = toScientificNotation(displayNumber, 5);
            // console.log("This works!");
        }
        numberOne = displayNumber;
        displayNumber = "";
        displayText.textContent = numberOne;
        alert(numberTwo);
        
        // after operate complete add result to num1
        //when press equals again times result by num2 again
        //numberOne = undefined;
        // numberOne = displayNumber;
        
    };

    return 
}
//don't think it rounds number to decimal places
function toScientificNotation (number, dps) {
    return Number.parseFloat(number).toExponential(dps);
}

// function getRoundedNumber(number, decimalPlaces) {
//     return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
// }

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
    displayNumber = "";
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
    numbers.count = 0;
    removeNumbersEventListener();
    removeArithmeticOperatorsEventListener();
    displayText.textContent = displayNumber;
    addNumbersEventListener();
    addArithmeticOperatorsEventListener();
    removeEqualsEventListener();

}
