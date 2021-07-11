import galleryItems from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
};

let activeIndex = 0;

const galleryMarkup = galleryItems.map(({ original, preview, description }) => {
  return `
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </li>
    `;
});

const keyboardManipulation = (e) => {
  if (e.key === "Escape") {
    closeModal(e);
  }
  if (e.key === "ArrowRight" && galleryItems.length - 1 > activeIndex) {
    activeIndex += 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
  }
  if (e.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
  }
};

const openModal = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  galleryMarkup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
    }
  });
  refs.modal.classList.add("is-open");
  refs.modalImg.src = e.target.dataset.source;
  window.addEventListener("keydown", keyboardManipulation);
};

const closeModal = (e) => {
  if (e.target.nodeName === "IMG") {
    return;
  }
  refs.modal.classList.remove("is-open");
  window.removeEventListener("keydown", keyboardManipulation);
};

refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup.join(""));
refs.gallery.addEventListener("click", openModal);
refs.modal.addEventListener("click", closeModal);


