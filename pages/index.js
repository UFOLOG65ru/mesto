import Card from '../script/Card.js';
import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import {
    placeContainer,
    buttonEdit,
    saveButtonEdit,
    saveButtonAdd,
    buttonAdd,
    popupEdit,
    popupAdd,
    popupImg,
    buttonCloseEdit,
    buttonCloseAdd,
    buttonCloseImage,
    nameValue,
    jobValue,
    titleValue,
    urlValue,
    popupName,
    popupJob,
    submitEdit,
    submitAdd,
    initialCards,
    settingsObject
} from '../utils/constants.js';

const inputsEditForm = Array.from(submitEdit.querySelectorAll('.popup__input'));
const inputsAddForm = Array.from(submitAdd.querySelectorAll('.popup__input'));

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

//переключение класса скрытия/открытия попап
export function popupToggle(popupElement) {
    toggleEvent(popupElement);
    // переключаем классы
    popupElement.classList.toggle('popup_opened');
}

//функция находит какая именно форма сейчас открыта
function openedForm(evt) {
    const openedFormElement = document.querySelector('.popup_opened');
    closeEsc(evt, openedFormElement);

}
//функция закрытия попап через ESC
function closeEsc(evt, formElement) {
    if ((evt.target.classList.contains('popup')) || (evt.key === 'Escape')) {
        popupToggle(formElement);
    }
}
//функция смены состояния слушателей ESC и оверлей
function toggleEvent(popupElement) {
    if (!popupElement.classList.contains('popup_opened')) {
        //ставим слушатели закрытия кликом или клавишей
        document.addEventListener('click', openedForm);
        document.addEventListener('keydown', openedForm)
    }
    else {
        //снмаем слушатели
        document.removeEventListener('click', openedForm);
        document.removeEventListener('keydown', openedForm)
    }

}
//функция открытия и наполнения информацией формы профиля
function openPopupEdit() {
    popupName.value = nameValue.textContent;
    popupJob.value = jobValue.textContent;
    checkInputOpenedForm(inputsEditForm, submitEdit, formEditValid);
    // делаем кнопку активной при открытии
    saveButtonEdit.classList.remove(settingsObject.inactiveButtonClass);
    popupToggle(popupEdit);
}
//функция открытия попапа формы добавления карточки со сбросом нформации полей
function openPopuAdd() {
    titleValue.value = '';
    urlValue.value = '';

    // проводим валидацию полей ввода формы "создания карточки"
    checkInputOpenedForm(inputsAddForm, submitAdd, formAddValid);
    popupToggle(popupAdd);
}

//отправка формы Edit
function formSubmitEditHandler(evt) {
    evt.preventDefault();
    nameValue.textContent = popupName.value;
    jobValue.textContent = popupJob.value;
    popupToggle(popupEdit);
}

//отправка формы Add
function formSubmitAddHandler(evt) {
    evt.preventDefault();
    const newCard = new Section({
        items: [{}], renderer: (item) => {
            const card = new Card({ name: titleValue.value, link: urlValue.value }, '#image');

            const userCard = card.generateCard();

            newCard.addItem(userCard)
        }
    }, placeContainer);
    newCard.renderItems();
    submitAdd.reset();
    saveButtonAdd.classList.add(settingsObject.inactiveButtonClass);
    saveButtonAdd.disabled = true;
    popupToggle(popupAdd);
}

//слушатель открытия попап Edit
buttonEdit.addEventListener('click', () => openPopupEdit());
//слушатель открытия попап Add
buttonAdd.addEventListener('click', () => openPopuAdd());
//слушатель закрытия попап Edit
buttonCloseEdit.addEventListener('click', () => popupToggle(popupEdit));
//слушатель закрытия попап Add
buttonCloseAdd.addEventListener('click', () => popupToggle(popupAdd));
//слушатель закрытия попап Image
buttonCloseImage.addEventListener('click', () => popupToggle(popupImg));
//слушатель отправки формы
submitEdit.addEventListener('submit', formSubmitEditHandler);
//слушатель добавления карочки
submitAdd.addEventListener('submit', formSubmitAddHandler);

//первоначальная загрузка карточек 
const preloadCards = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card(item, '#image');

        const cardElement = card.generateCard();

        preloadCards.addItem(cardElement)
    }
}, placeContainer);

preloadCards.renderItems();