export default class UserInfo {
  constructor({ name, info, avatar  }) {
    this._titleProfile = document.querySelector(name);
    this._subtitleProfile = document.querySelector(info);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._username.textContent,
      info: this._job.textContent,
      avatar: this._avatar.src
    }

    return userInfo;
  }

  setUserInfo(data) {

    this._titleProfile.textContent = data,name;
    this._subtitleProfile.textContent = data.info;
    this._avatar.src = data.avatar;
  }

}