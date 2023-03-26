import { initialCards, config } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js"; 

// const popupEdit = document.querySelector(".popup_edit");
// const popupAdd = document.querySelector(".popup_add");

const popupEditOpenButton = document.querySelector(".profile__edit");
const popupAddOpenButton = document.querySelector(".profile__add");
const formEdit = document.querySelector("#formEdit");
const formAdd = document.querySelector(".popup__form_add");

const nameInput = formEdit.querySelector(".popup__input_text_name");
const jobInput = formEdit.querySelector(".popup__input_text_occupation");

const containerSelector = document.querySelector(".elements");

// const inputCardName = formAdd.querySelector("#card");
// const inputCardUrl = formAdd.querySelector("#url");



const validationEditForm = new FormValidator(config, formEdit);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(config, formAdd);
validationAddForm.enableValidation();


// const profileName = document.querySelector(".profile__name");
// const profileOccupation = document.querySelector(".profile__occupation");


// const popupFullView = document.querySelector(".popup_fullview");
// const popupPicture = popupFullView.querySelector(".popup__picture");
// const popupSubtitle = popupFullView.querySelector(".popup__subtitle");


const popupWithImage = new PopupWithImage('.popup_fullview');
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

function handleEditOpenButtonClick() {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  validationEditForm.enableValidation();
  
  popupEdit.open();
 }

 function submitEditHandlerForm(inputsValues) {
  popupEdit.close();
  userInfo.setUserInfo(inputsValues);
 }

function createElement(item) {
  return new Card(item, "#card-template", handleCardClick).generateCard();
}

function renderCard(item) {
  const cardElement = createElement(item);
  containerSelector.append(cardElement);
}

function handleAddOpenButtonClick() {
  validationAddForm.enableValidation();
  popupAdd.open();
}

function submitAddHandlerForm(inputsValues) {
  const {title: name, link} = inputsValues;
  renderCard({ name, link });
  popupAdd.close();
}

const popupAdd = new PopupWithForm('.popup_add', submitAddHandlerForm);
popupAdd.setEventListeners();

initialCards.forEach((cardData) => {
  const cardElement = createElement(cardData);
  containerSelector.append(cardElement);
});



// const submitEditHandlerForm = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileOccupation.textContent = jobInput.value;
//   closePopupEdit();
// };

// function submitAddHandlerForm(evt) {
//   evt.preventDefault();
//   const newCard = {
//     name: inputCardName.value,
//     link: inputCardUrl.value,
//   };

//   const element = createElement(newCard);
//   containerSelector.prepend(element);
//   validationAddForm.disableButton();
//   closePopupAdd();
//   formAdd.reset();
// }

const popupEdit = new PopupWithForm('.popup_edit', submitEditHandlerForm);
popupEdit.setEventListeners();

// const popupAdd = new PopupWithForm('.popup_add', submitAddHandlerForm);
// popupAdd.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__occupation'
});



// popupEditOpenButton.addEventListener('click', () => {
//   validationEditForm.enableButton();
//   const userData = userInfo.getUserInfo()
//   popupEdit.set

// })


// const openPopup = function (item) {
//   item.classList.add("popup_opened");
//   item.addEventListener("click", closePopupByClickOnOverlay);
//   document.addEventListener("keyup", closePopupByKey);
// };

// const openPopupAdd = function () {
//   openPopup(popupAdd);
// };

// const openPopupEdit = function () {
//   const submitButton = formEdit.querySelector(".popup__submit");
//   validationEditForm.enableButton();
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileOccupation.textContent;
//   openPopup(popupEdit);
// };


popupAddOpenButton.addEventListener('click', handleAddOpenButtonClick);
popupEditOpenButton.addEventListener("click", handleEditOpenButtonClick);
// popupAddOpenButton.addEventListener("click", openPopupAdd);

// formEdit.addEventListener("submit", submitEditHandlerForm);
// formAdd.addEventListener("submit", submitAddHandlerForm);
