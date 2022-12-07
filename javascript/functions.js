import { formValues } from "./inputTypes.js";

export function findBook(array, id) {
  return array.find((item) => item.id === id);
}

export const addToFavourites = (id, fromArray, toArray) => {
  let found = fromArray.filter((item) => item);

  return found;
};

export function resetCartCount() {
  let cartCount = document.querySelector(".header__cart__count");
  cartCount.textContent = 0;
}

export function updateCartCount(array) {
  let cartCount = document.querySelector(".header__cart__count");
  cartCount.textContent = array.length;
}

export function removeBook(id, list) {
  list.forEach((el) => {
    if (el.id === id) {
      el.count = 0;
      list.splice(list.indexOf(el), 1);
      return;
    }
  });

  localStorage.setItem("cart", JSON.stringify(list));
}

export function updateTextContent(element, array) {
  let sum = 0;
  array.forEach((i) => {
    sum += i.count * i.price;
  });

  return (element.textContent = `Total: $${sum}`);
}

// Create input
export function createTextInput(inp) {
  // label
  let label = document.createElement("label");
  label.className = inp.classList;
  label.textContent = inp.title;
  // input
  let input = document.createElement("input");
  input.id = inp.id;
  input.type = inp.type;
  input.name = inp.name;
  input.placeholder = inp.placeholder;
  input.required = inp.isRequired;
  input.ariaLabel = inp.ariaLabel;
  input.minLength = inp.minLength;
  if (inp.type === "number") {
    input.min = 0;
  }
  if (inp.name === "house-number") {
    input.onkeypress = (e) => {
      return e.charCode >= 48;
    };
  }

  if (inp.name === "flat-number") {
    input.onkeypress = (e) => {
      return e.charCode >= 48;
    };
  }

  // Create error message
  let errorMsg = document.createElement("p");
  errorMsg.textContent = `Must be at least ${inp.minLength} characters!`;

  label.appendChild(input);
  label.appendChild(errorMsg);

  return label;
}

// Create date input
export function createDateInput(inp) {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();

  // label
  let label = document.createElement("label");
  label.className = inp.classList;
  label.textContent = inp.title;

  // Input
  let input = document.createElement("input");
  input.id = inp.id;
  input.type = inp.type;
  input.name = inp.name;
  input.required = inp.isRequired;
  input.ariaLabel = inp.ariaLabel;

  // Create error message
  let errorMsg = document.createElement("p");
  errorMsg.textContent = `Oh, sorry choose other date. Fastest is available on ${
    day + 2
  }/${month}/${year}!`;

  label.appendChild(input);
  label.appendChild(errorMsg);

  return label;
}

// Create payment input
export function createPaymentMethodInput() {
  let wrapper = document.createElement("div");
  wrapper.className = "payment__wrapper";

  wrapper.innerHTML = `
  <h4>Payment method:</h4>
  <div class="payment__options">
    <label class="payment__label">
      Card
      <input
        type="radio"
        class="payment__radio"
        required
        name="payment"
        value="card"
        checked
      />
    </label>
    <label class="payment__label">
      Cash
      <input type="radio" class="payment__radio" required name="payment" value="cash"/>
    </label>
  </div>
 `;

  return wrapper;
}

// create gift card input
export function createGiftOptions() {
  let wrapper = document.createElement("div");
  wrapper.className = "gift";

  wrapper.innerHTML = `
  <h4>Choose 2 gifts: (optional)</h4>
    <label>
      pack as a gift
      <input type="checkbox" name="gift" value="pack"/>
    </label>
    <label>
      add postcard
      <input type="checkbox" name="gift" value="postcard"/>
    </label>
    <label>
      provide 2% discount to the next time
      <input type="checkbox" name="gift" value="2% discount"/>
    </label>
    <label>
      branded pen or pencil
      <input type="checkbox" name="gift" value="pen or pencil"/>
    </label>
    <p class="gift__err-msg">"You can choose only 2 options!</p>
  `;

  return wrapper;
}

// Create complete button
export function createCompleteButton() {
  let btn = document.createElement("button");
  btn.className = "complete-btn";
  btn.disabled = true;
  btn.textContent = "Complete";

  return btn;
}

// Input validation function
// check valid inputs
export let isAllInputsValid = {
  name: false,
  surname: false,
  date: false,
  street: false,
  houseNumber: false,
  flatNumber: false,
  payment: true,
};
export function handleInputValidation(e, label, minChars, inputType) {
  let charCount = e.target.value.length;
  let input = label.querySelector("input");
  let errorMsg = label.querySelector("p");

  if (charCount < minChars) {
    input.classList.add("input--invalid");
    errorMsg.classList.add("input--alert");
    isAllInputsValid[inputType] = false;
  } else {
    input.classList.remove("input--invalid");
    errorMsg.classList.remove("input--alert");
    isAllInputsValid[inputType] = true;
    formValues[inputType] = e.target.value;
  }
  checkAll(isAllInputsValid);
}

// Handle date input
export function handleDateInput(e, label, type) {
  let value = e.target.value;
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  let userYear = Number(value.slice(0, 4));
  let userMonth = Number(value.slice(5, 7));
  let userDay = Number(value.slice(8, 10));

  let errorMsg = label.querySelector("p");

  if (userYear >= year && userMonth >= month && userDay >= day + 2) {
    errorMsg.classList.remove("input--alert");
    isAllInputsValid[type] = true;
    formValues.date = `${userDay}/${userMonth}/${userYear}`;
  } else {
    isAllInputsValid[type] = false;
    errorMsg.classList.add("input--alert");
  }
  checkAll(isAllInputsValid);
}

// Handle radio input
export function handlePayment(e) {
  checkAll(isAllInputsValid);
  formValues.payment = e.target.value;
}

// Check if all inputs are valid
export function checkAll(obj) {
  let cBtn = document.querySelector(".complete-btn");
  let count = 0;
  for (let key in obj) {
    if (obj[key] === false) {
      return false;
    } else {
      count += 1;
    }
  }

  if (count === 7) {
    cBtn.disabled = false;
    return true;
  } else {
    cBtn.disabled = true;
    return false;
  }
}

// handle form submit
// function handleSubmit() {}

//create overlay ocntent
export function createContentOverlay() {
  // overlay
  let overlay = document.querySelector(".form-overlay");
  overlay.classList.add("form-overlay--show");
  // content
  let content = overlay.querySelector(".form-overlay__content");
  content.innerHTML = `
  <p class="form-overlay__text">The delivery address is ${formValues?.street} street house ${formValues?.houseNumber} flat ${formValues?.flatNumber}. Customer ${formValues.name} ${formValues.surname}.</p>
  `;
}
