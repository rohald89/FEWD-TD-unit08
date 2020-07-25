let modalOverlay = document.querySelector(".modal__overlay");
let closeModal = document.querySelector(".modal__close");

closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});
