import * as Bank from "./bank.js";

const workElement = document.getElementById("goto-work");
const bankElement = document.getElementById("bank-pay");
const repayElement = document.getElementById("repay-loan");
const payElement = document.getElementById("pay");

let pay = 0;

// Initializes "work" functionality by adding event listeners to associated buttons.
function init() {
  workElement.addEventListener("click", handleWork);
  bankElement.addEventListener("click", handleBank);
  repayElement.addEventListener("click", handleRepayLoan);
}

// Updates current pay and displays the updated pay.
// arg: amount to increase pay by.
function updatePay(increase) {
  pay += increase;
  payElement.innerText = pay;
}

// Increases pay by 100. To be used with "Work" button.
function handleWork() {
  updatePay(100);
}

// Banks the pay, subtracting 10% if an outstanding loan is present.
// To be used with "Bank" button.
function handleBank() {
  let netPay = pay;
  if (Bank.outstandingLoan > 0) {
    let loanPayment = Math.min(pay * 0.1, Bank.outstandingLoan);
    netPay = netPay - loanPayment;
    Bank.updateOutstandingLoan(-Math.min(pay * 0.1, Bank.outstandingLoan));
  }
  Bank.updateBalance(netPay);
  updatePay(-pay); // Resets pay to zero.
}

// Spends all of pay to reduce outstanding loan. Any remainder is banked.
function handleRepayLoan() {
  if (pay > Bank.outstandingLoan) {
    Bank.updateBalance(pay - Bank.outstandingLoan);
  }
  Bank.updateOutstandingLoan(-Math.min(pay, Bank.outstandingLoan));
  updatePay(-pay); // Resets pay to zero.
}

export { init, handleWork, handleBank, handleRepayLoan, repayElement };
