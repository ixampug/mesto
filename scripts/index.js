import { initialCards, config } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");

const popupEditOpenButton = document.querySelector(".profile__edit");
const popupAddOpenButton = document.querySelector(".profile__add");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const formEdit = document.querySelector("#formEdit");
const formAdd = document.querySelector(".popup__form_add");

const popupFullView = document.querySelector(".popup_fullview");
const popupPicture = popupFullView.querySelector(".popup__picture");
const popupSubtitle = popupFullView.querySelector(".popup__subtitle");

const nameInput = formEdit.querySelector(".popup__input_text_name");
const jobInput = formEdit.querySelector(".popup__input_text_occupation");

function handleOpenPopup(name, link) {
  popupPicture.src = link;
  popupPicture.alt = name;
  popupSubtitle.textContent = name;
  openPopup(popupFullView);
}

const elementsListElement = document.querySelector(".elements");

const inputCardName = formAdd.querySelector("#card");
const inputCardUrl = formAdd.querySelector("#url");

function createElement(item) {
  return new Card(item, "#card-template", handleOpenPopup).generateCard();
}

const validationEditForm = new FormValidator(config, formEdit);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(config, formAdd);
validationAddForm.enableValidation();

initialCards.forEach((cardData) => {
  const cardElement = createElement(cardData);
  elementsListElement.append(cardElement);
});

const submitEditHandlerForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopupEdit();
};

function submitAddHandlerForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputCardName.value,
    link: inputCardUrl.value,
  };

  const element = createElement(newCard);
  elementsListElement.prepend(element);
  validationAddForm.disableButton();
  closePopupAdd();
  formAdd.reset();
}

const openPopup = function (item) {
  item.classList.add("popup_opened");
  item.addEventListener("click", closePopupByClickOnOverlay);
  document.addEventListener("keyup", closePopupByKey);
};

const openPopupAdd = function () {
  openPopup(popupAdd);
};

const openPopupEdit = function () {
  const submitButton = formEdit.querySelector(".popup__submit");
  validationEditForm.enableButton();
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  openPopup(popupEdit);
};

const closePopup = function (item) {
  item.classList.remove("popup_opened");
  item.removeEventListener("click", closePopupByClickOnOverlay);
  document.removeEventListener("keyup", closePopupByKey);
};

const buttonCloseList = document.querySelectorAll(".popup__close");
buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

const closePopupEdit = function () {
  closePopup(popupEdit);
};

const closePopupAdd = function () {
  closePopup(popupAdd);
};

const closePopupByKey = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const closePopupByClickOnOverlay = function (e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  closePopup(e.currentTarget);
};

popupEditOpenButton.addEventListener("click", openPopupEdit);
popupAddOpenButton.addEventListener("click", openPopupAdd);

formEdit.addEventListener("submit", submitEditHandlerForm);
formAdd.addEventListener("submit", submitAddHandlerForm);
