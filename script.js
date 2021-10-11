let bottomResultString = "";
let topResultString = "";
let operatorChosen = "";

let bottomResult = document.querySelector(".result_bottom");
let topResult = document.querySelector(".result_top");

function updateScreenBottom(num) {
  bottomResultString += num;
  bottomResult.textContent = bottomResultString;
}

function updateScreenTop(operator) {
  topResultString = bottomResultString;
  bottomResultString = "";
  bottomResult.textContent = "";
  operatorChosen = operator;
  topResult.textContent = `${topResultString} ${operator}`;
}

function chooseOperator(operator) {
  if (operatorChosen == "" && !(bottomResultString == "")) {
    updateScreenTop(operator);
  } else if (
    !(operatorChosen == "") &&
    !(bottomResultString == "") &&
    !(topResultString == "")
  ) {
    if (bottomResultString == "0") {
      alert("You Can't divide by Zero!");
      bottomResultString = "";
    } else {
      bottomResultString = operate(
        operatorChosen,
        topResultString,
        bottomResultString
      );
      operatorChosen = operator;
      updateScreenTop(operatorChosen);
    }
  }
}

function showResult() {
  if (bottomResultString == "0") {
    alert("You Can't divide by Zero!");
    bottomResultString = "";
  } else if (!(bottomResultString == "") && !(topResultString == "")) {
    topResult.textContent = `${topResultString} ${operatorChosen} ${bottomResultString} =`;
    bottomResult.textContent = operate(
      operatorChosen,
      topResultString,
      bottomResultString
    );
  } else {
    console.error("something is missing");
  }
}

function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function substract(num1, num2) {
  return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

function divide(num1, num2) {
  if (num2 == "0") {
    alert("You Can't divide by Zero!");
  } else {
    return Number(num1) / Number(num2);
  }
}

function operate(operator, num1, num2) {
  let result = null;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = substract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }
  return Math.round(result * 1000) / 1000;
}

function clearAll() {
  bottomResult.textContent = "";
  topResult.textContent = "";
  bottomResultString = "";
  topResultString = "";
  operatorChosen = "";
}

function deleteNumber() {
  if (!(bottomResultString == "")) {
    bottomResultString = bottomResultString.substring(
      0,
      bottomResultString.length - 1
    );
    bottomResult.textContent = bottomResultString;
  }
}

function addDecimal() {
  if (!bottomResultString.includes(".")) {
    updateScreenBottom(".");
  }
}

let numBtns = document.querySelectorAll(".num");
numBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    updateScreenBottom(e.target.dataset.number);
  });
});

let operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    chooseOperator(e.target.dataset.operator);
  });
});

let equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", () => {
  showResult();
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  clearAll();
});

let deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
  deleteNumber();
});

let decimalBtn = document.querySelector(".decimal");
decimalBtn.addEventListener("click", () => {
  addDecimal();
});

window.addEventListener("keydown", handleKeyboardInput);
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) updateScreenBottom(e.key);
  if (e.key === ".") addDecimal();
  if (e.key === "=" || e.key === "Enter") showResult();
  if (e.key === "Backspace") deleteNumber();
}
