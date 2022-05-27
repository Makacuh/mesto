import './index.css';

//import { initialCards } from '../utils/initialCards.js';
import { FormValidator } from '../components/FormValidator.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";

import { buttonEdit, authorName, authorAbout, titleInput, subtitleInput, buttonAdd, formCard, formEdit, elements, linkAvatar,arrayValidation, formAvatar, buttonEditAvatar, popupEditAvatar } from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'e947860b-2631-45df-8b33-3824316a4dc7',
    'Content-Type': 'application/json'
  }
});



let userId;
let createCard;

/*const formValidatorElement = new FormValidator(arrayValidation, formCard);
formValidatorElement.enableValidation();

const formValidatorProfile = new FormValidator(arrayValidation, formEdit);
formValidatorProfile.enableValidation();

const formEditAvatarValidator = new FormValidator(arrayValidation, formAvatar);
formEditAvatarValidator.enableValidation();*/

const overviewImage = new PopupWithImage({

  popupSelector: ".popup_window",
  img: ".popup__image",
  text: ".popup__figcaption"

});

overviewImage.setEventListeners();

function handleCardClick(name, link) {
  overviewImage.open(name, link);
};

function renderElement(data) {
  const card = new Card(
    data,
    '.element-template',
    handleCardClick,
    handleCardConfirmation,
    api,
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const infoUser = new UserInfo({
  name: ".profile__title",
  info: ".profile__subtitle",
  avatar: linkAvatar
});


Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, intialUser]) => {
    createCard = new Section(
      {
        items: initialCards,
        renderer: renderElement
      },
      '.elements'
    );
    infoUser.setUserInfo({name: intialUser.name, info: intialUser.about, avatar: intialUser.avatar});

    userId = intialUser._id;
    createCard.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

  const deleteCardPopup = new PopupWithConfirmation('.popup__confirm');
  

  deleteCardPopup.setEventListeners(api);

  function handleCardConfirmation(element, id) {
    deleteCardPopup.open(element, id);
  }

  const popupAddSection = new PopupWithForm(
    '.popup_type_place',
    (data) => {
      popupAddSection.loading(true);
      api.addCard(data.name, data.link)
        .then((res) => {
          createCard.addItem(renderElement(res));
  console.log('1');
          popupAddSection.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAddSection.loading(false);
        });
    });
  
  
  popupAddSection.setEventListeners();



const editProfile = new PopupWithForm('.profile-popup', (data) => {
  editProfile.loading(true);
  api.editUserInfo(data.name, data.info)
    .then((res) => {
      infoUser.setUserInfo({name: res.name, info: res.about, avatar: res.avatar});
      
      editProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfile.loading(false);
    });

});

editProfile.setEventListeners();

const editAvatarPopup = new PopupWithForm(
  '.popup_type_avatar',
  (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data.link)
    
      .then((res) => {
        infoUser.setUserInfo({name: res.name, info: res.about, avatar: res.avatar});
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
      console.log(data.link);
  });

editAvatarPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  // formEditAvatarValidator.resetErrors();
  editAvatarPopup.open();
});

buttonEdit.addEventListener("click", () => {
  const getUserObj = infoUser.getUserInfo();
  titleInput.value = getUserObj.name;
  subtitleInput.value = getUserObj.info;

  editProfile.open();
  //formValidatorProfile.resetErrors();
});


buttonAdd.addEventListener("click", () => {
  //formValidatorElement.resetErrors();
  popupAddSection.open();
});








