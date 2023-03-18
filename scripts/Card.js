export class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _putLike = () => {
    this._buttonLike.classList.toggle("element__like_active");
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementName = this._element.querySelector(".element__name");
    this._elementImage = this._element.querySelector(".element__photo");
    this._buttonLike = this._element.querySelector(".element__like");
    this._buttonDelete = this._element.querySelector(".element__delete");
    this._elementImage.src = this._link;
    this._elementName.alt = this._name;
    this._elementName.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", () => {
      this._element.remove();
    });

    this._buttonLike.addEventListener("click", () => {
      this._putLike();
    });

    this._elementImage.addEventListener("click", () => {
      this._handleOpenPopup(this._name, this._link);
    });
  }
}
