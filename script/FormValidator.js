export class FormValidator {
    constructor(settingsObject, formElement) {
      this._settingsObject = settingsObject;
      this._formElement = formElement;
    }
  
    // приватный метод отображения ошибок валидации
    _showInputError(formElement, formInput, errorMessage, settingsObject) {
      const formError = formElement.querySelector(`#${formInput.id}-error`);
      formInput.classList.add(settingsObject.inputErrorClass);
      formError.textContent = errorMessage;
      formError.classList.add(settingsObject.errorClass);
    }
  
    // публичный метод скрытия ошибок валидации
    _hideInputError(formElement, formInput, settingsObject) {
      const formError = formElement.querySelector(`#${formInput.id}-error`);
      formInput.classList.remove(settingsObject.inputErrorClass);
      formError.classList.remove(settingsObject.errorClass);
      // Очистим ошибку
      formError.textContent = '';
    }
  
    // приватный метод проверяет formInput на корректность введённых данных и вызывает hideError/showError
    _checkInputValidity(formElement, formInput, settingsObject) {
      if (!formInput.validity.valid) {
        this._showInputError(formElement, formInput, formInput.validationMessage, settingsObject);
      } else {
        this._hideInputError(formElement ,formInput, settingsObject);
      }
    }
  
    // приватный метод обходит массив полей для проверки их валидности
    _hasInvalidInput(inputList) {
      // проходим по этому массиву методом some
      return inputList.some((formInput) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся фунцкция
        // hasInvalidInput вернёт true
        return !formInput.validity.valid;
      })
    }
  
    // приватный метод принимает массив полей ввода
    // и элемент формы, содержащий кнопку, состояние которой нужно поменять
    _toggleButtonState(inputList, buttonElement, settingsObject) {
      // Если есть хотя бы один невалидный инпут
      if (this._hasInvalidInput(inputList)) {
      // делаем кнопку неактивной
      buttonElement.classList.add(settingsObject.inactiveButtonClass);
      } else {
      // иначе делаем кнопку активной
      buttonElement.classList.remove(settingsObject.inactiveButtonClass);
      }
    }
  
    // установка слушателей
    _setEventListeners(formElement, settingsObject) {
      // Находим все поля внутри формы, делаем из них массив
      const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
      const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
      // Проверяем состояние кнопки при первой загрузке страницы
      this._toggleButtonState(inputList, buttonElement, settingsObject);
      // toggleButtonState(inputList, formElement);
      // Обойдем все элементы полученной коллекции
      inputList.forEach((formInput) => {
      // каждому полю добавим обработчик события input
      formInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(formElement, formInput, settingsObject);
        // Проверка состояния кнопки при каждом изменении символа в любом из полей
        this._toggleButtonState(inputList, buttonElement, settingsObject);
        });
      });
    }
  
    // публичный метод включения валидации формы
    enableValidation() {
      // Для формы вызовем функцию setEventListeners
      this._setEventListeners(this._formElement, this._settingsObject);
    }
  }
  