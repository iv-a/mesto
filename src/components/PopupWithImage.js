import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._image = popupSelector.querySelector('.popup__image');
        this._title = popupSelector.querySelector('.popup__image-title');
    }

    open(card) {
        super.open();
        this._place = card.place;
        this._link = card.link;

        this._image.src = this._link;
        this._image.alt = this._place;
        this._title.textContent = this._place;
    }
}