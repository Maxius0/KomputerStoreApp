import * as Bank from "./bank.js";

const selectElement = document.getElementById("laptops-select");
const nameElement = document.getElementById("laptop-name");
const featuresElement = document.getElementById("laptop-features");
const descriptionElement = document.getElementById("laptop-description");
const priceElement = document.getElementById("laptop-price");
const buyElement = document.getElementById("buy");

let laptops = [];

// Initializes "laptops" by fetching api data and adding event listeners.
function init() {
  fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then((response) => response.json())
    .then((data) => (laptops = data))
    .then((laptops) => addLaptopsToMenu(laptops))
    .then(selectElement.addEventListener("change", handleLaptopMenuChange));

  buyElement.addEventListener("click", handleBuy);
}

// Goes through every laptop and adds it to the selection menu
function addLaptopsToMenu(laptops) {
  laptops.forEach((x) => addLaptopToMenu(x));
  setDefaultValues(laptops);
}

// Adds a laptop to the selection menu
function addLaptopToMenu(laptop) {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  selectElement.appendChild(laptopElement);
}

// Takes the specs of a laptop and turns them into list elements.
function createSpecList(laptop) {
  laptop.specs.forEach((spec) => {
    let li = document.createElement("li");
    li.innerText = spec;
    featuresElement.appendChild(li);
  });
}

// Clears the spec list of items.
function clearSpecList() {
  while (featuresElement.firstChild) {
    featuresElement.removeChild(featuresElement.lastChild);
  }
}

// Sets all elements to their default values, i.e. the value of the first laptop in the menu.
function setDefaultValues(laptops) {
  const firstLaptop = laptops[0];
  nameElement.innerText = firstLaptop.title;
  descriptionElement.innerText = firstLaptop.description;
  priceElement.innerText = firstLaptop.price;
  createSpecList(firstLaptop);
}

// Changes elements to their appropriate values according to selected laptop.
// To be used with the laptop selection menu.
function handleLaptopMenuChange(event) {
  const selectedLaptop = laptops[event.target.selectedIndex];
  nameElement.innerText = selectedLaptop.title;
  descriptionElement.innerText = selectedLaptop.description;
  priceElement.innerText = selectedLaptop.price;
  clearSpecList();
  createSpecList(selectedLaptop);
}

// Checks if the user can afford the currently selected laptop.
// If so, buys it. Either way, displays an appropriate message.
// To be used with the "BUY NOW" button.
function handleBuy() {
  const price = Number(priceElement.innerText);
  if (price <= Bank.balance) {
    Bank.updateBalance(-price);
    alert("Congratulations! You bought " + nameElement.innerText);
  } else {
    alert("Sorry! You can't afford " + nameElement.innerText);
  }
}

export { init };
