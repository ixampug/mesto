const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');




const formElement = document.querySelector('.popup__form');  

const nameInput = formElement.querySelector('.popup__input_text_name');  
const jobInput = formElement.querySelector('.popup__input_text_occupation'); 


const openPopup = function () {
   popupElement.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function(event) {
    
    if (event.target !== event.currentTarget) {
        return;
    } 
    closePopup();
}





// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value; 
    profileOccupation.textContent = jobInput.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
