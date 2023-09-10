//const token = "30890c08-2ed4-44b3-b5d6-ec734b5a14d4";
//const url = "https://gammervvback.nomoredomainsicu.ru";

class Api {
  constructor(settings) {
    this._headers = settings.headers;
    this._url = settings.url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');

    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  getUserData() {
    return fetch(this._url + `users/me`, {
      headers: this._getHeaders(),
    })
    .then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(this._url + `cards`, {
      headers: this._getHeaders(),
    })
    .then(res => this._getResponseData(res));
  }

  editProfile(input) {
    return fetch(this._url + `users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(input),
    })
    .then(res => this._getResponseData(res));
  }

  addCard(input) {
    return fetch(this._url + `cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(input),
    })
    .then(res => this._getResponseData(res));
  }

  deleteCard(id) {
    return fetch(this._url + `cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    })
    .then(res => this._getResponseData(res));
  }

  deleteLike(id) {
    return fetch(this._url + `cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    })
    .then(res => this._getResponseData(res));
  }

  addLike(id) {
    return fetch(this._url + `cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    })
    .then(res => this._getResponseData(res));
  }

  //для управления лайками
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return api.addLike(id);
    }
    return api.deleteLike(id);
  }

  editAvatar(data) {
    return fetch(this._url + `users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: data }),
    }).then(res => this._getResponseData(res));
  }
}

const api = new Api({
  url: 'https://gammervvback.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
}); //вызов класса api

export default api;
