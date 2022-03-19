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


let addButton = document.querySelector(".profile__add-button");
let placeName = document.querySelector(".element__title");
let addPopup =  document.querySelector(".popup-place");
let placeTitleInput = addPopup.querySelector("#element-name");
let placeSubtitleInput = addPopup.querySelector("#element-link");
let closeAddPopup = addPopup.querySelector(".popup__close");
let AddForm = addPopup.querySelector(".popup__form-add-element");    





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
    placeInfo.forEach(renderElement);
  }
  
  function renderElement({ name, link }) {
    const placeElement = placeTemplate
      .querySelector(".element")
      .cloneNode(true);
    placeElement.querySelector(".element__title").textContent = name;
    placeElement.querySelector(".element__image").src = link;
  
    placesBox.append(placeElement);
  }
  
  render();

  function popupAddOpen() {
    
    addPopup.classList.add('popup_open');
};

function popupAddClose() {
  addPopup.classList.remove('popup_open');
};

function handleAddSubmit(event) {
  event.preventDefault();

  const placeElement = placeTemplate
      .querySelector(".element")
      .cloneNode(true);
    placeElement.querySelector(".element__title").textContent = placeTitleInput.value;
    placeElement.querySelector(".element__image").src = placeSubtitleInput.value;
  
    placesBox.prepend(placeElement);
  
  

  popupAddClose();
  AddForm.reset();

}

AddForm.addEventListener('submit', handleAddSubmit);
addButton.addEventListener("click", popupAddOpen);
closeAddPopup.addEventListener("click", popupAddClose);

