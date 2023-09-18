let firstNumber = null;
let secondNumber = null;
let operator = null;
let previousKey = null;
let displayValue = "0";

const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

display.textContent = displayValue;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (num1, num2, operator) => {
  console.log(`num1: ${num1} ${operator} num2: ${num2}`);
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
      result = divide(parseFloat(num1), parseFloat(num2));
  }
  return result;
};

const updateDisplayValue = (val) => {
  if (
    displayValue === "0" ||
    previousKey === "operator" ||
    previousKey === "calculate"
  ) {
    displayValue = val;
  } else if (displayValue.replace(".", "").length < 9) {
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

const handleClear = () => {
  displayValue = "0";
  display.textContent = displayValue;
  firstNumber = null;
  secondNumber = null;
  operator = null;
  previousKey = "clear";
};

const handleNumber = (val) => {
  updateDisplayValue(val);
  previousKey = "number";
};

const handleCalculation = () => {
  if (
    firstNumber &&
    operator &&
    previousKey !== "operator" &&
    previousKey !== "calculate"
  ) {
    previousKey = "calculate";
    secondNumber = parseFloat(displayValue);
    updateDisplayValue(operate(firstNumber, secondNumber, operator));
  }
};

const handleOperator = (opt) => {
  if (
    operator &&
    previousKey &&
    previousKey !== "operator" &&
    previousKey !== "calculate"
  ) {
    handleCalculation();
    firstNumber = parseFloat(displayValue);
    secondNumber = null;
  } else {
    firstNumber = parseFloat(displayValue);
  }
  previousKey = "operator";
  operator = opt;
};

const handleDecimal = () => {
  if (displayValue.includes(".") || displayValue.length >= 9) {
    return;
  }
  if (displayValue === "0") {
    displayValue = "0.";
  } else {
    displayValue += ".";
  }
  display.textContent = displayValue;
};

buttons.addEventListener("click", (e) => {
  let value;
  if (e.target.dataset.value) {
    handleNumber(e.target.dataset.value);
  } else if (e.target.dataset.action === "clear") {
    handleClear();
  } else if (e.target.dataset.action === "calculate") {
    handleCalculation();
  } else if (isOperator(e.target.dataset.action)) {
    handleOperator(e.target.dataset.action);
  } else if (e.target.dataset.action === "decimal") {
    handleDecimal();
  }
});
