import { popupImage, popupFigcaption, popupWindow, openPopup } from './index.js';

export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];

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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setListenElements();

    return this._element;
  }

  _deleteElement() {
    this._element.closest('.element').remove();
  }

  _likeElement() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _openPopupPreview() {
    const previewImage = this._element.querySelector('.element__image');
    const previewFigcaption = this._element.querySelector('.element__title');
    popupImage.src = previewImage.src;
    popupImage.alt = previewFigcaption.textContent;
    popupFigcaption.textContent = previewFigcaption.textContent;
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