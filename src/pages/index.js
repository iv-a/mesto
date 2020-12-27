import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    profileName,
    profileAbout,
    editProfileButton,
    editProfilePopup,
    nameInput,
    aboutInput,
    addCardButton,
    addCardPopup,
    cardListSelector,
    imagePopup,
    initialCards,
    validationConfig
} from '../utils/constants.js'

// Создаем экземпляр класса UserInfo
const user = new UserInfo({
    nameUserSelector: profileName,
    aboutUserSelector: profileAbout
});

// Функция, создающая новый экземпляр класса Card и возвращающая DOM-элемент карточки
const createCardElement = (item) => {
    const card = new Card(item, '#card-template', {
        handleCardClick: () => {
            popupWithImage.open(card);
        }
    });
    return card.createCard();
};

// Создаем экземпляр класса Section
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(createCardElement(item), true);
    }
}, cardListSelector);

// Создаем экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(imagePopup);

// Создаем экземпляр класса PopupWithForm с формой для редактирования профиля
const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
    submitHandler: () => {
        const inputValues = popupWithEditProfileForm._getInputValues();
        user.setUserInfo({
            nameInput: inputValues['nameInput'],
            aboutInput: inputValues['aboutInput']
        });
        popupWithEditProfileForm.close();
    }
});

// Создаем экземпляр класса PopupWithForm с формой для добавления новой карточки
const popupWithAddCardForm = new PopupWithForm(addCardPopup, {
    submitHandler: () => {
        const inputValues = popupWithAddCardForm._getInputValues();
        const item = {
            name: inputValues['placeInput'],
            link: inputValues['linkInput']
        };
        cardsList.addItem(createCardElement(item));
        popupWithAddCardForm.close();
    }
});

// Обработчик открытия попапа с формой редактирования профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = user.getUserInfo().userName;
    aboutInput.value = user.getUserInfo().userAbout;
    validateEditProfileForm.enableButton();
    validateEditProfileForm.hideValidationErrors();
    popupWithEditProfileForm.open();
});

// Обработчик открытия попапа с формой добавления новой карточки
addCardButton.addEventListener('click', () => {
    validateAddCardForm.hideValidationErrors();
    popupWithAddCardForm.open();
});

// Создаем эклемпляр класса FormValidator для формы редактирования профиля
const validateEditProfileForm = new FormValidator(validationConfig, document.querySelector('[name= "editForm"]'));
// Создаем эклемпляр класса FormValidator для формы добавления карточки
const validateAddCardForm = new FormValidator(validationConfig, document.querySelector('[name="addCardForm"]'));

// Добавляем на страницу исходный массив карточек
cardsList.renderItems();
// Включаем валидацию для формы редактирования профиля
validateEditProfileForm.enableValidation();
// Включаем валидацию для формы добавления карточки
validateAddCardForm.enableValidation();