import { initialCards } from '../utils/initialCards.js';
import { FormValidator } from '../components/FormValidator.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { buttonEdit, authorName, authorAbout, titleInput, subtitleInput, buttonAdd, elements, arrayValidation } from '../utils/constants.js';


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
  elements.prepend(cardElement);
}



const createCard = new Section(
  {
    items: initialCards,
    renderer: renderElement
  },
  '.elements'
);

createCard.renderItems();

const infoUser = new UserInfo({ name: ".profile__title", info: ".profile__subtitle" });




const popupAddSection = new PopupWithForm('.popup_type_place', (data) => {



  createCard.addItem(renderElement(data));
  popupAddSection.close();


});

popupAddSection.setEventListeners();

const editProfile = new PopupWithForm('.profile-popup', (data) => {
  infoUser.setUserInfo(data);
  editProfile.close();
});

editProfile.setEventListeners();


buttonAdd.addEventListener("click", () => {
  popupAddSection.open();
});



buttonEdit.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  editProfile.open();
});

