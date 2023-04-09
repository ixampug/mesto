import "./index.css";
import { apiSettings, config } from "../utils/constants.js";
import Api from "../components/Api";
import { Section } from "../components/Section.js";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupConfirm } from "../components/PopupConfirm";

// const popupEdit = document.querySelector(".popup_edit");
// const popupAdd = document.querySelector(".popup_add");

const popupEditOpenButton = document.querySelector(".profile__edit");
const popupAddOpenButton = document.querySelector(".profile__add");
const popupAvatarOpenButton = document.querySelector(".profile__change-photo");

function getCardElement(item) {
  const isLikedByOwner = item.likes.some(
    (like) => like._id === userInfo.getUserId()
  );
  const ownerCard = item.owner._id === userInfo.getUserId();
  const templateSelector = '#card-template';
  const card = new Card(
    item,
    isLikedByOwner,
    ownerCard,
    "#card-template",
    handleLikeCard,
    handleCardClick,
    handleDelete
  );
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard(item) {
  const cardElement = getCardElement(item);
  section.addItem(cardElement);
}

function handleAddOpenButtonClick() {
  addFormValidator.resetValidation();
  popupAddCard.open();
}

function handleEditOpenButtonClick() {
  popupEditProfile.setInputValues(userInfo.getUserInformation());
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function submitEditHandlerForm(inputsValues) {
  return api.patchInfo(inputsValues).then((user) => {
    userInfo.setUserInfo(user);
    userInfo.renderUserInfo();
  });
}

function handleCardClick(name, title) {
  popupWithImage.open(name, title);
}

function handleLikeCard(cardId, card) {
  if (!card.isCardLikeOwner) {
    api.putLike(cardId)
      .then(({ likes }) => {
        card.updateLikes(likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    api.deleteLike(cardId)
      .then(({ likes }) => {
        card.updateLikes(likes.length);
      })
      .catch((err) => console.log(err));
  }
}

function handleDelete(cardId, card) {
  popupConfirm.open({ cardId, card });
}

function submitAddHandlerForm(inputsValues) {
  const { title: name, link } = inputsValues;
  return api.postCard(name, link).then((item) => {
    renderCard(item);
  });
}

function handleConfirmation({ cardId, card }) {
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      popupConfirm.close();
    })
    .catch((err) => console.log(err));
}

function handleUpdateAvatar() {
  avatarFormValidator.resetValidation();
  popupUpdateAvatar.open();
}

function submitAvatarHandlerForm(inputsValues) {
  return api.patchAvatar(inputsValues).then((user) => {
    userInfo.setUserInfo(user);
    userInfo.renderUserAvatar();
  });
}

const api = new Api(apiSettings);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__occupation",
  ".profile__photo"
);

const section = new Section(renderCard, ".cards");

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.renderUserInfo();
    userInfo.renderUserAvatar();
    section.renderItem(initialCards.reverse());
  })
  .catch((err) => console.log(err));

const popupEditProfile = new PopupWithForm(
  "#popup-edit",
  submitEditHandlerForm
);
popupEditProfile.setEventListeners();
const editFormValidator = new FormValidator(config, "formEdit");
editFormValidator.enableValidation();


const popupAddCard = new PopupWithForm("#popup-add", submitAddHandlerForm);
popupAddCard.setEventListeners();
const addFormValidator = new FormValidator(config, "popupAddForm");
addFormValidator.enableValidation();



const popupConfirm = new PopupConfirm("#popup-confirm", handleConfirmation);
popupConfirm.setEventListeners();



const popupUpdateAvatar = new PopupWithForm(
  "#popup-update-avatar",
  submitAvatarHandlerForm
);
popupUpdateAvatar.setEventListeners();
const avatarFormValidator = new FormValidator(config, "popupUpdateAvatarForm");
avatarFormValidator.enableValidation();


const popupWithImage = new PopupWithImage(
  ".popup_fullview",
  "#popup-open-image",
  ".popup__picture",
  ".popup__subtitle"
);
popupWithImage.setEventListeners();


popupEditOpenButton.addEventListener("click", handleEditOpenButtonClick);
popupAddOpenButton.addEventListener("click", handleAddOpenButtonClick);
popupAvatarOpenButton.addEventListener("click", handleUpdateAvatar);
