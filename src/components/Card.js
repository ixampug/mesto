
export class Card {
  constructor({ name, link, likes, _id },isLikedByOwner,
    ownerCard, handleLike, handleCardClick,templateSelector,handleDelete) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._templateSelector = templateSelector;
    
    this._handleCardClick = handleCardClick;
    this.isLikedByOwner = isLikedByOwner;
    this._ownerCard = ownerCard;
    this._likesNumber = likes.length;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
  }

  _getTemplate = () => {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  _setEventListeners = () => {
    this._buttonLike.addEventListener("click", () => {
      this._handleLike(this._id, this);
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDelete(this._id, this);
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  deleteCard = () => {
    this._card.remove();
    
  };

  _checkLike = () => {
    if (this.isLikedByOwner) {
      this._putLike();
    }
  };

  _showDeleteButton = (ownerCard) => {
    if (!ownerCard) {
      this._buttonDelete.remove();
    }
  };

  _putLike = () => {
    this._buttonLike.classList.add("card__like_active");
  };

  _disLike = () => {
    this._buttonLike.classList.remove("card__like_active");
  };

  _LikeCounter = (count) => {
    this._likeCounter = this._card.querySelector(".card__like-counter");
    this._likeCounter.textContent = count;
  };

  updateLikes = (count) => {
    this._LikeCounter(count);
    if (this.isLikedByOwner) {
      this._disLike();
      this.isLikedByOwner = false;
    } else {
      this._putLike();
      this.isLikedByOwner = true;
    }
  };

  createCard = () => {
    this._card = this._getTemplate();

    this._card.querySelector(".card__name").textContent = this._name;
    this._image = this._card.querySelector(".card__photo");
    this._image.src = this._link;
    this._image.alt = this._name;

    this._LikeCounter(this._likesNumber);
    this._buttonLike = this._card.querySelector(".card__like");
    this._checkLike();

    this._buttonDelete = this._card.querySelector(".card__delete");
    this._showDeleteButton(this._ownerCard);
    this._setEventListeners();
    return this._card;
  };

 
}

