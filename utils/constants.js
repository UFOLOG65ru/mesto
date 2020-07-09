export const placeContainer = '.places-list'; //селектор контейнера для размещения карточек 
export const buttonEdit = document.querySelector('.profile__edit'); //кнопка редактирования профиля
export const saveButtonEdit = document.querySelector('.popup__submit_edit');
export const saveButtonAdd = document.querySelector('.popup__submit_add');
export const buttonAdd = document.querySelector('.profile__add'); //кнопка добавления карточки
export const popupEdit = document.querySelector('.popup_edit'); //попап редакттирования профиля
export const popupAdd = document.querySelector('.popup_add'); //поппап добавления карточки
export const popupImg = document.querySelector('.popup_image'); //попап отображения полного изображения
export const buttonCloseEdit = document.querySelector('.popup__close_edit-window');//кнопка закрытия попапа редакирования
export const buttonCloseAdd = document.querySelector('.popup__close_add-window');//кнопка закрытия попапа добавления
export const buttonCloseImage = document.querySelector('.popup__close_full-image');//кнопка закрытия попапа полноо изображения
export const imgSrc = document.querySelector('.popup__full-window');// изображение , открытое на полную страниицу
export const nameValue = document.querySelector('.profile__name'); // отображение имени в профиле
export const jobValue = document.querySelector('.profile__job'); //отображение профессии в профиле
export const titleValue = document.querySelector('.popup__input_title'); //значение поля Название
export const urlValue = document.querySelector('.popup__input_url'); //значение поля Ссылка на картинку
export const popupName = document.querySelector('.popup__input_name'); //значение поля Введите имя
export const popupJob = document.querySelector('.popup__input_job'); //значение поля Введите род деятельности
export const submitEdit = document.querySelector('.popup__container_edit'); // отправка формы редактирования
export const submitAdd = document.querySelector('.popup__container_add'); // отправка формы добавления
export const popupFigcaption = document.querySelector('.popup__figcaption'); //подпись полного изображения

//исходный массив
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const settingsObject = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error'
};