import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popupSelector.querySelector(".popup__form");
		this._popupButton = this._popupSelector.querySelector(".popup__button");
		this._popupInputs = this._form.querySelectorAll(".popup__input");
		this._submitText = this._popupButton.textContent;
	}

	_getInputValues() {
		this._inputValues = {};
		this._popupInputs.forEach((item) => {
			this._inputValues[item.name] = item.value;
		});
		return this._inputValues;



	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
		});

	}

	close() {
		this._form.reset();
		super.close();
	}

	loading(isLoading) {
		if (isLoading) {
		  this._popupButton.textContent = 'Сохранение...'
		} else {
		  this._popupButton.textContent = this._submitText;
		}
	  }
}