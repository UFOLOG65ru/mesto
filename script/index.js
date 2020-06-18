import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const placesList = document.querySelector('.places-list');// контейнер для размещения карточек 
const buttonEdit = document.querySelector('.profile__edit'); //кнопка редактирования профиля
const buttonAdd = document.querySelector('.profile__add'); //кнопка добавления карточки

const popupEdit = document.querySelector('.popup_edit'); //попап редакттирования профиля
const popupAdd =document.querySelector('.popup_add'); //поппап добавления карточки
export const popupImg = document.querySelector('.popup_image'); //попап отображения полного изображения
const buttonCloseEdit = document.querySelector('.popup__close_edit-window');//кнопка закрытия попапа редакирования
const buttonCloseAdd = document.querySelector('.popup__close_add-window');//кнопка закрытия попапа добавления
const buttonCloseImage = document.querySelector('.popup__close_full-image');//кнопка закрытия попапа полноо изображения
export const imgSrc = document.querySelector('.popup__full-window');// изображение , открытое на полную страниицу
const nameValue = document.querySelector('.profile__name'); // отображение имени в профиле
const jobValue = document.querySelector('.profile__job'); //отображение профессии в профиле
const titleValue = document.querySelector('.popup__input_title'); //значение поля Название
const urlValue = document.querySelector('.popup__input_url'); //значение поля Ссылка на картинку
const popupName =document.querySelector('.popup__input_name'); //значение поля Введите имя
const popupJob = document.querySelector('.popup__input_job'); //значение поля Введите род деятельности
const save = document.querySelector('.popup__container_edit'); // отправка формы редактирования
const create =document.querySelector('.popup__container_add'); // отправка формы добавления
export const popupFigcaption = document.querySelector('.popup__figcaption'); //подпись полного изображения

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
const formEditValid = new FormValidator(settingsObject, save);
formEditValid.enableValidation();
const formAddValid = new FormValidator(settingsObject, create);
formAddValid.enableValidation();

    
  //переключение класса скрытия/открытия попап
 export function popupToggle(popItem) {
      if((popItem.classList.contains('popup__container_edit')) && (!popItem.classList.contains('popup_opened'))){
        openPopupEdit();
      }
      if((popItem.classList.contains('popup__container_add')) && (!popItem.classList.contains('popup_opened'))){
      }
      // установка/снятие слушателей закрытия клавишей и кликом при открытии/ закрытии формы
      toggleEvent(popItem);
    // переключаем классы
    popItem.classList.toggle('popup_opened');
  }

//функция находит какая именно форма сейчас открыта
function openedForm(evt){
    const openedFormElement = document.querySelector('.popup_opened');
    closeEsc(evt, openedFormElement);

}
  //функция закрытия попап через ESC
  function closeEsc (evt, formElement){
    if ((evt.target.classList.contains('popup')) || (evt.key === 'Escape')) {
        popupToggle(formElement);
      }
}

function toggleEvent (popupElement){
    if(!popupElement.classList.contains('popup_opened')){
        //ставим слушатели закрытия кликом или клавишей
         document.addEventListener('click', openedForm);
         document.addEventListener('keydown', openedForm)
    }
    else{
        //снмаем слушатели
        document.removeEventListener('click', openedForm);
         document.removeEventListener('keydown', openedForm)
    }
   
}

  function openPopupEdit(){
    popupName.value = nameValue.textContent;
    popupJob.value = jobValue.textContent;
    popupToggle(popupEdit);
  }

  function openPopuAdd(){
    titleValue.value = '';
    urlValue.value = '';
    popupToggle(popupAdd);
  }

//отправка формы Edit
function formSubmitEditHandler (evt) {
    evt.preventDefault();
    nameValue.textContent = popupName.value;
    jobValue.textContent = popupJob.value;
    popupToggle(popupEdit);
}

//отправка формы Add
function formSubmitAddHandler (evt){
    evt.preventDefault(); 
    const newCard = new Card({name: titleValue.value, link: urlValue.value}, '#image');
    const userCard = newCard.generateCard();
    // добавляем карточку в разметку
    placesList.prepend(userCard);
    popupToggle(popupAdd);
}

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
save.addEventListener('submit', formSubmitEditHandler);
//слушатель добавления карочки
create.addEventListener('submit', formSubmitAddHandler);

//добавляем карточки при загрузке
initialCards.forEach((item) => {
    const card = new Card(item, '#image');
    const  cardElement = card.generateCard();
    placesList.prepend(cardElement);
})

