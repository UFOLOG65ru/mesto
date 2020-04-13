const buttonEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');
let nameValue = document.querySelector('.profile__name');
let jobValue = document.querySelector('.profile__job');
let popupName =document.querySelector('.popup__input_name'); 
let popupJob = document.querySelector('.popup__input_job');
let save = document.querySelector('.popup__container');

//Открыть popup 
function open(){
    popup.classList.add('popup_opened');
    popupName.value = nameValue.textContent;
    popupJob.value = jobValue.textContent;
}

//Закрыть popup
function close(){
    popup.classList.remove('popup_opened');
}

//отправка формы
function formSubmitHandler (evt) {
    evt.preventDefault();

    nameValue.textContent = popupName.value;
    jobValue.textContent = popupJob.value;
    close();
}

//слушатель открытия попап
buttonEdit.addEventListener('click', open);

//слушатель закрытия попап
buttonClose.addEventListener('click', close);

//слушатель отправки формы
save.addEventListener('submit', formSubmitHandler);