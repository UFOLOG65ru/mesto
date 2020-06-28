import { nameValue, jobValue } from './index.js'


export class UserInfo {
    constructor(userName, aboutInfo) {
        this._userName = userName;
        this._aboutInfo = aboutInfo;
    }
    // публичный метод, который возвращает объект с данными пользователя
    getUserInfo() {
        this._userName.value = nameValue.textContent;
        this._aboutInfo.value = jobValue.textContent;
    }
    // публичный метод, принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(formData) {
        nameValue.textContent = formData.name; // Сохраняем значение "Имя"
        jobValue.textContent = formData.about; // Сохраняем значение "О себе"
    }
}