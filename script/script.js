const elements = document.querySelector('.elements');
const buttonEdit = document.querySelector('.profile__edit'); //кнопка редактирования профиля
const buttonAdd = document.querySelector('.profile__add'); //кнопка добавления карточки
const popup = document.querySelector('.popup'); //попап
const popupEdit = document.querySelector('.popup_edit'); //попап редакттирования профиля
const popupAdd =document.querySelector('.popup_add'); //поппап добавления карточки
const popupImg = document.querySelector('.popup_image'); //попап отображения полного изображения
const containerEdit = document.querySelector('.popup__container_edit'); //окошко попапа профиля
const containerAdd= document.querySelector('.popup__container_add'); //окошко попапа добавления карточки
const buttonClose = document.querySelector('.popup__close'); //кнопка закрытия
const buttonCloseEdit = document.querySelector('.popup__close_edit-window');
const buttonCloseAdd = document.querySelector('.popup__close_add-window');
const buttonCloseImage = document.querySelector('.popup__close_full-image');
const titleElemet = document.querySelector('.element__photo-name'); //название изображения
const urlElement = document.querySelector('.element__photo'); // само изображение
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
//функция создания карточки
function createCard(item) {
    const imageTemplate = document.querySelector('#image').content;
// клонируем содержимое тега template
    const cloneCard = imageTemplate.cloneNode(true);
// наполняем содержимым
    cloneCard.querySelector('.element__photo').src = item.link;
    cloneCard.querySelector('.element__photo-name').textContent = item.name;
    cloneCard.querySelector('.element__photo').alt = item.name; 
//добавляем like
    const like = cloneCard.querySelector('.element__like');
    like.addEventListener('click', function () {
    like.classList.toggle('element__like_active');
    });
//удалить карточку
    const buttonDelete = cloneCard.querySelector('.element__trash');
    buttonDelete.addEventListener('click', function(){
        buttonDelete.parentElement.remove();
});
//открыть Full изоражение
cloneCard.querySelector('.element__photo').addEventListener('click', openFullImg);
// отображаем на странице
    elements.append(cloneCard);

    return cloneCard;
};

// Формируем массив карт
function addCards(cards) {
    return cards.map((item) => createCard(item));
  }
// берем массив для отображения на странице
  function publicCards(cards) {
    elements.prepend(...cards);
  }

  //переключение класса скрытия/открытия попап
  function popupToggle(popItem) {
    // проверяем, что это форма Edit
    if (popItem.classList.contains('popup_edit')){
      // подставляем значения
      popupName.value = nameValue.textContent;
      popupJob.value = jobValue.textContent;
  }
    // проверяем, что это форма Add
    if (popItem.classList.contains('popup_add')){
      // очищаем значения полей 
      titleValue.value = '';
      urlValue.value = '';
    }
    // переключаем классы
    popItem.classList.toggle('popup_opened');
  }

//открыть попап с полным изображением
function openFullImg(evt){
    imgSrc.src = evt.target.src;
    imgSrc.alt = evt.target.alt;
    popupFigcaption.textContent = evt.target.alt;
    popupImg.classList.add('popup_opened');
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
    const newCard = createCard({name: titleValue.value, link: urlValue.value});
    publicCards([newCard]); // добавляем карточку в разметку
    popupToggle(popupAdd);
}

//слушатель открытия попап Edit
buttonEdit.addEventListener('click', function(evt){
    popupToggle(popupEdit);
});
//слушатель открытия попап Add
buttonAdd.addEventListener('click', function(evt){
    popupToggle(popupAdd);
});
//слушатель закрытия попап
buttonCloseEdit.addEventListener('click', function (evt){
    popupToggle(popupEdit);
});
//слушатель закрытия попап
buttonCloseAdd.addEventListener('click', function (evt){
    popupToggle(popupAdd);
});
//слушатель закрытия попап
buttonCloseImage.addEventListener('click',function (evt){
    popupToggle(popupImg);
});

//слушатель отправки формы
save.addEventListener('submit', formSubmitEditHandler);
//слушатель добавления карочки
create.addEventListener('submit', formSubmitAddHandler);

//добавляем карточки при загрузке
publicCards(addCards(initialCards));
