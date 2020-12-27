export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item, isInitial = false) {
        // console.log(item);
        if (isInitial) {
            this._container.append(item);
        } else {
            this._container.prepend(item);
        }
        // this._container.prepend(item);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }


}