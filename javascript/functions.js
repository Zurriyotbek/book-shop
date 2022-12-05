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
