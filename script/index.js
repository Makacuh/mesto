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
const addPopup = document.querySelector(".popup_type_place");
const placeTitleInput = addPopup.querySelector("#element-name");
const placeSubtitleInput = addPopup.querySelector("#element-link");
const addForm = addPopup.querySelector(".popup__form-add-element");
const placeTemplate = document.querySelector(".element-template").content;
const placesBox = document.querySelector(".elements");
const popupWindow = document.querySelector(".popup_window");
const elementTitle = document.querySelectorAll(".element__title");
const popupImage = popupWindow.querySelector(".popup__image");



function createElement(item) {
  const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
  const elementFigcaption = popupWindow.querySelector(".popup__figcaption");
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
  initialCards.forEach(function (item) {
    initCards(item);
  });
};

initElements();

function initCards(item) {
  renderElement(createElement(item));
}

function renderElement(element) {
  const elements = document.querySelector(".elements");

  elements.prepend(element);
}

function closePopup(event) {
  const close = event.target.closest(".popup");
  close.classList.remove('popup_open');

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

  closePopup(event);
  addForm.reset();
};

popupClose.forEach((closeItem) => {
  closeItem.addEventListener('click', closePopup);
});

addButton.addEventListener("click", function () {
  openPopup(addPopup)
});

addForm.addEventListener('submit', handleAddSubmit);

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  authorName.textContent = titleInput.value;
  authorAbout.textContent = subtitleInput.value;
  closePopup(event);
  profileForm.reset();
});

editButton.addEventListener("click", function () {
  titleInput.value = authorName.textContent;
  subtitleInput.value = authorAbout.textContent;
  openPopup(popup);
});
/*

const showInputError = (formElement,inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error-message_active');
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
  
  const toggleButtonState = (inputList,buttonElement) => {
    if(hasInvalidInput(inputList)) {buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  } 
  }
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement);    
    });
  };
  
  enableValidation();

*/

const showInputError = (formElement,inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error-message_active');
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

const toggleButtonState = (inputList,buttonElement) => {
  if(hasInvalidInput(inputList)) {buttonElement.classList.add('popup__button_disabled');
} else {
  buttonElement.classList.remove('popup__button_disabled');
} 
}


const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      inputErrorClass,
      errorClass
    );
  });
};
enableValidation({
  formSelector: 'popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active',
});
