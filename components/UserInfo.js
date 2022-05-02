export default class UserInfo {
	constructor(titleProfileSelector, subtitleProfileSelector) {
		this._titleProfile = document.querySelector(titleProfileSelector);
		this._subtitleProfile = document.querySelector(subtitleProfileSelector);
	}

  getUserInfo() {
    return {
      title: this._titleProfile.textContent,
      subtitle: this._subtitleProfile.textContent
    }
  }

  setUserInfo(data) {
    this._titleProfile.textContent = data.title;
    this._subtitleProfile.textContent = data.subtitle;
  }

}