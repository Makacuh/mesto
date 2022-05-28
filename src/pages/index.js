import "./index.css";

import { FormValidator } from "../components/FormValidator.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  buttonEdit,
  titleInput,
  subtitleInput,
  buttonAdd,
  formCard,
  formEdit,
  linkAvatar,
  arrayValidation,
  formAvatar,
  buttonEditAvatar,
} from "../utils/constants.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "e947860b-2631-45df-8b33-3824316a4dc7",
    "Content-Type": "application/json",
  },
});

let userId;

const formValidatorElement = new FormValidator(arrayValidation, formCard);
formValidatorElement.enableValidation();

const formValidatorProfile = new FormValidator(arrayValidation, formEdit);
formValidatorProfile.enableValidation();

const formEditAvatarValidator = new FormValidator(arrayValidation, formAvatar);
formEditAvatarValidator.enableValidation();

const overviewImage = new PopupWithImage({
  popupSelector: ".popup_window",
  img: ".popup__image",
  text: ".popup__figcaption",
});

overviewImage.setEventListeners();

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: ".element-template",
    handleCardClick: (name, link) => {
      overviewImage.open(name, link);
    },
    handleCardConfirmation: (id) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api
          .deleteElement(id)
          .then(() => {
            deleteCardPopup.close();
            card.deleteElement();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleLikeClick: (id) => {
      api
        .setLike(id)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (id) => {
      api
        .deleteLike(id)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    userId,
  });
  return card.generateCard();
};

const cardsList = new Section(
  {
    renderer: (card) => {
      cardsList.addItem(createCard(card));
    },
  },
  ".elements"
);

const infoUser = new UserInfo({
  name: ".profile__title",
  info: ".profile__subtitle",
  avatar: linkAvatar,
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, intialUser]) => {
    infoUser.setUserInfo({
      name: intialUser.name,
      info: intialUser.about,
      avatar: intialUser.avatar,
    });

    userId = intialUser._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const deleteCardPopup = new PopupWithConfirmation(".popup_confirm");

deleteCardPopup.setEventListeners();

const popupAddSection = new PopupWithForm({
  popupSelector: ".popup_type_place",
  handleFormSubmit: (data) => {
    popupAddSection.loading(true);
    api
      .addCard(data.name, data.link)
      .then((res) => {
        cardsList.addItem(createCard(res));
        popupAddSection.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddSection.loading(false);
      });
  },
});

popupAddSection.setEventListeners();

const editProfile = new PopupWithForm({
  popupSelector: ".profile-popup",
  handleFormSubmit: (data) => {
    editProfile.loading(true);
    api
      .editUserInfo(data.name, data.info)
      .then((res) => {
        infoUser.setUserInfo({
          name: res.name,
          info: res.about,
          avatar: res.avatar,
        });

        editProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfile.loading(false);
      });
  },
});

editProfile.setEventListeners();

const editAvatarPopup = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api
      .editAvatar(data.link)

      .then((res) => {
        infoUser.setUserInfo({
          name: res.name,
          info: res.about,
          avatar: res.avatar,
        });
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  },
});

editAvatarPopup.setEventListeners();

buttonEditAvatar.addEventListener("click", () => {
  formEditAvatarValidator.resetErrors();
  editAvatarPopup.open();
});

buttonEdit.addEventListener("click", () => {
  const getUserObj = infoUser.getUserInfo();
  titleInput.value = getUserObj.name;
  subtitleInput.value = getUserObj.info;
  formValidatorProfile.resetErrors();
  editProfile.open();
});

buttonAdd.addEventListener("click", () => {
  formValidatorElement.resetErrors();
  popupAddSection.open();
});
