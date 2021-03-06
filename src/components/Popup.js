export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupButton = this._popupSelector.querySelector(".popup__button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.classList.add("popup_open");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupSelector.classList.remove("popup_open");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target === evt.target.closest(".popup")
      ) {
        this.close();
      }
    });
  }
}
