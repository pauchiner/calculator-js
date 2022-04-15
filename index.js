//const operationButtons = document.querySelectorAll('[data-operation]');
//const equalsButton = document.querySelector('[data-equals]');
//const allClearButton = document.querySelector('[data-all-clear]');
//const previousOperandTextElement = document.getElementById('previousValueText');
//const currentOperandTextElement = document.getElementById('currentValueText');

window.onload = function main() {
    var numberButtons = Array.from(document.getElementsByClassName('button-number'));
    
    var previousOperandTextElement = document.getElementById('#previousValueText');
    var currentOperandTextElement = document.getElementById('currentValueText');

   numberButtons.forEach(button => {
       button.addEventListener('click', addNumber(button, currentOperandTextElement), false);
   })
   
   console.log(numberButtons);
}

numberButtons.forEach(button => {
    button.addEventListener('onclick', addNumber(button, currentOperandTextElement), false);
})

function addNumber(element, currentOperandTextElement) {
    currentOperandTextElement.innerText = element.innerText;
    console.log(element);
}