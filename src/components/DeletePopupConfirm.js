import {Popup} from "./Popup";
export class DeletePopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    open() {
        super.open();
    }

    close() {
        super.close();
    }

    confirmDelete(action) {
        this._action = action


}


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._action();
        })
    }

}