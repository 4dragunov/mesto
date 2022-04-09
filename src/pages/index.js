import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js"
import {
    config,
    editButtonPopup,
    newPostButtonPopup,
    profileNameInput,
    profileJobInput,
    postTemplate, env, editButtonAvatar
} from "../utils/constants.js";
import './index.css';
import {DeletePopupConfirm} from "../components/DeletePopupConfirm";


const api = new Api(env);

const userInfo = new UserInfo(
    '.profile__name',
    '.profile__description',
    '.profile__avatar',

);

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, userData]) => {
        section.renderItems(initialCards.reverse());
        userInfo.setUserInfo(userData);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });


const section = new Section(
    {'renderer': renderer},
    '.elements');

function handleProfileFormSubmit(data) {
    popupEditForm.statusRender(true)
    api.setUserInfo(data)
        .then(data => {
            userInfo.setUserInfo(data);
            popupEditForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEditForm.statusRender(false)
        });

}

function handleDeleteCardSubmit(postId, card) {
    console.log(postId, card)
    popupConfirmDelete.open()
    popupConfirmDelete.confirmDelete(() => {
        api.deleteCard(postId)
            .then(() => {
                popupConfirmDelete.close();
                card.remove();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    });
}


function createCard(data) {
    console.log(userInfo.getUserId())
    const post = new Card(data, userInfo.getUserId(), postTemplate, handleCardClick, handleDeleteCardSubmit)
    return post.returnPost()
    /*
        return new Card(item.name, item.link, postTemplate, handleCardClick, handleDeleteCardSubmit).returnPost()
    */
}
/*
function createCard(item) {
    const post = new Card(item.name, item.link, postTemplate, handleCardClick, handleDeleteCardSubmit)
    return post.returnPost()
    /!*
        return new Card(item.name, item.link, postTemplate, handleCardClick, handleDeleteCardSubmit).returnPost()
    *!/
}*/


function handleAddCard(postElement) {
    section.addItem(postElement);
}


function renderer(postElement) {
    section.addItem(createCard(postElement));
}

section.renderItems();



function openPopupEditProfile() {
    const profileInfo = userInfo.getUserInfo();
    popupEditForm.open();
    profileNameInput.value = profileInfo.name;
    profileJobInput.value = profileInfo.about;
    formValidators['edit'].resetValidation();

}


function handleCardFormSubmit(data) {
    popupNewPostForm.statusRender(true)
    api.addCard(data)
        .then(data => {
            const newCard = createCard({name: data.name, link: data.link});
/*
            const newCard = createCard({name: data.name, link: data.link});
*/
            handleAddCard(newCard);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupNewPostForm.statusRender(false)
            }
        )
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
editButtonAvatar.addEventListener('click', () => {
    popupEditAvatarForm.open()
})


function handleEditAvatar() {
    popupEditAvatarForm.open()
    popupEditAvatarForm.statusRender(true)
    const link = popupEditAvatarForm._getInputValues().link
    api.editAvatar(link)
        .then(link => {
            userInfo.updateAvatar(link);
            popupEditAvatarForm.close();
            console.log(link)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEditAvatarForm.statusRender(false)
        });
    formValidators['avatar_edit'].resetValidation();


}

const popupWithImage = new PopupWithImage('.popup_type-image');
popupWithImage.setEventListeners();
const popupEditForm = new PopupWithForm('.popup_type-profile-edit', handleProfileFormSubmit);
popupEditForm.setEventListeners();
const popupNewPostForm = new PopupWithForm('.popup_type-new-post', handleCardFormSubmit);
popupNewPostForm.setEventListeners();

const popupConfirmDelete = new DeletePopupConfirm('.popup_type-confirm', handleDeleteCardSubmit);
popupConfirmDelete.setEventListeners()

const popupEditAvatarForm = new PopupWithForm('.popup_type-edit-avatar', handleEditAvatar)
popupEditAvatarForm.setEventListeners()


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


