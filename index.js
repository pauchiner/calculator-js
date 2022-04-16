//References
const numberButtons = Array.from(document.getElementsByClassName('button-number'));
const operatorButtons = Array.from(document.getElementsByClassName('button-operator'));
const equalsButton = document.getElementById('button-equals');
const clearButton = document.getElementById('button-clear');
const previousOperandTextElement = document.getElementById('previousValueText');
const currentOperandTextElement = document.getElementById('currentValueText');

//Variables
let operationHasOperator = false;

function clear() {
    previousOperandTextElement.innerText = "";
    currentOperandTextElement.innerText = "0";
    document.getElementById('button-clear-svg').style = 'fill: #888;';
}

function addNumber(element) {
    if(currentOperandTextElement.innerText == "0") {
        currentOperandTextElement.innerText = "";
        document.getElementById('button-clear-svg').style = 'fill: #ef260b;';
    }
    currentOperandTextElement.innerText += element.innerText;
    element.selected = false;
}

function addOperator(element) {
    if(currentOperandTextElement.innerText != "0" && previousValueText.innerText == '' && !operationHasOperator) {
        var operation = currentOperandTextElement.innerText;
        operation += " " + element.innerText + " ";
        operationHasOperator = true;
        previousValueText.innerText = operation;
        currentOperandTextElement.innerText = 0;
    }

    if(operationHasOperator && currentOperandTextElement.innerText != "0") {
        calculate(false);
        previousOperandTextElement.innerText += " " + element.innerText + " ";
        operationHasOperator = true;
    }

}

function calculate(equalsButton = true) {
    if(currentOperandTextElement.innerText != 0 && previousOperandTextElement.innerText != 0) {
        var operation = previousOperandTextElement.innerText + currentOperandTextElement.innerText;
        if(equalsButton) {
            currentOperandTextElement.innerText = eval(operation);
            previousOperandTextElement.innerText = "";
        }
        else {
            currentOperandTextElement.innerText = "0";
            previousOperandTextElement.innerText = eval(operation);
        }
        operationHasOperator = false;
    }
}

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        addOperator(button)
    });
})

numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        addNumber(button)
    });
})

equalsButton.addEventListener('click', function() {
    calculate();
})

clearButton.addEventListener('click', function() {
    clear();
})
