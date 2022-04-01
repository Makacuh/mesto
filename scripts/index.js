const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const authorName = document.querySelector(".profile__title");
const authorAbout = document.querySelector(".profile__subtitle");
const titleInput = popup.querySelector("#input-popup-title");
const subtitleInput = popup.querySelector("#input-popup-subtitle");
const profileForm = popup.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const placeName = document.querySelector(".element__title");
const addPopup = document.querySelector(".popup_type_place");
const placeTitleInput = addPopup.querySelector("#card-name");
const placeSubtitleInput = addPopup.querySelector("#card-link");
const addForm = addPopup.querySelector(".popup__form-add-element");
const placeTemplate = document.querySelector(".element-template").content;
const placesBox = document.querySelector(".elements");
const popupWindow = document.querySelector(".popup_window");
const elementTitle = document.querySelectorAll(".element__title");
const popupImage = popupWindow.querySelector(".popup__image");
const popupFigcaption = popupWindow.querySelector(".popup__figcaption");
const elements = document.querySelector(".elements");
const editClose = document.querySelector("#editClose");
const addClose = document.querySelector("#addClose");
const owerviewClose = popupWindow.querySelector("#owerviewClose");
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement,  inputErrorClass, errorClass );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const hideInputError = (formElement,inputElement) => {
  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__error-message_active');
  errorElement.textContent = '';
};
const checkInputValidity = (formElement,inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement,inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement,inputElement);
  }
};

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); }

const toggleButtonState = (inputList,buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {buttonElement.classList.add('popup__button_disabled');
} else {
  buttonElement.classList.remove('popup__button_disabled');
} 
}

const showInputError = (formElement,inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error-message_active');
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};



function createElement(item) {
  const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
  const elementCaption = placeElement.querySelector(".element__title");
  const elementImage = placeElement.querySelector(".element__image");
  const elementLikeButton = placeElement.querySelector('.element__like');
  const elementDeleteButton = placeElement.querySelector(".element__btn-trash");
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementCaption.textContent = item.name;
  elementLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle("element__like_active");
  })
  elementDeleteButton.addEventListener('click', deleteElement);
  elementImage.addEventListener('click', () => { openPopupPreview(item) });
  return placeElement;
}

function initElements() {
  initialCards.forEach(initCards);
};

initElements();

function initCards(item) {
  
  renderElement(createElement(item));
}

function renderElement(element) {
  
  //createElement(element);
  elements.prepend(element);
}

function closePopup(item) {
 item.classList.remove('popup_open');

};

function openPopup(item) {
  item.classList.add('popup_open');
}

function openPopupPreview(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupFigcaption.textContent = item.name;
  openPopup(popupWindow);
}

function deleteElement(event) {
  event.target.closest(".element").remove();
};

function handleAddSubmit(event) {
  event.preventDefault();
  

  initCards({
    name: placeTitleInput.value,
    link: placeSubtitleInput.value
  });
  closePopup(addPopup);
  addForm.reset();
};

function editForm (event) {
  event.preventDefault();
  authorName.textContent = titleInput.value;
  authorAbout.textContent = subtitleInput.value;
  closePopup(popup);
  profileForm.reset();
};

editClose.addEventListener('click', function() {closePopup(popup)});
addClose.addEventListener('click', function() {closePopup(addPopup)});
owerviewClose.addEventListener('click', function() {closePopup(popupWindow)});


addButton.addEventListener("click", function () {
  openPopup(addPopup)
});

addForm.addEventListener('submit', handleAddSubmit);

profileForm.addEventListener('submit', editForm);

editButton.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  openPopup(popup);
});

document.addEventListener('keydown', function(evt){
  if (evt.key === 'Escape') {
    const popupOpenClose = document.querySelector(".popup_open");
    closePopup(popupOpenClose); 
  }
  else if(evt.key === 'click'){
    closePopup(popupOpenClose); 
  }
})

document.addEventListener('mousedown', function (evt) {
  if(evt.target.classList.contains("popup_open")){
    const popupOpenClose = document.querySelector(".popup_open");
    closePopup(popupOpenClose); }
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input_error',
  errorClass: '.popup__error-message'
});





