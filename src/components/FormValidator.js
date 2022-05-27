export  class FormValidator {
  constructor(data, formElement) {

      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._errorClass = data.errorClass;
      this._formElement = formElement;

      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {

      this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      
      inputElement.classList.add(this._inputErrorClass);
      this._errorElement.classList.add(this._errorClass);
     
      this._errorElement.textContent = errorMessage;
      
  }

  _hideInputError(inputElement) {

      this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      
      inputElement.classList.remove(this._inputErrorClass);
      this._errorElement.textContent = '';
     
  }

  _checkInputValidity(inputElement) {
    
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
          console.log('invalid')
      } else {
        console.log('valid')
          this._hideInputError(inputElement);
      }
  }

  _setEventListener() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
          });
      });
  }

  resetErrors() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    }

  enableValidation() {
      this._setEventListener();
  }

  _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      })
  };

  _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.setAttribute("disabled", "disabled");
      } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.removeAttribute("disabled");
      }
  };
}











/*export default class FormValidator {
    constructor(config, formElement) {
      console.log(formElement);
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
       
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        console.log(this._config.submitButtonSelector);
      }
      // добавление класса с ошибкой
      _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
      };
    
      // удаление класса с ошибкой
      _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
      };
    
      // добавление или удаление текста ошибки в зависимости от валидности поля ввода
      _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      };
    
      // проверка валидность поля ввода
      _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      };
    
      // отключение/включение кнопки submit
      toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
          
          this._buttonElement.removeAttribute('disabled');
          console.log(this._buttonElement);
        }
      };
    
      // метод с хэндерами
      _setEventListeners() {
        this.toggleButtonState();
    
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this.toggleButtonState();
          });
        });
    
        this._formElement.addEventListener('submit', (event) => {
          event.preventDefault();
        })
      };
    
      // валидация формы
      enableValidation() {
        this._setEventListeners();
      };
}*/