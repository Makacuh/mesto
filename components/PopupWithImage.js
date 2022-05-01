import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupFigcaption = this._element.querySelector(".popup__figcaption");
		this._popupImage = this._element.querySelector(".popup__image");
	}

	open({src, alt}) {
		this._popupImage.setAttribute("src", src);
		this._popupImage.setAttribute("alt", alt);
		this._popupFigcaption.textContent = alt;
		return super.open();
	}
}