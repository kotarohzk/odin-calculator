let firstNumber;
let secondNumber;
let operator;
let displayValue = 0;

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
      result = multiple(parseFloat(num1), parseFloat(num2));
  }
  return result;
};

const updateDisplayValue = (val) => {
  if (displayValue === 0) {
    displayValue = val;
  } else {
    displayValue += val;
  }
  display.textContent = displayValue;
};

buttons.addEventListener("click", (e) => {
  let value;
  if (e.target.dataset.value) {
    value = e.target.dataset.value;
    updateDisplayValue(value);
  }
});
