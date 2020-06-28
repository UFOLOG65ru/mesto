import  { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
	constructor({ popSelector, closeButtonSelector, handleFormSubmit }) {
    super(popSelector, closeButtonSelector);
    this._popSelector = document.querySelector(popSelector);
    this._popupCloseButton = document.querySelector(closeButtonSelector);
    this._handleFormSubmit = handleFormSubmit; // функция-колбэк
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popSelector.querySelectorAll('.popup__input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объет значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  // публичный метод добавления слушателей
  setEventListeners() {
    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => super._popupToggle());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => super._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => super._handleEscClose(evt));
    // обработчик сабмита формы
    this._popSelector.addEventListener('submit', (evt) => {
      evt.preventDefault(); 
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());

      // тоглим форму
      super._popupToggle();
    });
  }

  // публичный метод закрытия попапа
  closePopup() {
    super._popupToggle();
    this._popSelector.reset();
  }
}
