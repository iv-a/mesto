export default class UserInfo {
    constructor({ nameUserElement, aboutUserElement }) {
        this._nameUserElement = nameUserElement;
        this._aboutUserElement = aboutUserElement;
    }

    getUserInfo() {
        return {
            userName: this._nameUserElement.textContent,
            userAbout: this._aboutUserElement.textContent
        }
    }

    setUserInfo({ nameInput, aboutInput }) {
        this._nameUserElement.textContent = nameInput;
        this._aboutUserElement.textContent = aboutInput;
    }
}