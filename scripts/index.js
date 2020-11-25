// Находим поля, содержащие имя пользователя и информацию о нем.
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

// Кнопка редактирования профиля
const editProfileButton = profile.querySelector('.profile__edit-button');
// Попап редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
// Поле ввода имени пользователя
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
// Поле ввода личной информации
const aboutInput = editProfilePopup.querySelector('.popup__input_type_about');

// Кнопка добавления новой карточки
const addCardButton = profile.querySelector('.profile__add-button');
// Попап добавления новой карточки
const addCardPopup = document.querySelector('.popup_type_add-card');
// Поле ввода названия новой карточки
const placeInput = addCardPopup.querySelector('.popup__input_type_place');
// Поле ввода ссылки на картинку для новой карточки
const linkInput = addCardPopup.querySelector('.popup__input_type_link');

// Список карточек
const cardsList = document.querySelector('.cards__list');


// Функция initialCardsRender() при загрузке страницы добавляет на нее шесть карточек из массива initialCards;
const initialCardsRender = () => {
    // Проходимся по всем элементам массива initialCards
    // и на каждой итеррации вызываем функцию addCard()
    // в которую передаем в качестве аргументов заголовок новой карточки,
    // ссылку на изображение и значение true для условного выражения (isInitial).
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];
    initialCards.forEach((item) => {
        addCard(cardsList, createCard(item.name, item.link), true);
    });
};

// Функция createCard создает DOM элемент карточки.
// На вход получает название карточки и ссылку на изображение
const createCard = (place, link) => {
    // Выбираем template с идентификатором card-template и сохраняем его свойство content в переменную cardTemplate.
    // Клонируем шаблон, сохраняя результат в переменной cardElement.
    // В атрибут src изображения с классом card__photo записываем ссылку, в атрибут alt - название.
    // В заголовок с классом .card__title добавляем название.
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardName = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__photo');
    cardImage.src = link;
    cardImage.alt = place;
    cardName.textContent = place;
    // Возвращаем созданную карточку
    return cardElement;
};

// Функция добавления карточки в контейнер.
// На вход получает контейнер, в который будет добавлена карточка,
// саму карточку и логическое true/false, определяющее порядок добавления карточки:
// При инициализации карточки довавляются в конец контейнера,
// а при добавлении новой - в начало контейнера.
const addCard = (container, cardElement, isInitial) => {
    if (isInitial) {
        container.append(cardElement);
    } else {
        container.prepend(cardElement);
    }
};

// Функция открытия попапа с изображением
const showImagePopup = (place, link) => {
    const imagePopup = document.querySelector('.popup_type_view-image');
    const image = imagePopup.querySelector('.popup__image');
    const title = imagePopup.querySelector('.popup__image-title');
    image.src = link;
    image.alt = place;
    title.textContent = place;
    openPopup(imagePopup);
};

// Обработчик события 'submit' формы добавления новой карточки.
const formAddCardSubmitHandler = (evt) => {
    // Отменяем стандартную отправку формы,
    // вызываем функцию addCard и передаем в нее в качестве аргументов значения из полей
    // ввода заголовка новой карточки, ссылки на ее изображение и значение false для условного выражения (isInitial).
    // Закрываем попап добавления новой карточки.
    evt.preventDefault();
    addCard(cardsList, createCard(placeInput.value, linkInput.value), false);
    closePopup(addCardPopup);
};

// Обработчик события 'submit' формы редактирования профиля.
const formEditProfileSubmitHandler = (evt) => {
    // Отменяем стандартную отправку формы,
    // вставляем значения из полей ввода в соответствующие поля страницы.
    // Закрываем попап редактирования профиля.
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editProfilePopup);
}

// Функция сброса полей формы
const resetForm = (popup) => {
    const currentForm = popup.querySelector('.popup__form');
    if (currentForm) {
        currentForm.reset();
    }
};

// Функция закрытия попапа
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    unsetPopupEventListener(popup);
    resetForm(popup);
};

// Функция открытия попапа
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    setPopupEventListener(popup);
};

// Обработчик кликов на оверлей и на кнопку "Закрыть".
const popupEventsHandler = (evt) => {
    const currentPopup = evt.currentTarget;
    const targetElement = evt.target;
    if (evt.target === currentPopup) {
        closePopup(currentPopup);
    } else if (targetElement.classList.contains('popup__close-button')) {
        closePopup(currentPopup);
    }
};

// Обработчик нажатия на клавишу Esc.
const escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
        closePopup(currentPopup);
    }
};

// Установка обработчиков событий попапа.
const setPopupEventListener = (popup) => {
    popup.addEventListener('click', popupEventsHandler);
    document.addEventListener('keydown', escKeyHandler);
};

// Удаление обработчиков событий попапа.
const unsetPopupEventListener = (popup) => {
    popup.removeEventListener('click', popupEventsHandler);
    document.removeEventListener('keydown', escKeyHandler);
};


// Инициальзация карточек
initialCardsRender();

// Обработчик открытия попапа с формой редактирования профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    const saveButton = editProfilePopup.querySelector('.popup__save-button');
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__save-button_disabled');
    openPopup(editProfilePopup);
});

// Обработчик сабмита формы редактирования профиля
editProfilePopup.querySelector('.popup__form').addEventListener('submit', formEditProfileSubmitHandler);

// Обработчик открытия попапа с формой добавления новой карточки
addCardButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});

// Обработчик сабмита формы добавления новой карточки
addCardPopup.querySelector('.popup__form').addEventListener('submit', formAddCardSubmitHandler);

// Обработчик событий на списке карточек.
//  Если нажали на "Лайк", то кнопка меняет цвет.
//  Если нажали на картинку, то открывается попап с ней.
//  Если нажали на "Корзину", то карточка удаляется.
cardsList.addEventListener('click', (evt) => {
    const targetElement = evt.target;
    if (targetElement.classList.contains('card__like-button')) {
        targetElement.classList.toggle('card__like-button_active');
    } else if (targetElement.classList.contains('card__photo')) {
        showImagePopup(targetElement.alt, targetElement.src);
    } else if (targetElement.classList.contains('card__delete-button')) {
        targetElement.closest('.card').remove();
    }
});