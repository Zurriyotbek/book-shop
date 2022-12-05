"use strict";

// Imports
import getData from "./fetchData.js";
import { findBook, addToFavourites } from "./functions.js";

// url data fetch
let url = "../data/data.json";

// Books data
let booksData = [];

//////////////////
// Get data
function setBooksArr(value) {
  booksData = [...value];
}

getData(url).then((data) => {
  if (data) {
    setBooksArr(data);
  }
});
////////////////////

// Cart
let cartList = JSON.parse(localStorage.getItem("cart")) || [];

// Favourite list
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// Selecting elements from html document
const body = document.querySelector("body");
let main = document.getElementById("main");
const favouriteCount = document.querySelector(".header__favourites__count");

// Create Catalog section

/////////////////////
// Create elements for catalog section
let catalogSection = document.createElement("section");
let catalogContainer = document.createElement("div");
let catalogAside = document.createElement("aside");
let catalogAsideHeading = document.createElement("h2");
let catalogList = document.createElement("ul");

// Text content
catalogAsideHeading.innerHTML = "Cart";

// Add class names for
catalogSection.className = "catalog";
catalogContainer.className = "container catalog__container";
catalogAside.className = "aside";
catalogList.className = "catalog__list";

// Append child
catalogAside.appendChild(catalogAsideHeading);
catalogContainer.appendChild(catalogAside);
catalogContainer.appendChild(catalogList);
catalogSection.appendChild(catalogContainer);
main.appendChild(catalogSection);
//////////////////////

/////////////////////
// Render Function
function renderBooks(booksArray, nodeElement) {
  nodeElement.innerHTML = null;
  booksArray.forEach((book) => {
    // create elements
    let itemFragment = document.createDocumentFragment();
    let item = document.createElement("li");
    let itemImgWrap = document.createElement("div");
    let itemImg = document.createElement("img");
    let itemBody = document.createElement("div");
    let itemBtnGroup = document.createElement("div");
    let itemFavBtn = document.createElement("button");
    let itemAddBtn = document.createElement("button");
    let itemBodyTitle = document.createElement("h3");
    let itemBodyAuthor = document.createElement("p");
    let itemBodyPrice = document.createElement("p");
    let itemBodyBtnMore = document.createElement("button");

    // add class names
    item.className = "item";
    itemImgWrap.className = "item__img";
    itemBody.className = "item__body";
    itemBtnGroup.className = "item__btn-group";
    itemFavBtn.className = `${
      book.isFavourite
        ? "item__btn-group__fav"
        : "item__btn-group__fav--default"
    }`;
    itemAddBtn.className = "item__btn-group__add";
    itemBodyTitle.className = "item__body__title";
    itemBodyAuthor.className = "item__body__author";
    itemBodyPrice.className = "item__body__price";
    itemBodyBtnMore.className = "item__body__more";

    // set text content
    itemBodyTitle.textContent = book?.title;
    itemBodyAuthor.textContent = `- ${book?.author}`;
    itemBodyPrice.textContent = `$${book?.price}`;
    itemBodyBtnMore.textContent = "Show more";

    // set attributes
    itemImg.src = `${book?.imageLink}`;
    itemImg.alt = "a book cover";
    itemBodyBtnMore.dataset.id = book?.id;

    // Append elements
    itemImgWrap.appendChild(itemImg);
    itemBtnGroup.appendChild(itemFavBtn);
    itemBtnGroup.appendChild(itemAddBtn);
    itemBody.appendChild(itemBtnGroup);
    itemBody.appendChild(itemBodyTitle);
    itemBody.appendChild(itemBodyAuthor);
    itemBody.appendChild(itemBodyPrice);
    itemBody.appendChild(itemBodyBtnMore);

    ////
    item.appendChild(itemImgWrap);
    item.appendChild(itemBody);

    /////
    itemFragment.appendChild(item);
    nodeElement.appendChild(itemFragment);

    // Add event listener to more btn
    itemBodyBtnMore.addEventListener("click", handlePopUpOpen);

    // Add event listener to favourite btn
    itemFavBtn.addEventListener("click", (e) => {
      let arr = booksData.map((el) => {
        if (el.id === book.id) {
          el.isFavourite = !el.isFavourite;
          el.isFavourite
            ? itemFavBtn.classList.add("hello")
            : itemFavBtn.classList.remove("hello");

          if (!favourites.includes(el)) {
            favourites.unshift(el);
          } else {
            favourites.splice(favourites.indexOf(el), 1);
          }
          return el;
        } else {
          return el;
        }
      });

      favouriteCount.textContent = favourites.length;

      setBooksArr(arr);

      renderBooks(arr, catalogList);
    });

    // Add event listener to add cart button
    itemAddBtn.addEventListener("click", (e) => {
      return addToCart(book.id);
    });
  });
}
////////////////////

