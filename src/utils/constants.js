export const ESC_CODE = 'Escape'
const profilePopup = document.querySelector('.popup_type-profile-edit')
const editProfileFormElement = profilePopup.querySelector('.popup__form');
export const profile = document.querySelector('.profile')
export const editButtonPopup = profile.querySelector('.profile__edit-button');
export const newPostButtonPopup = profile.querySelector('.profile__add-button');
export const profileNameInput = editProfileFormElement.querySelector('.popup__input_name');
export const profileJobInput = editProfileFormElement.querySelector('.popup__input_description');
export const postContainer = document.querySelector('.elements');
export const postTemplate = document.querySelector('#post-element');

export const config = {
    popupSelector: '.popup__input_error',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__form-input-error_active',
    errorClass: 'form__input-error_active'
}