import {initialCards} from "./initialCards.js";
import {config, FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";
import {Section} from "./Section.js";
import {Popup} from "./Popup.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";
import {
    editButtonPopup,
    newPostButtonPopup,
    profileNameInput,
    profileJobInput,
    postContainer,
    postTemplate
} from "./utils/constants.js";



function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data);
    popupProfile.close();
    formValidators['edit'].resetValidation();
}

function createCard(item) {
    return new Card(item.name, item.link, postTemplate, handleCardClick)
}

function handleAddCard(postElement) {
    const newCard = postElement.returnPost();
    postContainer.prepend(newCard);
}

const section = new Section(
    {'items': initialCards, 'renderer': renderer},
    '.elements');

function renderer(postElement) {
    section.addItem(createCard(postElement).returnPost());
}

section.renderItems();

const userInfo = new UserInfo(
    '.profile__name',
    '.profile__description'
);

function openPopupEditProfile() {
    const profileInfo = userInfo.getUserInfo();
    popupProfile.open();
    profileNameInput.value = profileInfo.name.textContent;
    profileJobInput.value = profileInfo.description.textContent;

}


function handleCardFormSubmit(data) {
    const newCard = createCard({name: data.name, link: data.link});
    handleAddCard(newCard);
    popupNewPostForm.close();
    formValidators['newPost'].resetValidation();

}

function handleCardClick(name, link) {
    popupWithImage.open(name, link);


}

editButtonPopup.addEventListener('click', openPopupEditProfile);
newPostButtonPopup.addEventListener('click', () => {
    popupAddPost.open();
});


const popupProfile = new Popup('.popup_type-profile-edit');
popupProfile.setEventListeners();
const popupAddPost = new Popup('.popup_type-new-post');
popupAddPost.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_type-image');
popupWithImage.setEventListeners();
const popupEditForm = new PopupWithForm('.popup__form', handleProfileFormSubmit);
popupEditForm.setEventListeners();
const popupNewPostForm = new PopupWithForm('.popup_type-new-post', handleCardFormSubmit);
popupNewPostForm.setEventListeners();


const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name');
        //в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

