import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor({ popupSelector, img, text }) {
		super(popupSelector);
		this._popupFigcaption = this._popupSelector.querySelector(text);
		this._popupImage = this._popupSelector.querySelector(img);

	}

	open(name, link) {

		this._popupImage.src = link;
		this._popupImage.alt = name;
		this._popupFigcaption.textContent = name;

		super.open();
	}
}