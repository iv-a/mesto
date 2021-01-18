export default class UserInfo {
    constructor({ nameUserElement, aboutUserElement,  avatarElement}) {
        this._nameUserElement = nameUserElement;
        this._aboutUserElement = aboutUserElement;
        this._avatarElement = avatarElement;
    }

    getUserInfo(data) {
        return {
            userName: data.name,
            userAbout: data.about,
            userAvatar: data.avatar,
            userId: data._id
        }
    }

    setUserInfo(data) {
        this._nameUserElement.textContent = data.name;
        this._aboutUserElement.textContent = data.about;
        this._avatarElement.src = data.avatar;
    }

    changeUserInfo({ nameInput, aboutInput }) {
        this._nameUserElement.textContent = nameInput;
        this._aboutUserElement.textContent = aboutInput;
    }
}