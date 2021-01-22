export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getInitialCards() {
        return fetch (`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editUserData({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    postNewCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards `, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCard(card) {
        return fetch(`${this.baseUrl}/cards/${card['_id']}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    addLike(card) {
        return fetch(`${this.baseUrl}/cards/likes/${card['cardId']} `, {
            method: 'PUT',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    removeLike(card) {
        return fetch(`${this.baseUrl}/cards/likes/${card['cardId']}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    changeUserAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then((res) => {
                if (res.ok) {
                    return(res.json());
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}