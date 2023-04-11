import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupPicture = this._popup.querySelector('.popup__picture');
    this._popupSubtitle = this._popup.querySelector('.popup__subtitle');
  }
  
  open(name, link) {
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}