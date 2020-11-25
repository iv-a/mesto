// Функция показа текста ошибки ввода
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// Функция скрытия текста ошибки ввода
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
};

// Функция, показывающая или скрывающая сообщение об ошибке ввода
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

// Функция, проверяющая валидность всех полей формы
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Активация кнопки submit
const enableButton = (buttonElement, config) => {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
};

// Деактивация кнопки submit
const disableButton = (buttonElement, config) => {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
};

// Функция, активирующая или деактивирующая кнопку сабмита в зависимоси от валидности полей формы
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config)
    } else {
        enableButton(buttonElement, config)
    }
};

// Функция, устанавливающая слушатели на все поля ввода формы
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Функция, устанавливающая слушатели на все формы
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const buttonElement = formElement.querySelector(config.submitButtonSelector);
            disableButton(buttonElement, config);
        });
        setEventListeners(formElement, config)
    });
};

enableValidation(validationConfig);