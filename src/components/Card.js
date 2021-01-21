export default class Card {
    constructor({ name, link, likes, _id, owner }, userData,  templateSelector, { handleCardClick }, { handleDeleteButtonClick }) {
        this.place = name;
        this.link = link;
        this.likes = likes;
        this.cardId = _id;
        this.owner = owner;
        this.user = userData;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._like = this._like.bind(this);
        // this._delete = this._delete.bind(this);
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
    delete() {
        this._cardElement.remove();
        this._cardElement = null;
        this._removeEventListeners();
    }

    getId() {
        return this.cardId;
    }

    // Функция, устанавливающая обработчики кликов
    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.card__like-button');
        this._deleteButton = this._cardElement.querySelector('.card__delete-button');
        this._imageButton = this._cardElement.querySelector('.card__open-photo-button');

        this._likeButton.addEventListener('click', this._like);
        this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);
        this._imageButton.addEventListener('click', this._handleCardClick);
    }

    // Функция, удаляющая обработчики кликов
    _removeEventListeners() {
        this._likeButton.removeEventListener('click', this._like);
        this._deleteButton.removeEventListener('click', this._handleDeleteButtonClick);
        this._imageButton.removeEventListener('click', this._handleCardClick);
    }

    _hideDeleteButton() {
        if (this.owner['_id'] !== this.user['_id']) {
            this._deleteButton.classList.add('card__delete-button_disabled');
        }
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

        this._hideDeleteButton();

        this.likesCounter = this._cardElement.querySelector('.card__like-counter');
        this.likesCounter.textContent = this.likes.length;

        return this._cardElement;
    }
}
