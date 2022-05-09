import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popupSelector.querySelector(".popup__form");
		this._popupButton = this._popupSelector.querySelector(".popup__button");
		this._popupInputs = this._form.querySelectorAll(".popup__input");
	}

	_getInputValues() {
		this._inputValues = {};
		this._popupInputs.forEach((item) => {
		  this._inputValues[item.name] = item.value;
		});
		return this._inputValues;



		/*const formValues = {};
		this._popupInputs.forEach(input => formValues[input.name] = input.value);

		 return formValues;*/
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
		  evt.preventDefault();
		  this._handleFormSubmit(this._getInputValues());
		});




		/*this._form.addEventListener("submit", (event) => {
			const value = this._popupButton.textContent;
			this._handleFormSubmit(this._getInputValues())
			.finally(() => {
				this._popupButton.textContent = value;
			})
			event.preventDefault();
		});
		return super.setEventListeners();*/
	}

	close() {
		this._form.reset();
		 super.close();
	}
}