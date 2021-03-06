export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);

    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }

    };


    _hasInvalidInput() {
        // проходим по этому массиву методом some
        return this._inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся фунцкция
            // hasInvalidInput вернёт true
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState () {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(this._inputList)) {
            // сделай кнопку неактивной
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", '');
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled", '');
        }
    };


    _setEventListeners(){
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        })
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    enableValidation() {
        this._setEventListeners()
    }
}

