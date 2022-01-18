import * as Bank from "./modules/bank.js";
import * as Work from "./modules/work.js";

const loanElement = document.getElementById("loan");
const workElement = document.getElementById("goto-work");
const bankElement = document.getElementById("bank-pay");

loanElement.addEventListener("click", Bank.handleLoan);
workElement.addEventListener("click", Work.handleWork);
bankElement.addEventListener("click", Work.handleBank);
