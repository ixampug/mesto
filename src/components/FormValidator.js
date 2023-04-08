
export class FormValidator {
  constructor(config, formName) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = document.forms[formName];
  }

 
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButton();
  }

  _toggleButton() {
    if (this._isFormValid()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton();
      });
    });
  }

  _isFormValid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    const buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    buttonSubmit.classList.add(this._inactiveButtonClass);
    buttonSubmit.disabled = true;
  }

  _enableButton() {
    const buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    buttonSubmit.classList.remove(this._inactiveButtonClass);
    buttonSubmit.disabled = false;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButton();
  }

  
}
