import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmButton from "../components/PopupWithConfirmButton.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
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
    // initialCards,
    validationConfig
} from '../utils/constants.js'

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: 'ee997593-23fa-4bcc-b338-c6e6a2cbbaea',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserData(), api.getInitialCards()])
    .then((values) => {
        const [userData, initialCards] = values;
        user.getUserInfo(userData);
        user.setUserInfo(userData);
        cardsList.renderItems(initialCards, userData);


    });


// Создаем экземпляр класса UserInfo
const user = new UserInfo({
    nameUserElement: profileName,
    aboutUserElement: profileAbout,
    avatarElement: avatar
});

// Функция, создающая новый экземпляр класса Card и возвращающая DOM-элемент карточки
const createCardElement = (item, userData) => {
    const card = new Card(item, userData, '#card-template',
        {
        handleCardClick: () => {
            popupWithImage.open(card);
        }
    }, {
        handleDeleteButtonClick: () => {
            popupWithConfirmButton.open();
            popupWithConfirmButton.submitHandler(() => {
                api.deleteCard(item)
                    .then(() => {
                        card.delete();
                        popupWithConfirmButton.close();
                    })
            })

        }
    }, {
        handleLikeButtonClick: () => {
            if (card.isLiked()) {
                api.removeLike(card)
                    .then((res) => {
                        card.getLikesInfo(res);
                        card.unsetLike();
                    })
            } else {
                api.addLike(card)
                    .then((res) => {
                        card.getLikesInfo(res);
                        card.setLike();
                    })
            }
        }
    });
    return card.createCard();
};

// Создаем экземпляр класса Section
const cardsList = new Section({
    renderer: (item, userData) => {
        cardsList.addItem(createCardElement(item, userData), true);
    }
}, cardListSelector);

// Создаем экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(imagePopup);

// Создаем экземпляр класса PopupWithForm с формой для редактирования профиля
const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
    submitHandler: (inputValues) => {
        api.editUserData({ name: inputValues['nameInput'], about: inputValues['aboutInput']})
            .then((data) => {
                user.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            });

        popupWithEditProfileForm.close();
    }
});

// Создаем экземпляр класса PopupWithForm с формой для добавления новой карточки
const popupWithAddCardForm = new PopupWithForm(addCardPopup, {
    submitHandler: (inputValues) => {
        api.postNewCard({ name: inputValues['placeInput'], link: inputValues['linkInput']})
            .then((item) => {
                cardsList.addItem(createCardElement(item, item.owner));
            })
            .catch((err) => {
                console.log(err)
            });

        popupWithAddCardForm.close();
    }
});

const popupWithChangeAvatarForm = new PopupWithForm(changeAvatarPopup, {
    submitHandler: (inputValue) => {
        api.changeUserAvatar({ avatar: inputValue['avatarLinkInput'] })
            .then((res) => {
                user.setUserInfo(res);
                popupWithChangeAvatarForm.close();
            })
    }
});

const popupWithConfirmButton = new PopupWithConfirmButton(confirmPopup);

// Обработчик открытия попапа с формой редактирования профиля
editProfileButton.addEventListener('click', () => {
    user.inputUserInfo(nameInput, aboutInput);
    validateEditProfileForm.enableButton();
    validateEditProfileForm.hideValidationErrors();
    popupWithEditProfileForm.open();
});

// Обработчик открытия попапа с формой добавления новой карточки
addCardButton.addEventListener('click', () => {
    validateAddCardForm.hideValidationErrors();
    popupWithAddCardForm.open();
});

changeAvatarButton.addEventListener('click', () => {
    validateChangeAvatarForm.hideValidationErrors();
    popupWithChangeAvatarForm.open();
});

// Создаем эклемпляр класса FormValidator для формы редактирования профиля
const validateEditProfileForm = new FormValidator(validationConfig, document.querySelector('[name= "editForm"]'));
// Создаем эклемпляр класса FormValidator для формы добавления карточки
const validateAddCardForm = new FormValidator(validationConfig, document.querySelector('[name="addCardForm"]'));

const validateChangeAvatarForm = new FormValidator(validationConfig, document.querySelector('[name="changeAvatarForm"]'));

// Добавляем на страницу исходный массив карточек
// cardsList.renderItems();
// Устанавливаем слушатели на все попапы
popupWithImage.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithEditProfileForm.setEventListeners();
popupWithChangeAvatarForm.setEventListeners();
popupWithConfirmButton.setEventListeners();
// Включаем валидацию для формы редактирования профиля
validateEditProfileForm.enableValidation();
// Включаем валидацию для формы добавления карточки
validateAddCardForm.enableValidation();

validateChangeAvatarForm.enableValidation();