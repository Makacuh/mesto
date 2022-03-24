const popup = document.querySelector(".popup");
const popupOpen = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupClose = document.querySelectorAll(".popup__close");
const authorName = document.querySelector(".profile__title");
const authorAbout = document.querySelector(".profile__subtitle");
const titleInput = popup.querySelector("#input-popup-title");
const subtitleInput = popup.querySelector("#input-popup-subtitle");
const profileForm = popup.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const placeName = document.querySelector(".element__title");
const addPopup = document.querySelector(".popup-place");
const placeTitleInput = addPopup.querySelector("#element-name");
const placeSubtitleInput = addPopup.querySelector("#element-link");
const addForm = addPopup.querySelector(".popup__form-add-element");
const placeTemplate = document.querySelector(".element-template").content;
const placesBox = document.querySelector(".elements");
const popupWindow = document.querySelector(".popup_window");
const elementTitle = document.querySelectorAll(".element__title");
const createElement = (initialCards) => {
  const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
placeElement.querySelector(".element__title").textContent = initialCards.name;
placeElement.querySelector(".element__image").src = initialCards.link;
placesBox.prepend(placeElement);
return placeElement;
}
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

initialCards.forEach(card => {createElement(card);});

function closePopup(event) {
  const close = event.target.closest(".popup"); 
  close.classList.remove('popup_open');
 };

 function openPopup (item){
  item.classList.add('popup_open');
}

function renderElement(initialCards,placesBox) {
  const card = createElement(initialCards);
}

function openPopupPreview(event) {
  const popupImage = popupWindow.querySelector(".popup__image");
  const elementImage = event.target.closest(".element__image");
  const element = event.target.closest(".element");
  const placeName = element.querySelector(".element__title");
  const popupFigcaption = popupWindow.querySelector(".popup__figcaption");

  popupImage.src = elementImage.src;
  popupImage.alt = elementImage.alt;
  popupFigcaption.textContent = placeName.textContent;
  
  openPopup(popupWindow);
}

function deleteElement(event) {
  let element = event.target.closest(".element");
  event.preventDefault();
  element.remove();
};

function isLike(event) {
  event.preventDefault();

  event.target.classList.toggle("element__like_active");
  
};

popupClose.forEach((closeItem) => {
  closeItem.addEventListener('click', closePopup);
});

addForm.addEventListener('submit', function handleAddSubmit(event) {
  event.preventDefault();
  
createElement({
  name: placeTitleInput.value,
  link: placeSubtitleInput.value
});
closePopup();
  addForm.reset();
});

addButton.addEventListener("click", function () {
  openPopup(addPopup);
});

document.querySelectorAll('.element__like').forEach((like) => {
  like.addEventListener('click', isLike);
});

document.querySelectorAll(".element__btn-trash").forEach((item) => {
  item.addEventListener('click', deleteElement);
});

document.querySelectorAll(".element__image").forEach((item) => {
  item.addEventListener('click', openPopupPreview);
});

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  authorName.textContent = titleInput.value;
  authorAbout.textContent = subtitleInput.value;
  closePopup();
  profileForm.reset();
});

editButton.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  popup.classList.add('popup_open');
});
