import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._formDataValues = {};
        this._inputList.forEach(input => {
            this._formDataValues[input.name] = input.value;
        })
        return this._formDataValues;
    }


    close() {
        this._form.reset();
        super.close();


    }

    setEventListeners(evt) {
        this._popup.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(this._getInputValues());
            }
        )
    }
}