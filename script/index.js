import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


const placesList = '.places-list';// контейнер для размещения карточек 
const buttonEdit = document.querySelector('.profile__edit'); //кнопка редактирования профиля
const saveButtonEdit = document.querySelector('.popup__submit_edit');
const saveButtonAdd = document.querySelector('.popup__submit_add');
const buttonAdd = document.querySelector('.profile__add'); //кнопка добавления карточки
export const popupImg = document.querySelector('.popup_image'); //попап отображения полного изображения
const buttonCloseEdit = document.querySelector('.popup__close_edit-window');//кнопка закрытия попапа редакирования
const buttonCloseAdd = document.querySelector('.popup__close_add-window');//кнопка закрытия попапа добавления
const buttonCloseImage = document.querySelector('.popup__close_full-image');//кнопка закрытия попапа полноо изображения
export const imgSrc = document.querySelector('.popup__full-window');// изображение , открытое на полную страниицу
export const nameValue = document.querySelector('.profile__name'); // отображение имени в профиле
export const jobValue = document.querySelector('.profile__job'); //отображение профессии в профиле
const titleValue = document.querySelector('.popup__input_title'); //значение поля Название
const urlValue = document.querySelector('.popup__input_url'); //значение поля Ссылка на картинку
const popupName = document.querySelector('.popup__input_name'); //значение поля Введите имя
const popupJob = document.querySelector('.popup__input_job'); //значение поля Введите род деятельности
const submitEdit = document.querySelector('.popup__container_edit'); // отправка формы редактирования
const submitAdd = document.querySelector('.popup__container_add'); // отправка формы добавления
export const popupFigcaption = document.querySelector('.popup__figcaption'); //подпись полного изображения
const inputsEditForm = Array.from(submitEdit.querySelectorAll('.popup__input'));
const inputsAddForm = Array.from(submitAdd.querySelectorAll('.popup__input'));
//исходный массив
const initialCards = [
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

// Для каждой проверяемой формы создаем экземпляр класса
// и вызываем метод enableValidation
const formEditValid = new FormValidator(settingsObject, submitEdit);
formEditValid.enableValidation();
const formAddValid = new FormValidator(settingsObject, submitAdd);
formAddValid.enableValidation();

// Функция скрытия ошибок валидации при открытии формы
function checkInputOpenedForm(inputList, formElement, formValid) {
    inputList.forEach((inputElement) => {
        formValid.hideInputError(formElement, inputElement, settingsObject);
    });
}

const newUserInfo = new UserInfo({
    userName: popupName,
    aboutInfo: popupJob
  });

//функция открытия и наполнения информацией формы профиля
function openPopupEdit() {
    newUserInfo.getUserInfo();
    checkInputOpenedForm(inputsEditForm, submitEdit, formEditValid);
    // делаем кнопку активной при открытии
    saveButtonEdit.classList.remove(settingsObject.inactiveButtonClass);
    popupEdit.Popup.openPop();
}



//функция открытия попапа формы добавления карточки со сбросом нформации полей
function openPopuAdd() {
    titleValue.value = '';
    urlValue.value = '';

    // проводим валидацию полей ввода формы "создания карточки"
    checkInputOpenedForm(inputsAddForm, submitAdd, formAddValid);
    popupAdd.Popup.openPop();
}

export const popupImage = new PopupWithImage({
    formSelector: '.popup_image',
    closeButtonSelector: '.popup__close_full-image'
});
popupImage.setEventListeners();

const popupEdit = new PopupWithForm({
    formSelector: '.popup_edit',
    closeButtonSelector: '.popup__close_edit-window',
    // объект, который мы передадим при вызове handleFormSubmit
    // окажется на месте параметра formData
    handleFormSubmit: (formData) => {
        newUserInfo.setUserInfo(formData);
    }
});
popupEdit.setEventListeners();


const popupAdd = new PopupWithForm({
    formSelector: '.popup_add',
    closeButtonSelector: '.popup__close_add-window',
    handleFormSubmit: (formData) => {
        // создаем, наполняем данными и публикуем новую карточку 
        const newCard = new Section({
            data: [{ name: formData.place, link: formData.url }],
            renderer: (item) => {
                const card = new Card(item, '#image');
                const cardElement = card.generateCard();
                newCard.setItem(cardElement);
            },
        },
            placesList
        );
        // отрисовка карточек 
        newCard.renderItems();
    }
});
popupAdd.setEventListeners();

//слушатель открытия попап Edit
buttonEdit.addEventListener('click', () => openPopupEdit());
//слушатель открытия попап Add
buttonAdd.addEventListener('click', () => openPopuAdd());
//слушатель закрытия попап
buttonCloseEdit.addEventListener('click', () => popupToggle(popupEdit));
//слушатель закрытия попап
buttonCloseAdd.addEventListener('click', () => popupToggle(popupAdd));
//слушатель закрытия попап
buttonCloseImage.addEventListener('click', () => popupToggle(popupImg));
//слушатель отправки формы
submitEdit.addEventListener('submit', formSubmitEditHandler);
//слушатель добавления карочки
submitAdd.addEventListener('submit', formSubmitAddHandler);

//добавляем карточки при загрузке
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#image');
        const cardElement = card.generateCard();
        cardsList.setItem(cardElement);
    },
},
    placesList
);

// отображение карточек
cardsList.renderItems();