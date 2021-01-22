// Находим поля, содержащие имя пользователя и информацию о нем.
const profile = document.querySelector('.profile');
// Имя пользователя
const profileName = profile.querySelector('.profile__name');
// Информация о пользователе
const profileAbout = profile.querySelector('.profile__about');
const changeAvatarButton = profile.querySelector('.profile__avatar-button');
const avatar = profile.querySelector('.profile__avatar');
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
// Попап с формой для замены пользовательского аватара
const changeAvatarPopup = document.querySelector('.popup_type_change-avatar');
// Попап с кнопкой для подтверждения удаления карточки
const confirmPopup = document.querySelector('.popup_type_confirm');
// Селектор контейнера для карточек
const cardListSelector = '.cards__list';
// Попап просмотра изображения
const imagePopup = document.querySelector('.popup_type_view-image');

// Объект параметров валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

export {
    profileName,
    profileAbout,
    changeAvatarButton,
    avatar,
    editProfileButton,
    editProfilePopup,
    nameInput,
    aboutInput,
    addCardButton,
    addCardPopup,
    changeAvatarPopup,
    confirmPopup,
    cardListSelector,
    imagePopup,
    validationConfig
}