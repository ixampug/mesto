export default class Card {
  constructor(
    { name, link, likes, _id },
    isLikedByOwner,
    ownerCard,
    templateSelector,
    handleLikeCard,
    handleCardClick,
    handleDelete
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLikedByOwner = isLikedByOwner;
    this._ownerCard = ownerCard;
    this._likesNumber = likes.length;
    this._templateSelector = templateSelector;
    this._handleLike = handleLikeCard;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLike(this._id, this);
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDelete(this._id, this);
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  _checkLike() {
    if (this.isLikedByOwner) {
      this._putLike();
    }
  }

  _showDeleteButton(ownerCard) {
    if (!ownerCard) {
      this._buttonDelete.remove();
    }
  }

  _putLike() {
    this._buttonLike.classList.add("card__like_active");
  }

  _deactivateLikeState() {
    this._buttonLike.classList.remove("card__like_active");
  }

  _refreshLikes(count) {
    this._likeCounter = this._card.querySelector(".card__like-counter");
    this._likeCounter.textContent = count;
  }

  updateLikes(count) {
    this._refreshLikes(count);
    if (this.isLikedByOwner) {
      this._deactivateLikeState();
      this.isLikedByOwner = false;
    } else {
      this._putLike();
      this.isLikedByOwner = true;
    }
  }

  createCard() {
    this._card = this._getTemplate();

    this._card.querySelector(".card__name").textContent = this._name;
    this._image = this._card.querySelector(".card__photo");
    this._image.src = this._link;
    this._image.alt = this._name;

    this._refreshLikes(this._likesNumber);
    this._buttonLike = this._card.querySelector(".card__like");
    this._checkLike();

    this._buttonDelete = this._card.querySelector(".card__delete");
    this._showDeleteButton(this._ownerCard);

    this._setEventListeners();

    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
  
}
