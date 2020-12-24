import {Card} from '../components/Card.js';
import {FormValidator} from "../components/FormValidator.js";
import Section from '../components/Section.js'

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
// const cardsList = document.querySelector('.cards__list');

// Объект параметров валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

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

const cardListSelector = '.cards__list';

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card-template');
        const cardElement = card.createCard();
        cardsList.addItem(cardElement, true);
    }
}, cardListSelector);

cardsList.renderItems();

/*
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
        const card = new Card(item, '#card-template');
        addCard(cardsList, card.createCard(), true);
    });
};
*/


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

// Обработчик события 'submit' формы добавления новой карточки.
const formAddCardSubmitHandler = (evt) => {
    // Отменяем стандартную отправку формы,
    // вызываем функцию addCard и передаем в нее в качестве аргументов значения из полей
    // ввода заголовка новой карточки, ссылки на ее изображение и значение false для условного выражения (isInitial).
    // Закрываем попап добавления новой карточки.
    evt.preventDefault();
    const card = new Card({name: placeInput.value, link: linkInput.value}, '#card-template');
    addCard(cardsList, card.createCard(), false);
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
};

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
    if (evt.target === currentPopup || targetElement.classList.contains('popup__close-button')) {
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
// initialCardsRender();

// Обработчик открытия попапа с формой редактирования профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    validateEditProfileForm.enableButton();
    validateEditProfileForm.hideValidationErrors();
    openPopup(editProfilePopup);
});

// Обработчик сабмита формы редактирования профиля
editProfilePopup.querySelector('.popup__form').addEventListener('submit', formEditProfileSubmitHandler);

// Обработчик открытия попапа с формой добавления новой карточки
addCardButton.addEventListener('click', () => {
    validateAddCardForm.hideValidationErrors();
    openPopup(addCardPopup);
});

// Обработчик сабмита формы добавления новой карточки
addCardPopup.querySelector('.popup__form').addEventListener('submit', formAddCardSubmitHandler);

// Создаем эклемпляр класса FormValidator для формы редактирования профиля и включаем на ней валидацию
const validateEditProfileForm = new FormValidator(validationConfig, document.querySelector('[name= "editForm"]'));
validateEditProfileForm.enableValidation();
// Создаем эклемпляр класса FormValidator для формы добавления карточки и включаем на ней валидацию
const validateAddCardForm = new FormValidator(validationConfig, document.querySelector('[name="addCardForm"]'));
validateAddCardForm.enableValidation();

export {openPopup};