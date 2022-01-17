const balanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstanding");
let balance = 1000;
let outstandingLoan = 0;

function updateBalance(increase) {
  balance += increase;
  balanceElement.innerText = balance;
}

function updateOutstandingLoan(increase) {
  outstandingLoan += increase;
  outstandingLoanElement.innerText = "Outstanding loan: " + outstandingLoan;
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
  handleLoan,
  updateBalance,
  updateOutstandingLoan,
};
