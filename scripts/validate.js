

  const toggleButton = (inputs, button, config) => {
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
    const {formSelector, inputSelector, submitButtonSelector, ...restConfig} = config;
    
    const forms = [...document.querySelectorAll(formSelector)];
  
    forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);
  
    //   form.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     disableButton(button, config);
    //   });
        toggleButton(inputs, button, restConfig);
        inputs.forEach((input) => {
          input.addEventListener("input", () => {
            checkInputValidity(input, restConfig);
            toggleButton(inputs, button, restConfig);
  
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

  enableValidation(config);