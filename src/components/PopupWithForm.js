import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, { submitHandler }) {
        super(popupElement);
        this._submitHandler = submitHandler;
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
        this._form = this._popupElement.querySelector('.popup__form');
        this._saveButton = this._popupElement.querySelector('.popup__save-button');
    }

    renderLoading(isLoading, buttonText) {
        if (isLoading) {
            this._saveButton.textContent = buttonText;
        } else {
            this._saveButton.textContent = buttonText;
        }
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    _resetForm() {
        this._form.reset();
    }

    close() {
        this._resetForm();
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', () => {
            this._submitHandler(this._getInputValues());
        });
    }
}