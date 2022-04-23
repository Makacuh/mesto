import { Card } from './card.js';
import { initialCards } from './card.js';
import { FormValidator } from './FormValidator.js';

const profilePopup = document.querySelector(".profile-popup");
const editButton = document.querySelector(".profile__edit-button");
const authorName = document.querySelector(".profile__title");
const authorAbout = document.querySelector(".profile__subtitle");
const titleInput = profilePopup.querySelector("#input-popup-title");
const subtitleInput = profilePopup.querySelector("#input-popup-subtitle");
const profileForm = profilePopup.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const placeName = document.querySelector(".element__title");
const addPopup = document.querySelector(".popup_type_place");
const placeTitleInput = addPopup.querySelector("#card-name");
const placeSubtitleInput = addPopup.querySelector("#card-link");
const addForm = addPopup.querySelector(".popup__form-add-element");
const placeTemplate = document.querySelector(".element-template").content;
const placesBox = document.querySelector(".elements");
export const popupWindow = document.querySelector(".popup_window");
const elementTitle = document.querySelectorAll(".element__title");
export const popupImage = popupWindow.querySelector(".popup__image");
export const popupFigcaption = popupWindow.querySelector(".popup__figcaption");
const elements = document.querySelector(".elements");
const editClose = document.querySelector("#editClose");
const addClose = document.querySelector("#addClose");
const owerviewClose = popupWindow.querySelector("#owerviewClose");
const popups = document.querySelectorAll('.popup')


const arrayValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active'
};

const formList = Array.from(document.querySelectorAll(arrayValidation.formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(arrayValidation, formElement);
  formValidator.enableValidation();
});

function renderElement(item, template) {
  const card = new Card(item, template);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

initialCards.forEach(function (card) {
  renderElement(card, '.element-template')
});

function closePopup(item) {
  item.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);

};

export function openPopup(item) {
  item.classList.add('popup_open');
  document.addEventListener('keydown', closeByEscape);
}

function handleAddSubmit(event) {
  event.preventDefault();

  const disabled = event.target.querySelector('.popup__button');

  const element = {};
  element.name = placeTitleInput.value;
  element.link = placeSubtitleInput.value;
  renderElement(element, '.element-template');

  placeTitleInput.value = "";
  placeSubtitleInput.value = "";
  disabled.setAttribute('disabled', true);
  disabled.classList.add('popup__button_disabled');
  addForm.reset();

  closePopup(addPopup);
};

function editForm(event) {
  event.preventDefault();
  authorName.textContent = titleInput.value;
  authorAbout.textContent = subtitleInput.value;
  closePopup(profilePopup);
  profileForm.reset();
};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
  }
}

addButton.addEventListener("click", function () {
  openPopup(addPopup)
});

addForm.addEventListener('submit', handleAddSubmit);

profileForm.addEventListener('submit', editForm);

editButton.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  openPopup(profilePopup);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_open')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

