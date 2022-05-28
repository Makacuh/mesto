import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, captionSelector }) {
    super(popupSelector);
    this._popupFigCaption = this._popupSelector.querySelector(captionSelector);
    this._popupImage = this._popupSelector.querySelector(imageSelector);
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupFigCaption.textContent = name;
    super.open();
  }
}
