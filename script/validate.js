const settingsObject = {
formSelector: '.popup__container',
inputSelector: '.popup__input',
submitButtonSelector: '.popup__submit',
inactiveButtonClass: 'popup__submit_inactive',
inputErrorClass: 'popup__input_error',
errorClass: 'popup__input-error'
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, formInput, errorMessage, obj) => {
    const formError =  formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(obj.inputErrorClass);
   // Заменим содержимое span с ошибкой на переданный параметр
   formError.textContent = errorMessage;
   formError.classList.add(obj.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput, obj) => {
    const formError =  formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(obj.inputErrorClass);
  formError.classList.remove(obj.errorClass);
  // Очистим ошибку
  formError.textContent = '';
};

//функция отображения ошибок при открытии формы
function checkInputOpenedForm(inputList, formElement){
    inputList.forEach((formInput) => {
        hideInputError(formElement, formInput, obj);
    });
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, formInput, obj) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput,  formInput.validationMessage, obj);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, formInput, obj);
  }
};

//функция обходит массив поей для проверки каждого на валидность
  const hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  };

//функция для смены состояния кнопки
  const toggleButtonState = (inputList, buttonElement, obj) => {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add(obj.inactiveButtonClass);
       }
    else{
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  };

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((formInput) => {
        formInput.addEventListener('input', function () {
        checkInputValidity(formElement, formInput, obj);
        toggleButtonState(inputList, buttonElement, obj);
      });
    });
  };

  const enableValidation = (obj) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, obj);
    });
  };
  
  // Вызовем функцию
  enableValidation(settingsObject);
