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
function initialCardsRender() {
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
    initialCards.forEach((item, i, cards) => {
        addCard(item.name, item.link, true);
    });
}

// Функция addCard(place, link, isInitial) добавляет на страницу новую карточку,
// получая на вход ее заголовок, ссылку на изображение и true/false.
function addCard(place, link, isInitial) {
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
    // При инициализации карточки довавляются в конец контейнера с ними,
    // при добавлении новой - в начало контейнера.
    if (isInitial) {
        cardsList.append(cardElement);
    } else {
        cardsList.prepend(cardElement);
    }
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
}

// Обработчик события 'submit' формы добавления новой карточки.
function formAddCardSubmitHandler(evt) {
    // Отменяем стандартную отправку формы,
    // вызываем функцию addCard и передаем в нее в качестве аргументов значения из полей
    // ввода заголовка новой карточки, ссылки на ее изображение и значение false для условного выражения (isInitial).
    // Закрываем попап добавления новой карточки.
    evt.preventDefault();
    addCard(placeInput.value, linkInput.value, false);
    closePopup(addCardPopup);
}

// Обработчик события 'submit' формы редактирования профиля.
function formEditProfileSubmitHandler (evt) {
    // Отменяем стандартную отправку формы,
    // вставляем значения из полей ввода в соответствующие поля страницы.
    // Закрываем попап редактирования профиля.
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editProfilePopup);
}

// Функция закрытия попапа
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};

// Функция открытия попапа
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    const closeButton = popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => closePopup(popup));
};

// Функция открытия попапа редактирования профиля
function showEditProfilePopup() {
    const formElement = editProfilePopup.querySelector('.popup__form');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(editProfilePopup);
    formElement.addEventListener('submit', formEditProfileSubmitHandler);

}

// Функция открытия попапа добавления новой карточки
function showAddCardPopup() {
    const formElement = addCardPopup.querySelector('.popup__form');
    openPopup(addCardPopup);
    formElement.addEventListener('submit', formAddCardSubmitHandler);

}


initialCardsRender();
editProfileButton.addEventListener('click', showEditProfilePopup);
addCardButton.addEventListener('click', showAddCardPopup);



