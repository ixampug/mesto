const popupEdit = document.querySelector('.popup_edit');
  const popupAdd = document.querySelector('.popup_add');
  const popupEditOpenButton = document.querySelector('.profile__edit');
  const popupAddOpenButton = document.querySelector('.profile__add');
  const profileName = document.querySelector('.profile__name');
  const profileOccupation = document.querySelector('.profile__occupation');
  const formEdit = document.querySelector('#formEdit');
  const formAdd = document.querySelector('.popup__form_add');
  const popupFullView = document.querySelector('.popup_fullview');
  const popupPicture = popupFullView.querySelector('.popup__picture');
  const popupSubtitle = popupFullView.querySelector('.popup__subtitle');
  const nameInput = formEdit.querySelector('.popup__input_text_name'); 
  const jobInput = formEdit.querySelector('.popup__input_text_occupation');
  const popupCloseEdit = popupEdit.querySelector('.popup__close_edit');
  const popupCloseAdd = popupAdd.querySelector('.popup__close_add');
  const popupCloseFullView = popupFullView.querySelector('.popup__close_fullview');
  const cardTemplate = document.querySelector("#card-template").content.querySelector('.element');
  const elementsListElement = document.querySelector('.elements');
  const inputCardName = formAdd.querySelector('#card');
  const inputCardUrl = formAdd.querySelector('#url');
  const submitButton = formEdit.querySelector('.popup__submit');
  
  
  
  function createElement(item) {
    
    const card = cardTemplate.cloneNode(true); 
    const cardText = card.querySelector('.element__name');
    const cardImage = card.querySelector('.element__photo');
   
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardText.textContent = item.name; 
  
    card.querySelector('.element__delete').addEventListener('click', function() {
      card.remove();
    });
  
    card.querySelector('.element__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like_active');
    });
  
    cardImage.addEventListener('click', function(data) {
      popupPicture.src = cardImage.src;
      popupPicture.alt = item.name;
      popupSubtitle.textContent = item.name;
      openPopup(popupFullView);
    });
   
    return card;
  };
  
  initialCards.forEach(function(item) {
    const element = createElement(item);
    elementsListElement.append(element);
  });
  
  function submitEditHandlerForm (evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopupEdit();
  };
  
  function submitAddHandlerForm (evt) {
    evt.preventDefault()
    const newCard = {

      name: inputCardName.value,
      link: inputCardUrl.value
    }
    const element = createElement(newCard);
    elementsListElement.prepend(element);
    closePopupAdd();
    formAdd.reset();
    submitButton.disabled = true;
  };
  
  const openPopup = function(item) {
    item.classList.add('popup_opened');
    item.addEventListener('click', closePopupByClickOnOverlay);
    document.addEventListener('keyup', closePopupByKey);
    // resetInputErrors(item, config);
  };
  
  const openPopupAdd = function() {
    openPopup(popupAdd);
  };

  const openPopupEdit = function() {
    const submitButton = formEdit.querySelector('.popup__submit');
    submitButton.classList.remove('popup__submit_disabled');
    submitButton.disabled = false;
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
    openPopup(popupEdit);
  };
  
 
  
  const closePopup = function(item) {
    item.classList.remove('popup_opened');
    item.removeEventListener('click', closePopupByClickOnOverlay);
    document.removeEventListener('keyup', closePopupByKey);
    
  };
  
  const buttonCloseList = document.querySelectorAll('.popup__close');
  buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup)); 
  });

  const closePopupFullView = function() {
    closePopup(popupFullView);
  };

  const closePopupEdit = function() {
    closePopup(popupEdit);
  };
  
  const closePopupAdd = function() {
    closePopup(popupAdd);
  };
  
 

  const closePopupByKey = (e) => {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
  }
  

const closePopupByClickOnOverlay = function(e) {
    if (e.target !== e.currentTarget) {
        return;
    } 
    closePopup(e.currentTarget);
};


  

  
  popupEditOpenButton.addEventListener('click', openPopupEdit);
  popupAddOpenButton.addEventListener('click', openPopupAdd);
  popupCloseEdit.addEventListener('click', closePopupEdit);

  popupCloseAdd.addEventListener('click', closePopupAdd);
  popupCloseFullView.addEventListener('click', closePopupFullView);
  
  formEdit.addEventListener('submit', submitEditHandlerForm);
  formAdd.addEventListener('submit', submitAddHandlerForm);

 
