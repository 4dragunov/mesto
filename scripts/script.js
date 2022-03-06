import {initialCards} from "./initialCards.js";
import {config, FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";
import {ESC_CODE} from "./utils/constants.js";

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
const currentName = profile.querySelector('.profile__name');
const currentJob = profile.querySelector('.profile__description');
const profileNameInput = editProfileFormElement.querySelector('.popup__input_name');
const profileJobInput = editProfileFormElement.querySelector('.popup__input_description');
export const postContainer = document.querySelector('.elements');
const postTemplate = document.querySelector('#post-element');
const popups = document.querySelectorAll('.popup')

/*
Функция заменяет имя и работу в профиле страницы.
*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    currentName.textContent = profileNameInput.value;
    currentJob.textContent = profileJobInput.value;
    closePopup(profilePopup);
    formValidators['edit'].resetValidation()
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
    const newCard = createCard({name: newPostName.value, link:newPostLink.value, postTemplate, handleCardClick})
    handleAddCard(newCard)
    closePopup(newPostPopup);
    newPostFormElement.reset()
    formValidators['newPost'].resetValidation()
}


function createCard(item) {
    return new Card(item.name, item.link, postTemplate, handleCardClick)
}

function handleAddCard(postElement) {
    const newCard = postElement.returnPost()
    postContainer.prepend(newCard)
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

/*
Функция рендера стандартных постов на странице
*/
function renderInitialPosts() {
    initialCards.forEach(function (item) {
        const newCard = createCard(item)
        handleAddCard(newCard)
    });
}

function closeByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_enabled');
        closePopup(openedPopup);
    }
}

function closeByOverlayClick(evt) {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_enabled')) {
                closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup(popup)
            }
        })
    })
}

function handleCardClick(name, link) {
    imagePopupLink.src = link;
    imagePopupLink.alt = name;
    imagePopupName.textContent = name;
    openPopup(imagePopup)

}

editButtonPopup.addEventListener('click', openPopupEditProfile);
editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
newPostFormElement.addEventListener('submit', handleCardFormSubmit);
newPostButtonPopup.addEventListener('click', () => {
    openPopup(newPostPopup)
});

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')
        //в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};


closeByOverlayClick();
renderInitialPosts();
enableValidation(config);




