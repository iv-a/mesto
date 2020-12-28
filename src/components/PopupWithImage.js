import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._image = popupElement.querySelector('.popup__image');
        this._title = popupElement.querySelector('.popup__image-title');
    }

    open({ place, link }) {
        super.open();
        this._image.src = link;
        this._image.alt = place;
        this._title.textContent = place;
    }
}