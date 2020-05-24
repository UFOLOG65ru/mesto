const placesList = document.querySelector('.places-list');// контейнер для размещения карточек 
const buttonEdit = document.querySelector('.profile__edit'); //кнопка редактирования профиля
const popup = document.querySelector('.popup');// оверей попапа
const buttonAdd = document.querySelector('.profile__add'); //кнопка добавления карточки
const submitAdd = document.querySelector('.popup__submit_add');// кнопка отправки формы карточки
const submitEdit = document.querySelector('.popup__submit_edit');// кнопка отправки формы профиля
const popupEdit = document.querySelector('.popup_edit'); //попап редакттирования профиля
const popupAdd =document.querySelector('.popup_add'); //поппап добавления карточки
const popupImg = document.querySelector('.popup_image'); //попап отображения полного изображения
const buttonCloseEdit = document.querySelector('.popup__close_edit-window');//кнопка закрытия попапа редакирования
const buttonCloseAdd = document.querySelector('.popup__close_add-window');//кнопка закрытия попапа добавления
const buttonCloseImage = document.querySelector('.popup__close_full-image');//кнопка закрытия попапа полноо изображения
const imgSrc = document.querySelector('.popup__full-window');// изображение , открытое на полную страниицу
const nameValue = document.querySelector('.profile__name'); // отображение имени в профиле
const jobValue = document.querySelector('.profile__job'); //отображение профессии в профиле
const titleValue = document.querySelector('.popup__input_title'); //значение поля Название
const urlValue = document.querySelector('.popup__input_url'); //значение поля Ссылка на картинку
const popupName =document.querySelector('.popup__input_name'); //значение поля Введите имя
const popupJob = document.querySelector('.popup__input_job'); //значение поля Введите род деятельности
const save = document.querySelector('.popup__container_edit'); // отправка формы редактирования
const create =document.querySelector('.popup__container_add'); // отправка формы добавления
const popupFigcaption = document.querySelector('.popup__figcaption'); //подпись полного изображения
const imageTemplate = document.querySelector('#image').content; //шаблон карточки
const inputsEditForm  = Array.from(save.querySelectorAll('.popup__input'));
const inputAddForm = Array.from(create.querySelectorAll('.popup__input'));
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

//создаем функционал карточек
//функция лайка
function actionLike(evt){
    evt.target.classList.toggle('place__like_active');
}
//открыть попап с полным изображением
function openFullImg(evt){
    imgSrc.src = evt.target.src;
    imgSrc.alt = evt.target.alt;
    popupFigcaption.textContent = evt.target.alt;
    popupToggle(popupImg);
}
//функция удаления карточки
function deleteCard(evt){
    const currentСard = evt.target.closest('.place');
    currentСard.querySelector('.place__like').addEventListener('click', actionLike);
    currentСard.querySelector('.place__trash').addEventListener('click', deleteCard);
    currentСard.querySelector('.place__photo').addEventListener('click', openFullImg);
    currentСard.remove();
}
//функция создания карточки
function createCard(item) {
    
// клонируем содержимое тега template
    const cloneCard = imageTemplate.cloneNode(true);
    const  cardImage = cloneCard.querySelector('.place__photo');
// наполняем содержимым
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cloneCard.querySelector('.place__photo-name').textContent = item.name;
//добавляем like
    cloneCard.querySelector('.place__like').addEventListener('click', actionLike);
//удалить карточку
    cloneCard.querySelector('.place__trash').addEventListener('click', deleteCard);
//открыть Full изоражение
    cardImage.addEventListener('click', openFullImg);
    return cloneCard;
};

// Формируем массив карт
function addCards(cards) {
    return cards.map((item) => createCard(item));
  }
// берем массив для отображения на странице
  function publicCards(cards) {
    placesList.prepend(...cards);
  }

  //переключение класса скрытия/открытия попап
  function popupToggle(popItem) {
      if((popItem.classList.contains('popup__container_edit')) && (!popItem.classList.contains('popup_opened'))){
        openPopupEdit();
        checkInputOpenedForm(inputsEditForm, save);
        toggleButtonState(inputsEditForm, buttonElement, obj);
      }
      if((popItem.classList.contains('popup__container_add')) && (!popItem.classList.contains('popup_opened'))){
        checkInputOpenedForm(inputsAddForm, create);
        toggleButtonState(inputAddForm, buttonElement, obj);
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
    toggleButtonState(inputsEditForm, submitEdit, obj);
}
//отправка формы Add
function formSubmitAddHandler (evt){
    evt.preventDefault(); 
    const newCard = createCard({name: titleValue.value, link: urlValue.value});
    publicCards([newCard]); // добавляем карточку в разметку
    popupToggle(popupAdd);
    toggleButtonState(inputsAddForm, submitAdd, obj);
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
publicCards(addCards(initialCards));