////////////////////
setTimeout(() => {
  renderBooks(booksData, catalogList);
}, 1000);
////////////////////

/////////////////////
/////// Modal //////

// create element
const overlay = document.createElement("div");
const modal = document.createElement("div");
const modalCloseBtn = document.createElement("button");
const modalContent = document.createElement("div");

// // innerHtml of elements

// class names
overlay.className = "overlay overlay--hidden";
modal.className = "modal";
modalCloseBtn.className = "modal__close-btn";
modalContent.className = "modal__content";

// append element
modal.appendChild(modalCloseBtn);
modal.appendChild(modalContent);
overlay.appendChild(modal);
main.appendChild(overlay);

// modal functions
function handlePopUpOpen(e) {
  overlay.classList.remove("overlay--hidden");
  body.classList.add("noscroll");

  const btnId = Number(e.target.dataset.id);

  let foundBook = findBook(booksData, btnId);
  modalContent.innerHTML = `
  <div class="modal__left">
    <img src="${foundBook?.imageLink}" alt="a book cover">
  </div>
  <div class="modal__right">
    <h4 class="modal__right__author">${foundBook?.author}: 
    <span class="modal__right__title">${foundBook?.title}</span>
    </h4>
    <p class="modal__right__price">Price: $${foundBook?.price}</p>
    <p class="modal__right__desc"><strong>Description:</strong> ${foundBook?.description}</p>

    <div></div>
  </div>
`;
}

function handlePopUpClose() {
  overlay.classList.add("overlay--hidden");
  body.classList.remove("noscroll");
}

modalCloseBtn.addEventListener("click", handlePopUpClose);

document.addEventListener("click", (e) => {
  let isOverlay = e.target.classList.contains("overlay");

  if (isOverlay) {
    handlePopUpClose();
  }
});
///////////////////

//////////////////
// Add to favourites

/////////////////////////////
///////// Cart /////////////

// Create new element
let cartItemsWrapper = document.createElement("div");
// add class
cartItemsWrapper.className = "aside__wrap";
// append element
catalogAside.appendChild(cartItemsWrapper);

// render items function
function renderCartItems(array, nodeElement) {
  nodeElement.innerHTML = null;
  array.forEach((item) => {
    let bookInfo = document.createElement("div");
    bookInfo.className = "aside__item";
    bookInfo.innerHTML = `
      <h4>${item.title}</h4>
      <div class="aside__item__bottom">
        <p>$${item.price}</p>
        <div class="aside__item__btn-wrap">
          <button class="btn--minus">-</button>
          <button class="btn--plus">+</button>
        </div>
        <p>${item.count}</p>
      </div>
      `;
    nodeElement.appendChild(bookInfo);
  });
}

//////////////////
// Add to cart
function addToCart(id) {
  if (cartList.some((i) => i.id === id)) {
    cartList.forEach((item) => {
      if (item.id === id) {
        item.count += 1;
      }
    });
    return;
  } else {
    let found = booksData.filter((el) => {
      if (el.id === id) {
        return el;
      }
    })[0];

    found = { ...found, count: 1 };
    cartList.push(found);
  }

  let cartCount = document.querySelector(".header__cart__count");
  cartCount.textContent = cartList.length;

  renderCartItems(cartList, cartItemsWrapper);
}
