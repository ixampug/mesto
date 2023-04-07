import {Popup} from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._button = this._popupSelector.querySelector(".popup__submit");
  }
  
  open(info) {
    super.open();
    this._infoConfirm = info; 
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._handleConfirmation(this._infoConfirm);
    });
  }
}