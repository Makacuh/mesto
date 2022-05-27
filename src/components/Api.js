export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
   
    
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
        .then(this._parseResponse);
    }
  
    addCard(prename, url) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: prename,
          link: url
        })
      })
        .then(this._parseResponse);
        
    }
  
   
    deleteElement(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._parseResponse);
    }
  
   
    toggleLike(id, methodApi) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method : methodApi,
        headers: this._headers
      })
      .then(this._parseResponse);
    }
  
    
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers
      })
        .then(this._parseResponse);
    }
  
    
    editUserInfo(name, about) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
        .then(this._parseResponse);
    }
  
    
    editAvatar(url) {console.log(url);
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: url
        })
      })
      
        .then(this._parseResponse);
    }

    _parseResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
  }