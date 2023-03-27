import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._popupInput = [...this._popupForm.querySelectorAll(".popup__input")];
    this._button = this._popupSelector.querySelector(".popup__submit");
  }

  _getInputValues() {
    this._formValues = {};

    this._popupInput.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setInputValues(data) {
    this._popupInput.forEach((input) => {
      input.value = data[input.name];
    });
  }

}
