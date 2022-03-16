let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closePopup = popup.querySelector(".popup__close");
let authorName = document.querySelector(".profile__title");
let authorAbout = document.querySelector(".profile__subtitle");
let titleInput = popup.querySelector("#input-popup-title");
let subtitleInput = popup.querySelector("#input-popup-subtitle");
let profileForm = popup.querySelector(".popup__form");


function popupOpen() {
    titleInput.value = authorName.textContent;
    subtitleInput.value = authorAbout.textContent;
    popup.classList.add('popup_open');
};

function popupClose() {
    popup.classList.remove('popup_open');
};

function handleProfileEditSubmit(event) {
    event.preventDefault();

    authorName.textContent = titleInput.value;
    authorAbout.textContent = subtitleInput.value;

    popupClose();
    profileForm.reset();

}

profileForm.addEventListener('submit', handleProfileEditSubmit);
editButton.addEventListener("click", popupOpen);
closePopup.addEventListener("click", popupClose);
//--------------------------------------------------------------------------------//

const initialCards = [
    {
      name: "Архыз",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
      name: "Челябинская область",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
      name: "Иваново",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
      name: "Камчатка",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
      name: "Холмогорский район",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
      name: "Байкал",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
  ];
  
  
  const placeTemplate = document.querySelector(".element-template").content;
  const placesBox = document.querySelector(".elements");
  
  const placeInfo = initialCards.map(function (item) {
    return {
      name: item.name,
      link: item.link
    };
  });
  
  function render() {
    placeInfo.forEach(renderCard);
  }
  
  function renderCard({ name, link }) {
    const placeElement = placeTemplate
      .querySelector(".element")
      .cloneNode(true);
    placeElement.querySelector(".element__title").textContent = name;
    placeElement.querySelector(".element__image").src = link;
  
    placesBox.append(placeElement);
  }
  
  render();