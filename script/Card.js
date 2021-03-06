import { popupImg, popupFigcaption, imgSrc } from '../utils/constants.js';
import { popupToggle } from '../pages/index.js';

export default class Card {
    constructor(data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }
    //метод выбора шаблона карточки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return cardElement;
    }

    // приватный метод переключения лайка
    _actionLike() {
        this._element.querySelector('.place__like').classList.toggle('place__like_active');
    }

    // приватный метод удаления карточки
    _deleteCard() {
        this._element.querySelector('.place__trash').closest('.place').remove();
        this._element.querySelector('.place__like').removeEventListener('click', this._actionLike);
        this._element.querySelector('.place__trash').removeEventListener('click', this._deleteCard);
        this._element.querySelector('.place__photo').removeEventListener('click', this._openFullImg);
    }

    // приватный метод открытия попапа с полным изображением
    _openFullImg() {
        const cardImageElement = this._element.querySelector('.place__photo');
        imgSrc.src = cardImageElement.src;
        imgSrc.alt = cardImageElement.alt;
        popupFigcaption.textContent = cardImageElement.alt;
        popupToggle(popupImg);
    }
    // установка слушателей 
    _setEventListeners() {
        // настройка переключения лайка 
        this._element.querySelector('.place__like').addEventListener('click', () => { this._actionLike() });
        // настройка удаления карточки 
        this._element.querySelector('.place__trash').addEventListener('click', () => { this._deleteCard() });
        // настройка открытия попапа с полным изображением 
        this._element.querySelector('.place__photo').addEventListener('click', () => { this._openFullImg() });
    }

    // публичный метод заполнения карточки данными
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardImageElement = this._element.querySelector('.place__photo');
        cardImageElement.src = this._link;
        cardImageElement.alt = this._name;
        this._element.querySelector('.place__photo-name').textContent = this._name;
        return this._element;
    }
}

