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