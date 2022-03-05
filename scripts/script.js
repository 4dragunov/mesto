import {initialCards} from "./initialCards.js";
import {config} from "./validate.js";
import {Card} from "./Card.js";
import {FormValidator} from  "./validate.js"

const ESC_CODE = 'Escape'
const profile = document.querySelector('.profile')
const editButtonPopup = profile.querySelector('.profile__edit-button');
const newPostButtonPopup = profile.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_type-profile-edit')
const newPostPopup = document.querySelector('.popup_type-new-post')
const editProfileFormElement = profilePopup.querySelector('.popup__form');
const newPostFormElement = newPostPopup.querySelector('.popup__form');
const newPostName = newPostFormElement.querySelector('.popup__input_name');
const newPostLink = newPostFormElement.querySelector('.popup__input_description');
const imagePopup = document.querySelector('.popup_type-image')
const imagePopupLink = imagePopup.querySelector('.popup__image')
const imagePopupName = imagePopup.querySelector('.popup__image-description')
const closeEditPopup = profilePopup.querySelector('.popup__close-button');
const closeNewPostPopup = newPostPopup.querySelector('.popup__close-button');
const closeImagePopup = imagePopup.querySelector('.popup__close-button');
const currentName = profile.querySelector('.profile__name');
const currentJob = profile.querySelector('.profile__description');
const profileNameInput = editProfileFormElement.querySelector('.popup__input_name');
const profileJobInput = editProfileFormElement.querySelector('.popup__input_description');
export const postContainer = document.querySelector('.elements');
const postTemplate = document.querySelector('#post-element');

/*
Функция заменяет имя и работу в профиле страницы.
*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    currentName.textContent = profileNameInput.value;
    currentJob.textContent = profileJobInput.value;
    closePopup(profilePopup);
}


function openPopup(popup) {
    popup.classList.add('popup_enabled');
    document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
    popup.classList.remove('popup_enabled');
    document.removeEventListener('keydown', closeByEsc)
}

/*
Функция забирает данные из формы и создает новый пост
*/
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const postElement = new Card(newPostName.value, newPostLink.value, postTemplate);
    handleAddCard(postElement.returnPost())
    closePopup(newPostPopup);
    newPostName.value = ''; 
    newPostLink.value = '';
    const submitButton = newPostPopup.querySelector(config.submitButtonSelector);
    disableButton(submitButton);

}

function handleAddCard(postElement) {
    postContainer.prepend(postElement)
}

/*
Функция отображает в полях формы текущие данные о пользователе
*/
function openPopupEditProfile() {
    openPopup(profilePopup)
    const textName = currentName.textContent;
    const textJob = currentJob.textContent;
    profileNameInput.value = textName;
    profileJobInput.value = textJob;
}

function disableButton(button) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", '');
}
/*
Функция отображения изображения в popup
*/
export function showImagePopup(postName, postLink) {
    openPopup(imagePopup)
    imagePopupLink.src = postLink;
    imagePopupLink.alt = postName;
    imagePopupName.textContent = postName;
    
}

/*
Функция рендера стандартных постов на странице
*/
function renderInitialPosts() {
    initialCards.forEach(function (item) {
        const newPost = new Card(item.name, item.link, postTemplate)
        handleAddCard(newPost.returnPost())
    });
}

function closeByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_enabled');
        closePopup(openedPopup);
    }
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_enabled');
        closePopup(openedPopup);
    }
}

imagePopup.addEventListener('mousedown', closeByOverlayClick);
profilePopup.addEventListener('mousedown', closeByOverlayClick);
newPostPopup.addEventListener('mousedown', closeByOverlayClick);

editButtonPopup.addEventListener('click', openPopupEditProfile);
editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
newPostFormElement.addEventListener('submit', handleCardFormSubmit);
newPostButtonPopup.addEventListener('click', () => {
    openPopup(newPostPopup)
});
    
closeEditPopup.addEventListener('click', () => {
    closePopup(profilePopup)
});

closeNewPostPopup.addEventListener('click', () => {
    closePopup(newPostPopup)
});

closeImagePopup.addEventListener('click', () => {
    closePopup(imagePopup)
});

const profileEditFormValidation = new FormValidator(config, editProfileFormElement);
const postAddFormValidation = new FormValidator(config, newPostFormElement);
profileEditFormValidation.enableValidation()
postAddFormValidation.enableValidation()


renderInitialPosts();



