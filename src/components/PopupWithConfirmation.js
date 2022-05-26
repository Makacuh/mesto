import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor( popupSelector, element ) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
    this._element = element;
  }

  
  submitCallback(card) {
    card.remove();
    card = null;
  }

  open(element, id) {
    super.open();
    this._card = element;
    this._id = id;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      event.preventDefault();
      
    });
  }
}