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

            .catch((err) => {
                console.log(err);
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

            .catch((err) => {
                console.log(err);
            })
    }
}