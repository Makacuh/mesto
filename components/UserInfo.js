export default class UserInfo {
	constructor({name, info}) {
		this._titleProfile = document.querySelector(name);
		this._subtitleProfile = document.querySelector(info);
	}

  getUserInfo() {
    return {
      title: this._titleProfile.textContent,
      subtitle: this._subtitleProfile.textContent
    }
  }

  setUserInfo({name, info}) {
    
    this._titleProfile.textContent = name;
    this._subtitleProfile.textContent = info;
  }

}