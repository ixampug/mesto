
export class FormValidator {
  constructor({
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass,
    inputErrorClass,
    formName
  }) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._errorClass = errorClass;
    this._inputErrorClass = inputErrorClass;
    this._form = document.forms[formName];
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButton() {
    if (this._isFormValid()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.disableButton();
  }

  _isFormValid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._setEventListeners();
    
  }
}