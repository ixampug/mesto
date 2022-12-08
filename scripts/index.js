const popupEdit = document.querySelector('.popup_edit');
  const popupAdd = document.querySelector('.popup_add');
  const popupFullView = document.querySelector('.popup_fullview');
  const popupPicture = popupFullView.querySelector('.popup__picture');
  const popupSubtitle = popupFullView.querySelector('.popup__subtitle');
  
  const popupCloseEdit = popupEdit.querySelector('.popup__close_edit');
  const popupCloseAdd = popupAdd.querySelector('.popup__close_add');
  const popupCloseFullView = popupFullView.querySelector('.popup__close_fullview');

  const popupEditOpenButton = document.querySelector('.profile__edit');
  const popupAddOpenButton = document.querySelector('.profile__add');
  const formEdit = document.querySelector('.popup__form');
  const formAdd = document.querySelector('.popup__form_add');

  const nameInput = formEdit.querySelector('.popup__input_text_name'); 
  const jobInput = formEdit.querySelector('.popup__input_text_occupation');
  
  const profileName = document.querySelector('.profile__name');
  const profileOccupation = document.querySelector('.profile__occupation');
  
  const inputCardName = formAdd.querySelector('#input_card_name');
  const inputCardUrl = formAdd.querySelector('#input_card_url');
  const cardTemplate = document.querySelector("#card-template").content.querySelector('.element');
  const elementsListElement = document.querySelector('.elements');
  
  
  
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
  
//   ('click', () => openPopupImage(data))
//   function openPopupImage(item) {...}










  initialCards.forEach(function(item) {
    const element = createElement(item);
    elementsListElement.append(element);
  });
  
  
  const openPopup = function(item) {
    item.classList.add('popup_opened');
  };
  
  const openPopupEdit = function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
    openPopup(popupEdit);
  };
  
  const openPopupAdd = function() {
    openPopup(popupAdd);
  };
  
  const closePopup = function(item) {
    item.classList.remove('popup_opened');
  };
  


  const closePopupEdit = function() {
    closePopup(popupEdit);
  };
  
  const closePopupAdd = function() {
    closePopup(popupAdd);
  };
  
  const closePopupViewImage = function() {
    closePopup(popupFullView);
  };
  

// const closePopupByClickOnOverlay = function(event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     } 
//     closePopup();
// };


  
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
  };
  
  popupEditOpenButton.addEventListener('click', openPopupEdit);
  popupAddOpenButton.addEventListener('click', openPopupAdd);
  popupCloseEdit.addEventListener('click', closePopupEdit);

  popupCloseAdd.addEventListener('click', closePopupAdd);
  popupCloseFullView.addEventListener('click', closePopupViewImage);
  
  formEdit.addEventListener('submit', submitEditHandlerForm);
  formAdd.addEventListener('submit', submitAddHandlerForm);

 
