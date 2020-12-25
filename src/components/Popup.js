export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
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
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this));
        this._closeButton.addEventListener('click', this._handleButtonClose.bind(this));
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popupSelector.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
        this._closeButton.removeEventListener('click', this._handleButtonClose.bind(this));
    }
}