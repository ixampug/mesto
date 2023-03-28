export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(error, input) {
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(error, input) {
    error.textContent = "";
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
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
    const isFormValid = this._inputs.every((input) => input.validity.valid);
    if (isFormValid) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  _checkInputValidity(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(error, input);
    } else {
      this._showInputError(error, input);
    }
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
