// import {openPopup} from "../pages/index.js";

export class Card {
    constructor({ name, link }, templateSelector){
        this.place = name;
        this.link = link;
        this._templateSelector = templateSelector;
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
    }

    // Функция открытия попапа с картинкой
    _showImagePopup() {
        const imagePopup = document.querySelector('.popup_type_view-image');
        const image = imagePopup.querySelector('.popup__image');
        const title = imagePopup.querySelector('.popup__image-title');
        image.src = this.link;
        image.alt = this.place;
        title.textContent = this.place;
        // openPopup(imagePopup);
    }

    // Функция, устанавливающая обработчики кликов
    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.card__like-button');
        this._deleteButton = this._cardElement.querySelector('.card__delete-button');
        this._imageButton = this._cardElement.querySelector('.card__open-photo-button');

        this._likeButton.addEventListener('click', this._like);
        this._deleteButton.addEventListener('click', this._delete);
        this._imageButton.addEventListener('click', () => {
            this._showImagePopup();
        });
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
