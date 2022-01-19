import * as Work from "./work.js";

const loanElement = document.getElementById("loan");
const balanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstanding");

let balance = 0;
let outstandingLoan = 0;

// Initializes "bank" functionality by adding event listeners to associated buttons.
function init() {
  loanElement.addEventListener("click", handleLoan);
}

// Updates balance and displays the updated balance.
// arg: amount to increase balance by.
function updateBalance(increase) {
  balance += increase;
  balanceElement.innerText = balance;
}

// Updates outstanding loan and displays the updated outstanding loan.
// arg: amount to increase outstanding loan by.
function updateOutstandingLoan(increase) {
  outstandingLoan += increase;
  outstandingLoanElement.innerText = "Outstanding loan: " + outstandingLoan;
  if (outstandingLoan > 0) {
    outstandingLoanElement.removeAttribute("hidden");
    Work.repayElement.removeAttribute("hidden");
  } else {
    outstandingLoanElement.setAttribute("hidden", "");
    Work.repayElement.setAttribute("hidden", "");
  }
}

// Prompts user for a loan amount and grants the loan if the amount is valid.
function handleLoan() {
  if (outstandingLoan > 0) {
    alert("You already owe money!");
  } else {
    const loanAmount = Number(window.prompt("Enter loan amount:"));
    if (loanAmount > 0) {
      if (loanAmount <= balance * 2) {
        updateOutstandingLoan(loanAmount);
        updateBalance(loanAmount);
      } else {
        alert("You may not loan more than double your bank balance.");
      }
    } else {
      alert("Invalid input!");
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
