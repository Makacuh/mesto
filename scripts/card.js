import { popupImage, popupFigcaption, popupWindow,  } from './index.js';
import {openPopup} from './utils.js';



export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    
    this._element = this._getTemplate();
    this._card = this._element.querySelector('.element__image');

    this._card.src = this._link;
    this._card.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setListenElements();

    return this._element;
  }

  _deleteElement() {
    
    this._element.remove();
    this._element = null;
  }

  _likeElement() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _openPopupPreview() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupFigcaption.textContent = this._name;
    openPopup(popupWindow);
  }

  _setListenElements() {
    this._element.querySelector('.element__btn-trash').addEventListener('click', () => {
      this._deleteElement();
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupPreview();
    });
  }
}
