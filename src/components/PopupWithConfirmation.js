import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor( popupSelector, element ) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
    this._element = element;
  }

  
  _deleteElement(card) {
    card.remove();
    card = null;
  }

  open(element, id) {
    super.open();
    this._card = element;
    this._id = id;
  }
  
  setEventListeners(api) {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      api.deleteElement(this._id)
        .then(() => {
          this._deleteElement(this._card);
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        
      
    });
  }
}