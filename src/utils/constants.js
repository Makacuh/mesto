
const popupEditProfile = document.querySelector('.profile-popup');
const popupAddNewCard = document.querySelector('.popup_type_place');
const popupEditAvatar = document.querySelector('.popup_type_avatar');

export const profilePopup = document.querySelector(".profile-popup");
export const buttonEdit = document.querySelector(".profile__edit-button");
export const authorName = document.querySelector(".profile__title");
export const authorAbout = document.querySelector(".profile__subtitle");
export const titleInput = profilePopup.querySelector("#input-popup-title");
export const subtitleInput = profilePopup.querySelector("#input-popup-subtitle");
export const formCard = popupAddNewCard.querySelector(".popup__form-add-element");

export const formEdit = popupEditProfile.querySelector(".popup__edit-element");
export const formAvatar = popupEditAvatar.querySelector(".edit-avatar-form");
//export const popupEditAvatar = document.querySelector('.popup_type_avatar');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');


export const buttonAdd = document.querySelector(".profile__add-button");
export const popupAdd = document.querySelector(".popup_type_place");

export const popupWindow = document.querySelector(".popup_window");
export const popupImage = popupWindow.querySelector(".popup__image");
export const popupFigcaption = popupWindow.querySelector(".popup__figcaption");
export const elements = document.querySelector(".elements");

export const arrayValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error-message_active'
  };
  