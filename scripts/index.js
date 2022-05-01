import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';
import { openPopup } from './utils.js';

const profilePopup = document.querySelector(".profile-popup");
const buttonEdit = document.querySelector(".profile__edit-button");
const authorName = document.querySelector(".profile__title");
const authorAbout = document.querySelector(".profile__subtitle");
const titleInput = profilePopup.querySelector("#input-popup-title");
const subtitleInput = profilePopup.querySelector("#input-popup-subtitle");
const profileForm = profilePopup.querySelector(".popup__form");
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_place");
const placeTitleInput = popupAdd.querySelector("#card-name");
const placeSubtitleInput = popupAdd.querySelector("#card-link");
const formAdd = popupAdd.querySelector(".popup__form-add-element");
export const popupWindow = document.querySelector(".popup_window");
export const popupImage = popupWindow.querySelector(".popup__image");
export const popupFigcaption = popupWindow.querySelector(".popup__figcaption");
const elements = document.querySelector(".elements");
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

/*export function closePopup(item) {
  item.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);

};*/

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
  formAdd.reset();

  closePopup(popupAdd);
};

function editForm(event) {
  event.preventDefault();
  authorName.textContent = titleInput.value;
  authorAbout.textContent = subtitleInput.value;
  closePopup(profilePopup);
  profileForm.reset();
};

buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd)
});

formAdd.addEventListener('submit', handleAddSubmit);

profileForm.addEventListener('submit', editForm);

buttonEdit.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  openPopup(profilePopup);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})
