import { escButtonKey } from '../utils/constants.js'

export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._handleButtonClose = this._handleButtonClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === escButtonKey) {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close()
        }
    }

    _handleButtonClose() {
        this.close();
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', this._handleOverlayClose);
        this._closeButton.addEventListener('click', this._handleButtonClose);
    }
}