import './index.css';
import { initialCards, config } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js"; 
import { data } from 'autoprefixer';

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
  popupEdit.setInputValues(userInfo.getUserInfo());
  validationEditForm.enableButton();
  popupEdit.open();
 }

 function submitEditHandlerForm(inputsValues) {
  popupEdit.close();
  userInfo.setUserInfo(inputsValues);
 }

// function createElement(item) {
//   return new Card(item, "#card-template", handleCardClick).generateCard();
// }

function createElement(item) {
const card = new Card(item, "#card-template", handleCardClick);
const cardElement = card.generateCard();
return cardElement;
};

function renderCard(item) {
  const cardElement = createElement(item);
  section.addItem(cardElement);
}


const section = new Section(
  {
  renderer: (item) => {
    const cardElement = createElement(item);
    section.addItem(cardElement);
  }, containerSelector
}
);

// const section = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const cardElement = createElement(item);
//     section.addItem(cardElement);
//   }
// }, '.elements');

// section.renderItem();



// function renderCard(item) {
//   const cardElement = createElement(item);
//   containerSelector.append(cardElement);
// }

function handleAddOpenButtonClick() {
  validationAddForm.disableButton();
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

// const cardsSection = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       const cardElement = createElement(cardData);
//       return cardElement;
//     },
//   },
//   '.elements'
// );

// cardsSection.renderItem();


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
