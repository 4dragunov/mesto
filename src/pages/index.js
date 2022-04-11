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
    popupEditForm.statusRender('Сохранение..')
    api.setUserInfo(data)
        .then(data => {
            userInfo.setUserInfo(data);
            popupEditForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEditForm.statusRender('Сохранить')
        });

}

function handleLikePost(postId, card) {
    api.setLike(postId)
        .then((data) => {
            card.likePost(data)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });


}


function handleDisLikePost(postId, card) {
    api.delLike(postId)
        .then((data) => {
            card.likePost(data)
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });

}

function handleDeleteCardSubmit(postId, card) {
    popupConfirmDelete.open()
    popupConfirmDelete.confirmDelete(() => {
        popupConfirmDelete.statusRender('Удаляем..')
        api.deleteCard(postId)
            .then(() => {
                popupConfirmDelete.close();
                card.remove()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupConfirmDelete.statusRender('Да')
            });
    });
}


function createCard(data) {
    const post = new Card(data, userInfo, postTemplate, handleCardClick, handleDeleteCardSubmit, handleLikePost, handleDisLikePost)
    return post.returnPost()
}


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
    popupNewPostForm.statusRender('Создание..')
    api.addCard(data)
        .then(data => {
            const newCard = createCard(data);
            handleAddCard(newCard);
            popupNewPostForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
                popupNewPostForm.statusRender('Создать')
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
    popupEditAvatarForm.statusRender('Сохраняем..')
    api.editAvatar(data)
        .then(data => {
            userInfo.updateAvatar(data);
            popupEditAvatarForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEditAvatarForm.statusRender('Сохранить')
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


