"use strict";
//////////
import { createForm } from "./form.js";
import { createFormModal } from "./formModal.js";
import {
  handleInputValidation,
  isAllInputsValid,
  handleDateInput,
  handlePayment,
  checkAll,
  createContentOverlay,
} from "./functions.js";
import { formValues } from "./inputTypes.js";

createForm();
createFormModal();

// Name input
let nameLabel = document.querySelector(".name__label");
let nameInput = nameLabel.querySelector("input");
nameInput.addEventListener("blur", (e) => {
  return handleInputValidation(e, nameLabel, 4, "name");
});

// Surname input
let surnameInput = document.getElementById("surname__input");
let surnameLabel = document.querySelector(".surname__label");
surnameInput.addEventListener("blur", (e) => {
  return handleInputValidation(e, surnameLabel, 5, "surname");
});

// Street label
let streetLabel = document.querySelector(".street__label");
let streetInput = streetLabel.querySelector("input");
streetInput.addEventListener("blur", (e) => {
  return handleInputValidation(e, streetLabel, 5, "street");
});

// House number
let houseLabel = document.querySelector(".house-number__label");
let houseInput = houseLabel.querySelector("input");
houseInput.addEventListener("blur", (e) => {
  return handleInputValidation(e, houseLabel, 1, "houseNumber");
});

// Flat label
let flatLabel = document.querySelector(".flat-number__label");
let flatInput = flatLabel.querySelector("input");
flatInput.addEventListener("blur", (e) => {
  return handleInputValidation(e, flatLabel, 1, "flatNumber");
});

// date label
let dateLabel = document.querySelector(".date__label");
let dateInput = dateLabel.querySelector("input");
dateInput.addEventListener("input", (e) => {
  return handleDateInput(e, dateLabel, "date");
});

// payment method
let paymentWrap = document.querySelector(".payment__wrapper");
let paymentOptions = paymentWrap.querySelector(".payment__options");
for (let i = 0; i < paymentOptions.children.length; i++) {
  paymentOptions.children[i].addEventListener("change", (e) => {
    return handlePayment(e);
  });
}

// Gift options
let gift = document.querySelector(".gift");
let checkboxes = gift.querySelectorAll("input");

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", () => {
    if (checkboxes[i].checked) {
      if (formValues.gift.length < 2) {
        formValues.gift.push(checkboxes[i].value);
      } else {
        gift.querySelector("p").classList.add("input--alert");
        checkboxes[i].checked = false;
      }
    } else {
      gift.querySelector("p").classList.remove("input--alert");
      let val = checkboxes[i].value;
      formValues.gift.splice(formValues.gift.indexOf(val), 1);
    }
  });
}

/////////////////
document.addEventListener("change", () => {
  return checkAll(isAllInputsValid);
});

///////////////////
let form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createContentOverlay();
});

let closeBtn = document.querySelector(".form-overlay__close-btn");
closeBtn.addEventListener("click", () => {
  let overlay = document.querySelector(".form-overlay");
  overlay.classList.remove("form-overlay--show");
});
