export default class UserInfo {
    constructor({ nameUserSelector, aboutUserSelector }) {
        this._nameUserSelector = nameUserSelector;
        this._aboutUserSelector = aboutUserSelector;
    }

    getUserInfo() {
        return {
            userName: this._nameUserSelector.textContent,
            userAbout: this._aboutUserSelector.textContent
        }
    }

    setUserInfo({ nameInput, aboutInput }) {
        this._nameUserSelector.textContent = nameInput;
        this._aboutUserSelector.textContent = aboutInput;
    }
}