export default class UserInfo {
    constructor({ nameUserElement, aboutUserElement,  avatarElement}) {
        this._nameUserElement = nameUserElement;
        this._aboutUserElement = aboutUserElement;
        this._avatarElement = avatarElement;
    }

    getUserInfo(data) {
        return {
            userName: data['name'],
            userAbout: data['about'],
            userAvatar: data['avatar'],
            userId: data['_id']
        }
    }

    setUserInfo(data) {
        if (data) {
            this._nameUserElement.textContent = data['name'];
            this._aboutUserElement.textContent = data['about'];
            this._avatarElement.src = data['avatar'];
        }
    }

    inputUserInfo(nameInput, aboutInput) {
        nameInput.value = this._nameUserElement.textContent;
        aboutInput.value = this._aboutUserElement.textContent;
    }
}