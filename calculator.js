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

    
    let eventNum = event.target.textContent;
    
    //add equals listener when num1 and displayNums are finite nums and operator has truthy value
    if (isValidNumber(numberOne) && operator && isValidNumber(displayNumber)) {
        addEqualsEventListener();
        // alert ("By jove this works!");
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

    let currentOperator = event.target.textContent;
    
    //adds display num to num1 if no numerical value
    //this runs
    if (!isValidNumber(numberOne)) {
        numberOne = displayNumber;
        alert("numberOne has been changed");
    }
    
    //if num2 has number value make it undefined;
    //below if doesn't execute
    if(isValidNumber(numberTwo)) {
        alert("This if has been executed!");
        numberTwo = undefined;
        // alert(numberTwo);
    }
   
    
    
    

    //then add keep showing in display
    displayText.textContent = displayNumber;

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


//does equals work if operands have Scientific notation values?
/*equals btn doesn.t work when clicked again,
 to operate on result with another operator and new num2 value,
 so when trying to operate with new math operator and num*/

 /*when press equals after 1st equation and 
 operator pressed again displays 1*/

 /* need to readd operators listener after equation */


function resolveEquation(event) {
    

    alert("Number One's starting value is: " + numberOne);
    alert("Operators starting values is: " + operator);
    alert("Numbers two's starting value is: " + numberTwo);
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
    
    
    // //is num2 check correct?
    // if (isValidNumber(numberOne) && !operator) {
    //     alert ("Operator is " + numberTwo);
    //     displayText.textContent = numberOne;
    // }
    
    //do i parsefloat num2 in below condition?
    if (isValidNumber(numberOne) && operator && numberTwo == undefined) {
        numberTwo = parseFloat(displayNumber);
        alert("This bloody works!");
        
    }

    /*check repeat equations,
     if wanting to operate on result with diff num*/
    if (isValidNumber(numberOne) && !isValidNumber(numberTwo)) {
        numberTwo = displayNumber;
    }

    alert("number twos value is: " + numberTwo);

    //change numberTwo condition to displayNumber?
    if(isValidNumber(numberOne) && operator && isValidNumber(numberTwo)) {
        displayNumber = operate(numberOne, operator, numberTwo);
        // addArithmeticOperatorsEventListener();

        if (displayNumber.length >= 9) {
            displayNumber = toScientificNotation(displayNumber, 5);
            // console.log("This works!");
        }
        displayText.textContent = displayNumber;
        numberOne = displayNumber;
        displayNumber = "";
        
        alert(numberTwo);
        
        
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
