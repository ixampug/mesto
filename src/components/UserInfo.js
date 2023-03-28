export class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(description);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      description: this._about.textContent,
    };
    return userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.description;
  }
}
