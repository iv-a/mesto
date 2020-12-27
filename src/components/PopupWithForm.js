import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;

    }

    _getInputValues() {
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    _resetForm() {
        this._form = this._popupSelector.querySelector('.popup__form');
        this._form.reset();
    }

    close() {
        this._resetForm();
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._submitHandler);
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._popupSelector.removeEventListener('submit', this._submitHandler);
    }
}