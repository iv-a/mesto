export default class FormValidator {
    constructor(validationConfig, currentForm) {
        this._currentForm = currentForm;
        this._validationConfig = validationConfig;
        this._inputList = Array.from(this._currentForm.querySelectorAll(this._validationConfig.inputSelector));
        this._submitButton = this._currentForm.querySelector(this._validationConfig.submitButtonSelector);
    }

    // Функция показа текста ошибки ввода
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._currentForm.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    }

    // Функция скрытия текста ошибки ввода
    _hideInputError(inputElement) {
        const errorElement = this._currentForm.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._validationConfig.errorClass);
    }

    // Функция, показывающая сообщение об ошибке ввода при ее наличии,и скрывающая при ее отсутствии.
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Функция, проверяющая валидность всех полей формы
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // Функция, включающая кнопку
    enableButton() {
        this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    // Функция, отключающая кнопку
    _disableButton() {
        this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    // Функция, активирующая или деактивирующая кнопку сабмита в зависимоси от валидности полей формы
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this.enableButton();
        }
    }

    // Функция, устанавливающая слушатели на все поля ввода формы
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    // Функция, скрывающая ошибки валидации при повторном открытии попапа
    //  с некорректно заполненной формой
    hideValidationErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }

    // Функция, включающая валидацию формы
    enableValidation() {
        this._currentForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._disableButton()
        });
        this._setEventListeners();
    }
}