import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__save-button')

    }

    _getInputValues() {
        this._formDataValues = {};
        this._inputList.forEach(input => {
            this._formDataValues[input.name] = input.value;
        })
        return this._formDataValues;
    }

    statusRender(status) {
        if (status) {
            this._submitButton.textContent = "Сохранение.."
        }
        else {
            this._submitButton.textContent = "Сохранить"
        }
    }

    open() {
        super.open();
    }


    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners(evt) {
        super.setEventListeners()
        this._popup.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(this._getInputValues());
            }
        )
    }
}