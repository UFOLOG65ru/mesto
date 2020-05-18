// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, formInput, errorMessage) => {
    const formError =  formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.add('popup__input_error');
   // Заменим содержимое span с ошибкой на переданный параметр
   formError.textContent = errorMessage;
   formError.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput) => {
    const formError =  formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove('popup__input_error');
  formError.classList.remove('form__input-error_active');
  // Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput,  formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit');
   

    inputList.forEach((formInput) => {
        formInput.addEventListener('input', function () {
        checkInputValidity(formElement, formInput);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add('popup__submit_inactive');
       }
    else{
      buttonElement.classList.remove('popup__submit_inactive');
    }
  }

  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__container'));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation();
