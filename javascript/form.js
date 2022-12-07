import {
  createTextInput,
  createDateInput,
  createPaymentMethodInput,
  createGiftOptions,
  createCompleteButton,
} from "./functions.js";
import { inputTypes } from "./inputTypes.js";

export function createForm() {
  let appFragment = document.createDocumentFragment();
  let app = document.querySelector(".app");
  let appContainer = document.createElement("div");
  let form = document.createElement("form");
  let nameLabel = createTextInput(inputTypes.name);
  let surnameLabel = createTextInput(inputTypes.surname);
  let dateLabel = createDateInput(inputTypes.date);
  let streetLabel = createTextInput(inputTypes.street);
  let houseLabel = createTextInput(inputTypes.house);
  let flatLabel = createTextInput(inputTypes.flat);
  let paymentDiv = createPaymentMethodInput();
  let giftOptions = createGiftOptions();
  let completeBtn = createCompleteButton();

  // Class name
  appContainer.className = "container";
  form.className = "form";

  // Text content

  // Attribute

  // Append child
  form.appendChild(nameLabel);
  form.appendChild(surnameLabel);
  form.appendChild(dateLabel);
  form.appendChild(streetLabel);
  form.appendChild(houseLabel);
  form.appendChild(flatLabel);
  form.appendChild(paymentDiv);
  form.appendChild(giftOptions);
  form.appendChild(completeBtn);
  appContainer.appendChild(form);
  appFragment.append(appContainer);
  app.appendChild(appFragment);
}
