export default class Card {
    constructor({ name, link }, templateSelector, { handleCardClick }) {
        this.place = name;
        this.link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    //Функция получения разметки шаблона и его клонирования
    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    // Функция, меняющая цвет кнопки "like"
    _like(evt) {
        const currentTarget = evt.target;
        currentTarget.classList.toggle('card__like-button_active');
    }

    // Функция, удаляющая карточку
    _delete(evt) {
        const deleteTarget = evt.target;
        deleteTarget.closest('.card').remove();
        this._removeEventListeners();
    }

    // Функция, устанавливающая обработчики кликов
    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.card__like-button');
        this._deleteButton = this._cardElement.querySelector('.card__delete-button');
        this._imageButton = this._cardElement.querySelector('.card__open-photo-button');

        this._likeButton.addEventListener('click', this._like);
        this._deleteButton.addEventListener('click', this._delete);
        this._imageButton.addEventListener('click', this._handleCardClick);
    }

    // Функция, удаляющая обработчики кликов
    _removeEventListeners() {
        this._likeButton.removeEventListener('click', this._like);
        this._deleteButton.removeEventListener('click', this._delete);
        this._imageButton.removeEventListener('click', this._handleCardClick);
    }

    // Функция создания экземпляра карточки
    createCard() {
        this._cardElement = this._getTemplate();
        this._setEventListeners();

        this._cardName = this._cardElement.querySelector('.card__title');
        this._cardImage = this._cardElement.querySelector('.card__photo');

        this._cardImage.src = this.link;
        this._cardImage.alt = this.place;
        this._cardName.textContent = this.place;

        return this._cardElement;
    }
}
