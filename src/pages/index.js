import {initialCards} from "../components/utils/initialCards.js";
import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {Popup} from "../components/Popup.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {
    config,
    editButtonPopup,
    newPostButtonPopup,
    profileNameInput,
    profileJobInput,
    postContainer,
    postTemplate
} from "../components/utils/constants.js";
import './index.css';



function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data);
    formValidators['edit'].resetValidation();
    popupEditForm.close();

}

function createCard(item) {
    return new Card(item.name, item.link, postTemplate, handleCardClick).returnPost()
}

function handleAddCard(postElement) {
    section.addItem(postElement);
}

const section = new Section(
    {'items': initialCards, 'renderer': renderer},
    '.elements');

function renderer(postElement) {
    section.addItem(createCard(postElement));
}

section.renderItems();

const userInfo = new UserInfo(
    '.profile__name',
    '.profile__description'
);

function openPopupEditProfile() {
    const profileInfo = userInfo.getUserInfo();
    popupEditForm.open();
    profileNameInput.value = profileInfo.name;
    profileJobInput.value = profileInfo.description;

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
    popupNewPostForm.open();
});

const popupWithImage = new PopupWithImage('.popup_type-image');
popupWithImage.setEventListeners();
const popupEditForm = new PopupWithForm('.popup_type-profile-edit', handleProfileFormSubmit);
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

