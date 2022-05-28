export default class UserInfo {
  constructor({ name, info, avatar }) {
    this._titleProfile = document.querySelector(name);
    this._subtitleProfile = document.querySelector(info);
    this._avatar = avatar;
  }

  getUserInfo() {
    const userObj = {
      name: this._titleProfile.textContent,
      info: this._subtitleProfile.textContent,
    };
    return userObj;
  }

  setUserInfo({ name, info, avatar }) {
    this._titleProfile.textContent = name;

    this._subtitleProfile.textContent = info;

    this._avatar.src = avatar;
  }
}
