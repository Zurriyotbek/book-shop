"use strict";
export let header = document.getElementsByClassName("header")[0];

// Add container to header
let container = document.createElement("div");
container.className = "container header__container";
container.innerHTML = `
<a class="header__logo" href="#" > 
  <img src="./assets/images/logo.svg" alt="site logo">
</a>
<div class="header__cart__wrapper"> 
  <button class="header__favourites"> 
    <span class="header__favourites__count">0</span>
  </button>
  <button class="header__cart"> 
    <span class="header__cart__count">0</span>
  </button>
 </div>
`;

// Create fragment
let fragment = document.createDocumentFragment();
fragment.appendChild(container);
header.appendChild(fragment);
