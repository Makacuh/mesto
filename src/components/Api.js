export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
    _parseResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    addCard(data) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(res => this._parseResponse(res));
    }
  
   
    deleteElement(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
   
    setLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    
    editUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.username,
          about: data.job
        })
      })
        .then(res => this._parseResponse(res));
    }
  
    
    editAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
        .then(res => this._parseResponse(res));
    }
  }