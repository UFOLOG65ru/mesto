const buttonEdit = document.querySelector('.profile__button_edit');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');
let nameValue = document.querySelector('.info__name');
let jobValue = document.querySelector('.info__job');
let popupName =document.querySelector('.popup__name'); 
let popupJob = document.querySelector('.popup__job');

//Открыть popup 
buttonEdit.addEventListener('click', function(){
    popup.classList.add('popup_opened');
    popupName.value = nameValue.textContent;
    popupJob.value = jobValue.textContent;
});

//Закрыть popup
buttonClose.addEventListener('click', function(){
    popup.classList.remove('popup_opened');
    
});

let Save = document.querySelector('.popup__container'); 

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameValue.textContent = popupName.value;
    jobValue.textContent = popupJob.value;
    popup.classList.remove('popup_opened');
}

Save.addEventListener('submit', formSubmitHandler);