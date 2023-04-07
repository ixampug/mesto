import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popupSelector.querySelector('.popup__picture');
    this._popupSubtitle = this._popupSelector.querySelector('.popup__subtitle');
  }
  
  open(name, link) {
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}