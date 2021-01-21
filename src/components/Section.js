export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item, isInitial = false) {
        if (isInitial) {
            this._container.append(item);
        } else {
            this._container.prepend(item);
        }
    }

    renderItems(items, userData) {
        items.forEach(item => {
            this._renderer(item, userData);
        });
    }
}