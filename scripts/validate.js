// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'
  };

  const toggleButtonState = (inputs, button, config) => {
    const isFormValid = inputs.every((input) => input.validity.valid);
   
         if (isFormValid) {
             // раздизэйбл
           enableButton(button, config);
         } else {
             // дизэйбл
           disableButton(button, config);
         };
   }
   

  const enableValidation = (config) => {
    const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, ...restConfig} = config;
    const forms = [...document.querySelectorAll(config.formSelector)];
  
    forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        disableButton(button, config);
      });
  
        inputs.forEach((input) => {
          input.addEventListener("input", () => {
            checkInputValidity(input, restConfig);
            toggleButtonState(inputs, button, config);
  
        });
    });
  });
  }

  const showInputError = (error, input, config) => {
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }


  const hideInputError = (error, input, config) => {
    error.textContent = "";
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  }
  
  const disableButton = (button, config) => {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
  
  const enableButton = (button, config) => {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
  
  const checkInputValidity = (input, config) => {
    const error = document.querySelector(`#${input.id}-error`);
  // проверить валидность
    if (input.validity.valid) {
        // убрать ошибку
      hideInputError(error, input, config);
    } else {
        //показать ошибку
      showInputError(error, input, config);
    };
  };
  
  
 
  

//   const resetInputErrors = (form, config) => {
//     const inputs = [...form.querySelectorAll(config.inputSelector)];
    
//     inputs.forEach((input) => {
//       const error = document.querySelector(`#${input.id}-error`);
//       hideInputError(error, input, config);
//     });
//   }
  

  enableValidation(config);