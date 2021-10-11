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

function showResult() {
  if (!(bottomResultString == "") && !(topResultString == "")) {
    topResult.textContent = `${topResultString} ${operatorChosen} ${bottomResultString} =`;
    bottomResult.textContent = operate(
      operatorChosen,
      bottomResultString,
      topResultString
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
  return Number(num1) / Number(num2);
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return substract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
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

let numBtns = document.querySelectorAll(".num");
numBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    updateScreenBottom(e.target.dataset.number);
  });
});

let operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    updateScreenTop(e.target.dataset.operator);
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
