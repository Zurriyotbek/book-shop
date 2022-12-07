export const createFormModal = () => {
  // fragment
  let fragment = document.createDocumentFragment();
  //   overlay
  let overlay = document.createElement("div");
  overlay.className = "form-overlay";
  overlay.innerHTML = `
    <button class="form-overlay__close-btn">Close</button>
    <div class="form-overlay__content">
    </div>
  `;

  //   Append child
  fragment.appendChild(overlay);
  document.querySelector(".app").appendChild(fragment);
};
