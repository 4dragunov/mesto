import {initialCards} from "./initialCards.js";
import {enableValidation} from "./validate.js";
import {config} from "./validate.js";

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
const postContainer = document.querySelector('.elements');
const postTemplate = document.querySelector('#post-element').content;


/*
Функция заменяет имя и работу в профиле страницы.
*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    currentName.textContent = profileNameInput.value;
    currentJob.textContent = profileJobInput.value;
    closePopup(profilePopup);
}
/*Добрый день, Антон! Большое спасибо за ревью, очень доходчиво и понятно
Дело в том, что наличие двух классов обусловлено желанием сделать плавное закрытие поп-апа
Если это ошибка - дайте знать, оперативно исключим это явление)*/
function openPopup(popup) {
    popup.classList.add('popup_enabled');
    popup.classList.remove('popup_disabled');
    document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
    popup.classList.remove('popup_enabled');
    popup.classList.add('popup_disabled');
    document.removeEventListener('keydown', closeByEsc)
}

/*
Функция забирает данные из формы и создает новый пост
*/
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const postElement = createCard(newPostName.value, newPostLink.value);
    postContainer.prepend(postElement)
    closePopup(newPostPopup);
    newPostName.value = ''; 
    newPostLink.value = '';
    enableValidation(config);
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
    enableValidation(config);
}

/*
Функция создания поста
*/
function createCard(postName, postLink) {
// клонируем содержимое тега template
    const postElement = postTemplate.querySelector('.element').cloneNode(true);
// наполняем содержимым
    const imgElement = postElement.querySelector('.element__image');
    imgElement.src = postLink;
    imgElement.alt = postName;
    postElement.querySelector('.element__name').textContent = postName;
// удаление поста
    const deleteButton = postElement.querySelector('.element__trash-button')
    deleteButton.addEventListener('click', () => {
        postElement.remove();
    })
// лайк поста
    const likeButton = postElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__like-button_enabled')
    })

    const imageButton = postElement.querySelector('.element__image');
    imageButton.addEventListener('click', () => {
        showImagePopup(postName, postLink)
    })

    return postElement;

}


/*
Функция отображения изображения в popup
*/
function showImagePopup(postName, postLink) {
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
        const newPost = createCard(item.name, item.link)
        postContainer.prepend(newPost);
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


renderInitialPosts();



