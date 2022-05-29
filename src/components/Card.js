export default class Card {
  constructor({
    data,
    cardSelector,
    handleCardClick,
    handleCardConfirmation,
    handleLikeClick,
    handleRemoveLike,
    userId,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._userIdPhoto = data.owner._id;
    this._userId = userId;
    this._myId = data.myId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveLike = handleRemoveLike;
    this._handleCardConfirmation = handleCardConfirmation;
  }

  deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _isLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._heartLike.classList.add("element__like_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._heartLike = this._element.querySelector(".element__like");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._deleteBtn = this._element.querySelector(".element__btn-trash");
    this._element.querySelector(".element__title").textContent = this._name;
    this._elementLikes = this._element.querySelector(".element__likes-counter");
    this._elementLikes.textContent = this._likes.length;
    this._hasDeleteBtn();
    this._isLiked();
    this._setListenElements();

    return this._element;
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._elementLikes.textContent = this._likes.length;
    this._heartLike.classList.toggle("element__like_active");
  }

  _hasDeleteBtn() {
    if (this._userId !== this._userIdPhoto) {
      this._deleteBtn.remove();
    }
  }

  _setListenElements() {
    this._deleteBtn.addEventListener("click", () => {
      this._handleCardConfirmation(this._id);
    });

    this._heartLike.addEventListener("click", () => {
      if (this._heartLike.classList.contains("element__like_active")) {
        this._handleRemoveLike(this._id);
      } else {
        this._handleLikeClick(this._id);
      }
    });

    this._cardImage
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }
}
