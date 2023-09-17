let firstNumber;
let secondNumber;
let operator;
let displayValue = "0";

const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

display.textContent = displayValue;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (num1, num2, operator) => {
  let result;
  switch (operator) {
    case "plus":
      result = add(parseFloat(num1), parseFloat(num2));
      break;
    case "minus":
      result = subtract(parseFloat(num1), parseFloat(num2));
      break;
    case "times":
      result = multiply(parseFloat(num1), parseFloat(num2));
      break;
    case "divide":
      result = multiple(parseFloat(num1), parseFloat(num2));
  }
  return result;
};

const updateDisplayValue = (val) => {
  if (displayValue === "0") {
    displayValue = val;
  } else {
    displayValue += val;
  }
  display.textContent = displayValue;
};

const isOperator = (val) => {
  if (
    val === "plus" ||
    val === "minus" ||
    val === "times" ||
    val === "divide"
  ) {
    return true;
  }
  return false;
};

buttons.addEventListener("click", (e) => {
  let value;
  if (e.target.dataset.value) {
    value = e.target.dataset.value;
    updateDisplayValue(value);
  } else if (e.target.dataset.action === "clear") {
    displayValue = "0";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    updateDisplayValue("0");
  } else if (e.target.dataset.action === "calculate") {
    secondNumber = parseFloat(displayValue);
    displayValue = "0";
    updateDisplayValue(operate(firstNumber, secondNumber, operator));
  } else if (isOperator(e.target.dataset.action)) {
    firstNumber = parseFloat(displayValue);
    operator = e.target.dataset.action;
    displayValue = "0";
  }
});
