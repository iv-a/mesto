export default class Card {
    constructor({ name, link, likes, _id, owner },
                userData,
                templateSelector,
                { handleCardClick },
                { handleDeleteButtonClick },
                { handleLikeButtonClick })
    {
        this.place = name;
        this.link = link;
        this.likes = likes;
        this.cardId = _id;
        this.owner = owner;
        this.user = userData;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeButtonClick = handleLikeButtonClick;
    }

    //Функция получения разметки шаблона и его клонирования
    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    getLikesInfo(data) {
        this.likes = data['likes'];
        this._countLikes();
    }

    isLiked() {
        return this.likes.find((item) => item['_id'] === this.user['_id']);
    }

    setLike() {
        this._likeButton.classList.add('card__like-button_active');

    }

    unsetLike() {
        this._likeButton.classList.remove('card__like-button_active');
    }

    _countLikes() {
        this.likesCounter = this._cardElement.querySelector('.card__like-counter');
        this.likesCounter.textContent = this.likes.length;
    }

    // Функция, удаляющая карточку
    delete() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    // Функция, устанавливающая обработчики кликов
    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.card__like-button');
        this._deleteButton = this._cardElement.querySelector('.card__delete-button');
        this._imageButton = this._cardElement.querySelector('.card__open-photo-button');

        this._likeButton.addEventListener('click', this._handleLikeButtonClick);
        this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);
        this._imageButton.addEventListener('click', this._handleCardClick);
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

        if (this.isLiked()) {
            this.setLike();
        } else {
            this.unsetLike();
        }
        this._countLikes();

        return this._cardElement;
    }
}
