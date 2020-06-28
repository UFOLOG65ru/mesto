export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    //перебираем массив данных
    renderItems() {
        this._items.forEach(item => this._renderer(item))
    }
    //отображение карточек
    setItem(element) {
        this._container.prepend(element);
    }
}