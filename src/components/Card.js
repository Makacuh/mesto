export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardConfirmation, api, userId) {

    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._like = data.likes;
    this._api = api;

    this._userIdPhoto = data.owner._id;
    this._userId = userId;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._handleCardConfirmation = handleCardConfirmation;

    if (data.likes) {
      this._likes = data.likes.length;
    } else {
      this._likes = 0;
    }
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

    this._elementLikes = this._element.querySelector('.element__likes-counter');

    this._elementLikes.textContent = this._likes;
    this._heartLike = this._element.querySelector('.element__like');

    if (typeof this._like !== "undefined" && this._like.some((user) => { return user._id == this._userId })) {
      this._heartLike.classList.add('element__like_active');
    }

    this._setListenElements();

    if (this._userIdPhoto !== this._userId) {
      this._element.querySelector('.element__btn-trash').remove();
    }


    return this._element;
  }

  _likeElement(id) {

    if (!this._heartLike.classList.contains('element__like_active')) {
      this._api.toggleLike(id, 'PUT')
        .then((res) => { return res.likes.length })
        .then((count) => {
          this._elementLikes.textContent = count;
        })
        .then(() => {
          this._heartLike.classList.add('element__like_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api.toggleLike(id, 'DELETE')
        .then((res) => { return res.likes.length })
        .then((count) => {
          this._elementLikes.textContent = count;
        })
        .then(() => {
          this._heartLike.classList.remove('element__like_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }




  _setListenElements() {
    this._element.querySelector('.element__btn-trash').addEventListener('click', () => {
      this._handleCardConfirmation(this._element, this._id)
    });
    this._heartLike.addEventListener('click', () => {
      this._likeElement(this._id);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
