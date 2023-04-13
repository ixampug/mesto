
export class FormValidator {
  constructor(config, formName) {
    this._inputSelector = config.inputSelector;
    this._form = document.forms[formName];
    this._submitButton = config.submitButton;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    
    this._buttonSubmit = this._form.querySelector(this._submitButton);
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
  
  enableValidation() {
    this._setEventListeners();
    this._toggleButton();
  }

  
 
 
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButton();
  }

  _enableButton() {
    console.log(this._submitButton);

    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    this._buttonSubmit.disabled = false;
  }

  _toggleButton() {
    if (this._isFormValid()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }


  _isFormValid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  

  _disableButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.disabled = true;
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

  
}
