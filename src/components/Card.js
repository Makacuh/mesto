export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, handleDeleteIconClick, handleSetLike, handleRemoveLike ) {

    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likes = data.likes;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
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
    this._likeBtn = this._element.querySelector('.element__like-btn');
    this._likesNumber = this._element.querySelector('.element__likes-number');
    this._deleteBtn = this._element.querySelector('.element__delete-btn');

    this._card.src = this._link;
    this._card.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._hasDeleteBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  deleteElement() {

    this._element.remove();
    this._element = null;
  }

  _setListenElements() {
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement();
    });
    this._card.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('element__like_active');
    }
  }

 
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeBtn.classList.toggle('element__like_active');
  }

  
  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }
}
