export  class Popup {
    constructor({ popSelector, closeButtonSelector }) {
        this._popSelector = popSelector;
        this._popupCloseButton = document.querySelector(closeButtonSelector);
    }
    //переключение  скрытия/открытия попап
    _popupToggle() {
        this._popSelector.classList.toggle('popup_opened');
    }
    // публичный метод открытия попапа
    openPop() {
        this._popupToggle();
    }
    // публичный метод закрытия попапа
    closePop() {
        this._popupToggle();
    }
    //метод закрытия попап через ESC / оверлей
    _handleEscClose(evt) {
        if ((this._popSelector.classList.contains('popup_opened')) &&
            ((evt.target.classList.contains('popup')) || (evt.key === 'Escape'))) {
            this._popupToggle();
        }
    }

    setEventListeners() {
        // слушатель клика кнопки закрытия попапа
        this._popupCloseButton.addEventListener('click', () => this._togglePopup());
        // слушатель Esc
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        // слушатель оверлей
        document.addEventListener('click', (evt) => this._handleEscClose(evt));
    }

}
