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

const roundOff = (num) => {
  let numOfIntegers = Math.max(0, num.toString().indexOf("."));
  let decimalPlace = Math.max(0, 9 - numOfIntegers);
  return Math.round(num * 10 ** decimalPlace) / 10 ** decimalPlace;
};

const operate = (num1, num2, operator) => {
  let result;
  switch (operator) {
    case "+":
      result = add(parseFloat(num1), parseFloat(num2));
      break;
    case "-":
      result = subtract(parseFloat(num1), parseFloat(num2));
      break;
    case "*":
      result = multiply(parseFloat(num1), parseFloat(num2));
      break;
    case "/":
      result = divide(parseFloat(num1), parseFloat(num2));
  }
  return result > 999999999 ? result.toExponential(0) : roundOff(result);
};

const updateDisplayValue = (val) => {
  if (
    displayValue === "0" ||
    previousKey === "operator" ||
    previousKey === "calculate"
  ) {
    displayValue = val.toString();
  } else if (displayValue.replace(".", "").length < 9) {
    displayValue += val;
  }
  display.textContent = displayValue;
};

const isOperator = (val) => {
  if (val === "/" || val === "*" || val === "+" || val === "-") {
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
    firstNumber !== null &&
    operator &&
    previousKey !== "operator" &&
    previousKey !== "calculate" &&
    previousKey !== "clear"
  ) {
    previousKey = "calculate";
    secondNumber = parseFloat(displayValue);
    if (secondNumber === 0 && operator === "/") {
      updateDisplayValue("I see you");
    } else {
      updateDisplayValue(operate(firstNumber, secondNumber, operator));
    }
    operator = null;
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
  if (displayValue === "0" || previousKey === "calculate") {
    displayValue = "0.";
  } else {
    displayValue += ".";
  }
  display.textContent = displayValue;
};

const handleBackspace = (str) => {
  if (previousKey !== "calculate" && previousKey !== "operator") {
    if (str.length === 1) {
      str = "0";
    } else {
      str = str.slice(0, -1);
    }
    displayValue = str;
    display.textContent = displayValue;
  }
};

buttons.addEventListener("click", (e) => {
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
  e.target.blur();
});

document.addEventListener("keydown", (e) => {
  if (isOperator(e.key)) {
    e.preventDefault();
    handleOperator(e.key);
  } else if (!isNaN(e.key) && e.key !== " ") {
    handleNumber(e.key);
  } else if (e.key === "Enter") {
    handleCalculation();
  } else if (e.key === "Backspace" && e.shiftKey === true) {
    handleClear();
  } else if (e.key === "Backspace") {
    handleBackspace(displayValue);
  } else if (e.key === ".") {
    handleDecimal();
  }
});
