import { Popup } from './Popup.js';
import { imgSrc, popupFigcaption } from './index.js'


export class PopupWithImage extends Popup {
	constructor({ popSelector, closeButtonSelector }) {
    super(popSelector, closeButtonSelector);
    this._popSelector = document.querySelector(popSelector);
    this._popupCloseButton = document.querySelector(closeButtonSelector);
  }

  // публичный метод добавления слушателей
  setEventListeners() {
    // слушатель клика кнопки закрытия попапа
    this._popupCloseButton.addEventListener('click', () => super._popupToggle());
    // слушатель ~Esc
    document.addEventListener('keydown', (evt) => super._handleEscClose(evt));
    // слушатель ~Overlay
    document.addEventListener('click', (evt) => super._handleEscClose(evt));
  }

  // публичный метод открытия попапа
  openPopup (cardImageElement) {
    // вставляем в попап картинку и атрибут src изображения
    // console.log(cardImageElement);
    imgSrc.src = cardImageElement.src;
    imgSrc.alt = cardImageElement.alt;
    popupFigcaption.textContent = cardImageElement.alt;
    // тоглим попап
    super._popupToggle();
  }
}