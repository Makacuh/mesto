import './index.css';

import { initialCards } from '../utils/initialCards.js';
import { FormValidator } from '../components/FormValidator.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";

import { buttonEdit, authorName, authorAbout, titleInput, subtitleInput, buttonAdd, formCard, formEdit, elements, arrayValidation } from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'e947860b-2631-45df-8b33-3824316a4dc7',
    'Content-Type': 'application/json'
  }
}); 

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

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

const infoUser = new UserInfo({ name: ".profile__title", info: ".profile__subtitle",avatar: '.profile__avatar' });




const popupAddSection = new PopupWithForm('.popup_type_place', (data) => {

  cardList.addItem(renderElement(data));
  popupAddSection.close();

});

popupAddSection.setEventListeners();

const editProfile = new PopupWithForm({popupSelector:'.profile-popup', handleFormSubmit: (dataForm) => {
  editProfile.loading(true);
  api.editUserInfo(dataForm)
    .then((dataForm) => {
      userInfo.setUserInfo(dataForm);
      editProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editProfile.loading(false);
    });
}
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

