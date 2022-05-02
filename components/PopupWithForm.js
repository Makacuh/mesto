import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._element.querySelector("form");
		this._popupButton = this._element.querySelector(".popup__button");
		this._popupInputs = this._element.querySelectorAll(".popup__input");
	}

	_getInputValues() {
		const formValues = {};
		this._popupInputs.forEach(input => formValues[input.name] = input.value);
		 return formValues;
	}

	setEventListeners() {
		this._form.addEventListener("submit", (event) => {
			const value = this._popupButton.textContent;
			this._handleFormSubmit(this._getInputValues())
			.finally(() => {
				this._popupButton.textContent = value;
			})
			event.preventDefault();
		});
		return super.setEventListeners();
	}

	close() {
		this._form.reset();
		return super.close();
	}
}