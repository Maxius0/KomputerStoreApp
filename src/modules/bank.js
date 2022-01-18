import * as Work from "./work.js";

const loanElement = document.getElementById("loan");
const balanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstanding");

let balance = 1000;
let outstandingLoan = 0;

function init() {
  loanElement.addEventListener("click", handleLoan);
}

function updateBalance(increase) {
  balance += increase;
  balanceElement.innerText = balance;
}

function updateOutstandingLoan(increase) {
  outstandingLoan += increase;
  outstandingLoanElement.innerText += outstandingLoan;
  if (outstandingLoan > 0) {
    outstandingLoanElement.removeAttribute("hidden");
    Work.repayElement.removeAttribute("hidden");
  } else {
    outstandingLoanElement.setAttribute("hidden", "");
    Work.repayElement.setAttribute("hidden", "");
  }
}

function handleLoan() {
  if (outstandingLoan > 0) {
    alert("You already owe money!");
  } else {
    const loanAmount = Number(window.prompt("Enter loan amount:"));
    if (loanAmount > 0 && loanAmount <= balance * 2) {
      updateOutstandingLoan(loanAmount);
      updateBalance(loanAmount);
    } else {
      alert("Invalid amount!");
    }
  }
}

export {
  balance,
  outstandingLoan,
  init,
  handleLoan,
  updateBalance,
  updateOutstandingLoan,
};
