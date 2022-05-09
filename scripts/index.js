import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';
//import { openPopup } from './utils.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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

const overviewImage = new PopupWithImage({popupSelector: ".popup_window", img: ".popup__image", text: ".popup__figcaption"});

overviewImage.setEventListeners();

function handleCardClick(name, link) {
  
  overviewImage.open(name, link);
};

const formList = Array.from(document.querySelectorAll(arrayValidation.formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(arrayValidation, formElement);
  formValidator.enableValidation();
});

function renderElement(data) {
  const card = new Card(data, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

/*initialCards.forEach(function (card) {
  renderElement(card, '.element-template')
});*/



const createCard = new Section(
  {
    items: initialCards,
    renderer: renderElement
  },
  '.elements'
);

createCard.renderItems();

const infoUser = new UserInfo({name: ".profile__title", info: ".profile__subtitle"});

/*export function closePopup(item) {
  item.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);

};*/

/*function handleAddSubmit(event) {
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
};*/

const popupAddSection = new PopupWithForm('.popup_type_place', (data) => {
	
	
		//const card = createCard(data)
		createCard.addItem(renderElement(data));
		popupAddSection.close();
	
	
});

popupAddSection.setEventListeners();

const editProfile = new PopupWithForm('.profile-popup', (data) => {
  infoUser.setUserInfo(data);
  editProfile.close();
});

editProfile.setEventListeners();

/*function editForm(event) {
  event.preventDefault();
  authorName.textContent = titleInput.value;
  authorAbout.textContent = subtitleInput.value;
  closePopup(profilePopup);
  profileForm.reset();
};*/

buttonAdd.addEventListener("click", () => {
  popupAddSection.open();
});

//formAdd.addEventListener('submit', handleAddSubmit);

//profileForm.addEventListener('submit', editForm);

buttonEdit.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  editProfile.open();
});

/*popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})*/
