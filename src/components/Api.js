export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }

    setUserInfo(data) {
        console.log(data)
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
            .then(res => this._checkResponse(res));
    }

    editAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,

            body: JSON.stringify({
                avatar: link
            })
        })
            .then(res => this._checkResponse(res));
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkResponse(res));
    }

    deleteCard(cardId) {
        console.log(cardId)
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }

    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }




}


/*
fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
    }
})
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    });


fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
    method: 'PATCH',
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
    })
});


class Api {
    constructor(options) {
        // тело конструктора
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
            headers: {
                authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    // другие методы работы с API
}



api.getInitialCards()
    .then((result) => {
        // обрабатываем результат
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
    }
});*/
