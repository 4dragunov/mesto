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
        userInfo.setUserInfo(userData);
        section.renderItems(initialCards.reverse());
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });


const section = new Section(
    {'renderer': renderer},
    '.elements');

function handleProfileFormSubmit(data) {
    popupEditForm.renderLoading('Сохранение..')
    api.setUserInfo(data)
        .then(data => {
            userInfo.setUserInfo(data);
            popupEditForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEditForm.renderLoading('Сохранить')
        });

}

function handleLikePost(card) {
    api.setLike(card._postID)
        .then((data) => {
            card.likePost(data)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });


}


function handleDisLikePost(card) {
    api.delLike(card._postID)
        .then((data) => {
            card.likePost(data)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });

}

function handleDeleteCardSubmit(card) {
    popupConfirmDelete.open()
    popupConfirmDelete.confirmDelete(() => {
        popupConfirmDelete.renderLoading('Удаляем..')
        api.deleteCard(card._postID)
            .then(() => {
                popupConfirmDelete.close();
                card.deletePost()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupConfirmDelete.renderLoading('Да')
            });
    });
}


function createCard(data) {
    const post = new Card(data, userInfo, postTemplate, handleCardClick, handleDeleteCardSubmit, handleLikePost, handleDisLikePost)
    return post.returnPost()
}


function renderer(postElement) {
    section.addItem(createCard(postElement));
}


function openPopupEditProfile() {
    const profileInfo = userInfo.getUserInfo();
    popupEditForm.open();
    profileNameInput.value = profileInfo.name;
    profileJobInput.value = profileInfo.about;
    formValidators['edit'].resetValidation();
}

function handleCardFormSubmit(data) {
    popupNewPostForm.renderLoading('Создание..')
    api.addCard(data)
        .then(data => {
            renderer(data)
            popupNewPostForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
                popupNewPostForm.renderLoading('Создать')
            }
        )


}

function handleCardClick(name, link) {
    popupWithImage.open(name, link);


}

editButtonPopup.addEventListener('click', openPopupEditProfile);
newPostButtonPopup.addEventListener('click', () => {
    formValidators['newPost'].resetValidation();
    popupNewPostForm.open();
});
editButtonAvatar.addEventListener('click', () => {
    formValidators['avatarEdit'].resetValidation();
    popupEditAvatarForm.open()
});


function handleEditAvatar(data) {
    popupEditAvatarForm.renderLoading('Сохраняем..')
    api.editAvatar(data)
        .then(data => {
            userInfo.setUserInfo(data);
            popupEditAvatarForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEditAvatarForm.renderLoading('Сохранить')
        });


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


