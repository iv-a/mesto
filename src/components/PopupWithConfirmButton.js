import Popup from "./Popup.js";

export default class PopupWithConfirmButton extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._form = this._popupElement.querySelector('.popup__form');
    }

    submitHandler(callback) {
        this._submitHandler = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler();
        });
    }
}