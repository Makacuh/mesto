
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