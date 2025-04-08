//FOUR BASIC MATHS OPERATIONS

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

let numberOne;
let operator;
let numberTwo;

//variables for each arithmetic buttons text unicode values
const plusOperator = "\u002B";
const minusOperator = "\u2212";
const multiplyOperator = "\u00D7";
const divideOperator = "\u00F7";


/*THINK OPERATOR PARAMETER HAS TO BE A FUNCTION*/


//minus button symbol need converting to /
// multiply button needs converting to *
//subtract needs converting
//plus works!!!!
// so dont need to convert to string like in console.log
function operate(numberOne, operator, numberTwo) {

     let value = "";
     

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
    return value;
}

/*DISPLAY TEXT SELECT AND UPDATE CODE*/

/*TODO LIST*/
/*when numbers get too big for display stop showing them*/

//Could play around with making this falsy to start
let displayNumber = "0";

let displayText = document.querySelector("#display-text");

displayText.textContent = displayNumber;


/*TODO: Remove event when numbers.count gets to 9*/


let numbers = document.querySelectorAll(".number");


//add tally for tally of numbers clicked
// numbers.count = 0;



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


function addToDisplay(event) {

    

    //removes listener when got 1st 2 operate values;
    if (numberOne && operator) {
        removeArithmeticOperatorsEventListener();
    }
  
    if (!numbers.count) {
        displayNumber = "0";
        numbers.count = 0
    };

    if (numbers.count >= 9) {
        removeNumbersEventListener();
        return  displayText.textContent;
    }

    ++numbers.count;
    let eventNum = event.target.textContent;
    
    if (displayNumber === "0") {
        displayNumber = eventNum;
        return  displayText.textContent = displayNumber;
    }

    displayNumber += eventNum;
    
    
    return displayText.textContent = displayNumber;
};

/*Code to add click event to operator buttons*/

let arithmeticOperators = document.querySelectorAll(".arithmetic-operator");
// arithmeticOperators.forEach((operator) => {c

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
// console.log(operator);

/* NEED TO CONVERT &MINUS,TIMES and DIVIDED TO -, * and / respectivly
this will allow operate to work for these
currently only plus works */

function addOperator(event) {
    
   
    let currentOperator = event.target.textContent;
    
    
    numberOne = displayNumber;

    //then add keep showing in display
    displayText.textContent = displayNumber;

    // displayText.textContent = `${numberOne} ${currentOperator}`;

    //delete count property until next num btn is pressed
    delete numbers.count;
    
    //remove click event for numbers less than 9 long
    removeNumbersEventListener();
    
    operator = currentOperator;
    // operator = convertedCurrentOperator;
    
    addNumbersEventListener();
    
    /*do i need to return this and could it be more useful*/
    return
     currentOperator;
};

const equals = document.querySelector("#equals");

equals.addEventListener("click", resolveEquation);

function resolveEquation(event) {
    

    //convert variables to number values;
    numberOne = parseFloat(numberOne);
    numberTwo = displayNumber;
    numberTwo = parseFloat(numberTwo);
    

    //if num1 + num2 have no values return displayNumber value
    if (!numberOne) {
        numberOne = displayNumber;
        displayText.textContent = numberOne;
        // clearAll();
        // addArithmeticOperatorsEventListener();
        return
    }
    //does this keep number one showing in display text
    //needs a return statement potentially
    if (numberOne && !numberTwo) {
        displayText.textContent = numberOne;
    }

    //operator value doen't work in operate
    //need to convert it to js readable value?
    if(numberOne && operator && numberTwo) {
        displayNumber = operate(numberOne, operator, numberTwo);
        console.log(displayNumber);
        displayText.textContent = displayNumber;
        // numberOne = displayNumber;
        alert(typeof operator);
    };
    

    // if (parseFloat(numberOne) && operator && ) {
    //     displayNumber = operate(numberOne, operator, numberTwo);
    //     // alert(displayNumber);
    //     return displayNumber;
    // };

    //adds displayNumber to num2, make sure it has a value;
    

    //alerts dont execute so no values?
    // alert(numberOne);
    // alert(operator);
    // alert(numberTwo);
    
    
    //add equation result to display- does it work?
    // displayText.textContent = operate(numberOne, operator, numberTwo);
    // alert(displayText.textContent = operate(numberOne, operator, numberTwo));

    return 
}

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
    displayNumber = "0";
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
    numbers.count = 0;
    removeNumbersEventListener();
    removeArithmeticOperatorsEventListener();
    displayText.textContent = displayNumber;
    addNumbersEventListener();
    addArithmeticOperatorsEventListener();

}
