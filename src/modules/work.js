import * as Bank from "./bank.js";

const payElement = document.getElementById("pay");
let pay = 0;

function updatePay(increase) {
  pay += increase;
  payElement.innerText = pay;
}

function handleWork() {
  updatePay(100);
}

function handleBank() {
  let netPay = pay;
  if (Bank.outstandingLoan > 0) {
    let loanPayment = Math.min(pay * 0.1, Bank.outstandingLoan);
    netPay = netPay - loanPayment;
    Bank.updateOutstandingLoan(-Math.min(pay * 0.1, Bank.outstandingLoan));
  }
  Bank.updateBalance(netPay);
  updatePay(-pay);
}

export { handleWork, handleBank };
