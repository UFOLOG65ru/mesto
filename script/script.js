const buttonEdit = document.querySelector('.profile__edit');
const buttonAdd = document.querySelector('.profile__add');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd =document.querySelector('.popup_add');
const containerEdit = document.querySelector('.popup__container_edit');
const containerAdd= document.querySelector('.popup__container_add');
const buttonClose = document.querySelector('.popup__close');
const titleElemet = document.querySelector('.element__photo-name');
const urlElement = document.querySelector('.element__photo');
let nameValue = document.querySelector('.profile__name');
let jobValue = document.querySelector('.profile__job');
let titleValue = document.querySelector('.popup__input_title');
let urlValue = document.querySelector('.popup__input_url');
let popupName =document.querySelector('.popup__input_name'); 
let popupJob = document.querySelector('.popup__input_job');
let save = document.querySelector('.popup__container_edit');
let create =document.querySelector('.popup__container_add');

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
//добавляем карточки при загрузке
function addCard(item) {
    const imageTemplate = document.querySelector('#image').content;
    const elements = document.querySelector('.elements');
// клонируем содержимое тега template
    const cloneCard = imageTemplate.cloneNode(true);
// наполняем содержимым
    cloneCard.querySelector('.element__photo').src = item.link;
    cloneCard.querySelector('.element__photo-name').textContent = item.name;
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
// отображаем на странице
    elements.append(cloneCard);
    return cloneCard;
};

initialCards.forEach(addCard);

//Открыть popup Edit 
function openEdit(){
    popupEdit.classList.add('popup_opened');
    popupName.value = nameValue.textContent;
    popupJob.value = jobValue.textContent;
}

//открыть popup Add
function openAdd(){
    popupAdd.classList.add('popup_opened');
}

//Закрыть popup
function close(){
    popup.classList.remove('popup_opened');
}           

//отправка формы
function formSubmitEditHandler (evt) {
    evt.preventDefault();
    nameValue.textContent = popupName.value;
    jobValue.textContent = popupJob.value;
    close();
}

function newCard(){
    const imageTemplate = document.querySelector('#image').content;
    const elements = document.querySelector('.elements');
// клонируем содержимое тега template
    const cloneCard = imageTemplate.cloneNode(true);
// наполняем содержимым
    cloneCard.querySelector('.element__photo').src = item.link;
    cloneCard.querySelector('.element__photo-name').textContent = item.name;
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
// отображаем на странице
    elements.append(cloneCard);
    return cloneCard;
}

function formSubmitAddHandler (evt){
    evt.preventDefault(); 
    titleElemet.textContent = titleValue.value;
    urlElement.textContent = urlValue.value;

    close();
}

//слушатель открытия попап Edit
buttonEdit.addEventListener('click', openEdit);
//слушатель открытия попап Add
buttonAdd.addEventListener('click', openAdd);
//слушатель закрытия попап
buttonClose.addEventListener('click', close);
//слушатель отправки формы
save.addEventListener('submit', formSubmitEditHandler);
//слушатель добавления карочки
create.addEventListener('submit', formSubmitAddHandler);