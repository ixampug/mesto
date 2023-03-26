export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}

// const closePopupByKey = (e) => {
//     if (e.key === "Escape") {
//       const openedPopup = document.querySelector(".popup_opened");
//       closePopup(openedPopup);
//     }
//   };

//   const closePopupByClickOnOverlay = function (e) {
//     if (e.target !== e.currentTarget) {
//       return;
//     }
//     closePopup(e.currentTarget);
//   };

// const closePopup = function (item) {
//   item.classList.remove("popup_opened");
//   item.removeEventListener("click", closePopupByClickOnOverlay);
//   document.removeEventListener("keyup", closePopupByKey);
// };

// const buttonCloseList = document.querySelectorAll(".popup__close");
// buttonCloseList.forEach((btn) => {
//   const popup = btn.closest(".popup");
//   btn.addEventListener("click", () => closePopup(popup));
// });

// const closePopupEdit = function () {
//   closePopup(popupEdit);
// };

// const closePopupAdd = function () {
//   closePopup(popupAdd);
// };
