export class UserInfo {
    constructor(name, description, avatar, userID) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar);
        this._userID = userID

    }


    getUserInfo() {
        return {name: this._name.textContent, about: this._description.textContent}
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.about;
        this._avatar.src = data.avatar;
        this._userID = data._id;


    }

    updateAvatar(link) {
        this._avatar.src = link;
    }

    getUserId() {
        return this._userID
    }
}