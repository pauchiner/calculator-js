//Calculator Js - Version 1.1 - Pau García Chiner.
//Last Update: 27-03-22.

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperand = previousOperandText;
    this.currentOperand = currentOperandText;
    this.operationHasOperator = false;
  }

  clear() {
    if (
      this.currentOperand.innerText != "0" ||
      this.previousOperand.innerText != ""
    ) {
      //Show empty trash animation.
      var svg = document.getElementById("button-clear-svg").style;
      svg.animation = "empty-trash-animation 0.3s";
      svg.animationFillMode = "forwards";
      //Show the previousOperand animation.
      this.previousOperand.style.animation =
        "hide-previous-value-animation 0.4s cubic-bezier(0.4, 1, 1, 1)";
      this.previousOperand.style.animationFillMode = "forwards";
      setTimeout(() => {
        this.previousOperand.innerText = "";
      }, 200);
      //Set operator state.
      this.currentOperand.innerText = "0";
      this.operationHasOperator = false;
    }
  }

  addNumber(element) {
    if (this.currentOperand.innerText == "0") {
      //Clear '0' to add new numbers.
      this.currentOperand.innerText = "";
      //Show trash animation.
      var svg = document.getElementById("button-clear-svg").style;
      svg.animation = "trash-animation 0.3s";
      svg.animationFillMode = "forwards";
    }
    //Check if the output can show properly the numbers.
    if (this.currentOperand.innerText.length < 8)
      this.currentOperand.innerText += element.innerText;
  }

  addOperator(element) {
    //Get the operator from the buttons
    var valueOperator = element.innerText;
    //Check if the user try to divide or multiply.
    if (valueOperator == "%") valueOperator = "/";
    if (valueOperator == "x") valueOperator = "*";

    //add single operator.
    if (
      this.currentOperand.innerText != "0" &&
      this.previousOperand.innerText == "" &&
      !this.operationHasOperator
    ) {
      //Calculate the operation.
      var operation = this.currentOperand.innerText + " " + valueOperator + " ";
      //Show the previousOperand animation.
      this.previousOperand.style.animation =
        "show-previous-value-animation 0.4s cubic-bezier(0.4, 1, 1, 1)";
      this.previousOperand.style.animationFillMode = "forwards";
      //Display the result.
      this.previousOperand.innerText = operation;
      //Set operator state.
      this.operationHasOperator = true;
      this.currentOperand.innerText = 0;
    }

    //Add multiple operators.
    if (this.operationHasOperator && this.currentOperand.innerText != "0") {
      this.calculate(false);
      this.previousOperand.innerText += " " + valueOperator + " ";
      this.operationHasOperator = true;
    }
  }

  calculate(equalsButton = true) {
    if (
      this.currentOperand.innerText != "0" &&
      this.previousOperand.innerText != ""
    ) {
      //Sanitize the operation.
      var operation = (
        this.previousOperand.innerText + this.currentOperand.innerText
      ).replace(/[^-()\d/*+.]/g, "");
      //Calculate the operation.
      var result = eval(operation).toString().substr(0, 8);
      //Check if the user wants to continue the operation.
      if (equalsButton) {
        //Show the result.
        this.currentOperand.innerText = result;
        //Show the previousOperand animation.
        this.previousOperand.style.animation =
          "hide-previous-value-animation 0.4s cubic-bezier(0.4, 1, 1, 1)";
        this.previousOperand.style.animationFillMode = "forwards";
        setTimeout(() => {
          this.previousOperand.innerText = "";
        }, 200);
      } else {
        //Continue operation.
        this.currentOperand.innerText = "0";
        this.previousOperand.innerText = result;
      }
      //Change operator state.
      this.operationHasOperator = false;
    }
  }
}

/**
 * A list with -, +, *, / buttons of the document
 * @type {Array<HTMLElement>}
 */

const operatorButtons = Array.from(
  document.getElementsByClassName("button-operator")
);
/** A list with 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "." buttons of the document
 * @type {Array<HTMLElement>}
 */

const numberButtons = Array.from(
  document.getElementsByClassName("button-number")
);
/** The previous operation text
 * @type {HTMLElement}
 */

const previousOperandText = document.getElementById("previousValueText");
/** The current operation text
 * @type {HTMLElement}
 */

const currentOperandText = document.getElementById("currentValueText");
/** The equals button
 * @type {HTMLElement}
 */

const equalsButton = document.getElementById("button-equals");
/** The clear button
 * @type {HTMLElement}
 */
const clearButton = document.getElementById("button-clear");

/** The main class:
 * - This contain al the functions to work
 * @type {Calculator}
 */
const calculator = new Calculator(previousOperandText, currentOperandText);

//Add functions to the buttons of the document.
operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.addOperator(button);
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.addNumber(button);
  });
});

equalsButton.addEventListener("click", function () {
  calculator.calculate();
});

clearButton.addEventListener("click", function () {
  calculator.clear();
});
