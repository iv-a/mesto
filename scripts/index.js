let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');

let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let nameInput = popup.querySelector('.popup__input_type_name');
let aboutInput = popup.querySelector('.popup__input_type_about');


function showPopup () {
    let formElement = popup.querySelector('.popup__form');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popup.classList.add('popup_opened');
    formElement.addEventListener('submit', formSubmitHandler);
    formElement.addEventListener('submit', hidePopup);
}

function hidePopup () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);