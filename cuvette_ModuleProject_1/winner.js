// DOM
const btnRules = document.querySelector("#rules-show");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  console.log("HII");
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
