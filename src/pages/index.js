import './index.css';1111

import { initialCards } from '../utils/initialCards.js';
import { FormValidator } from '../components/FormValidator.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { buttonEdit, authorName, authorAbout, titleInput, subtitleInput, buttonAdd, formCard, formEdit, elements, arrayValidation } from '../utils/constants.js';

const formValidatorElement = new FormValidator(arrayValidation, formCard);
formValidatorElement.enableValidation();

const formValidatorProfile = new FormValidator(arrayValidation, formEdit);
formValidatorProfile.enableValidation();

const overviewImage = new PopupWithImage({ popupSelector: ".popup_window", img: ".popup__image", text: ".popup__figcaption" });

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
  return cardElement;
}



const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.setItem(renderElement(data));
    }
  },
  '.elements'
);

cardList.renderItems();

const infoUser = new UserInfo({ name: ".profile__title", info: ".profile__subtitle" });




const popupAddSection = new PopupWithForm('.popup_type_place', (data) => {

  cardList.addItem(renderElement(data));
  popupAddSection.close();

});

popupAddSection.setEventListeners();

const editProfile = new PopupWithForm('.profile-popup', (data) => {
  infoUser.setUserInfo(data);
  editProfile.close();
});

editProfile.setEventListeners();


buttonAdd.addEventListener("click", () => {
  formValidatorElement.resetErrors();
  popupAddSection.open();
});



buttonEdit.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  formValidatorProfile.resetErrors();
  editProfile.open();
});

