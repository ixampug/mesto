import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupInput = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popupForm.querySelector(".popup__submit");
  }

  _getInputValues() {
    const formValues = {};
    this._popupInput.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderWaiting(true);
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch(err =>console.log(err))
        .finally(() => this._renderWaiting(false));
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setInputValues(info) {
    this._popupInput.forEach((input) => {
      input.value = info[input.name];
    });
  }

  _renderWaiting(isWaiting) {
    if (isWaiting) {
      this._submitButton.textContent += "...";
    } else {
      this._submitButton.textContent = this._submitButton.textContent.replace("...", "");
    }
  }
}
