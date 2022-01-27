const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


let profile = document.querySelector('.profile')
let editButtonPopup = profile.querySelector('.profile__edit-button');
let newPostButtonPopup = profile.querySelector('.profile__add-button');
let profilePopup = document.querySelector('.popup_type-profile-edit')
let newPostPopup = document.querySelector('.popup_type-new-post')
let EditProfileFormElement = profilePopup.querySelector('.popup__form');
let newPostFormElement = newPostPopup.querySelector('.popup__form');
let newPostName = newPostFormElement.querySelector('.popup__input_name');
let newPostLink = newPostFormElement.querySelector('.popup__input_description');
let imagePopup = document.querySelector('.popup_type-image')
let imagePopupLink = imagePopup.querySelector('.popup__image')
let imagePopupName = imagePopup.querySelector('.popup__image-desription')
let closeEditPopup = profilePopup.querySelector('.popup__close-button');
let closeNewPostPopup = newPostPopup.querySelector('.popup__close-button');
let closeImagePopup = imagePopup.querySelector('.popup__close-button');
let currentName = profile.querySelector('.profile__name');
let currentJob = profile.querySelector('.profile__description');
let ProfileNameInput = EditProfileFormElement.querySelector('.popup__input_name');
let ProfileJobInput = EditProfileFormElement.querySelector('.popup__input_description');


/*
Валидация формы,  проверка на длину введенного текста.
*/
function FormValidate(data) {
    return data.length > 0;
}


/*
Функция заменяет имя и работу в профиле страницы.
*/
function ProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    if (FormValidate(ProfileNameInput.value)) {
        currentName.textContent = ProfileNameInput.value;
    }
    if (FormValidate(ProfileJobInput.value)) {
        currentJob.textContent = ProfileJobInput.value;
    }
    profilePopup.classList.toggle('popup_enabled');


}

/*
Функция забирает данные из формы и создает новый пост
*/
function NewPostFormSubmitHandler(evt) {
    evt.preventDefault();
    postCreate(newPostName.value, newPostLink.value);
    newPostPopup.classList.toggle('popup_enabled');
}

/*
Функция отображает в полях формы текущие данные о пользователе
*/
function PopupProfileEdit() {
    profilePopup.classList.toggle('popup_enabled')
    let textName = currentName.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    let textJob = currentJob.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    ProfileNameInput.value = textName;
    ProfileJobInput.value = textJob;

}

/*
Функция создания поста
*/
function postCreate(postName, postLink) {
    const postContainer = document.querySelector('.elements');
    const postTemplate = document.querySelector('#post-element').content;
// клонируем содержимое тега template
    const postElement = postTemplate.querySelector('.element').cloneNode(true);
// наполняем содержимым
    postElement.querySelector('.element__image').src = postLink;
    console.log(postLink)
    postElement.querySelector('.element__name').textContent = postName;
// отображаем на странице
    postContainer.prepend(postElement);
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
}

/*
Функция отображения изображения в popup
*/
function showImagePopup(postName, postLink) {
    imagePopup.classList.add('popup_enabled');
    imagePopup.classList.remove('popup_disable');

    imagePopupLink.src = postLink;
    imagePopupName.textContent = postName;


}

/*
Функция рендера стандартных постов на странице
*/
function RenderInitialPosts() {
    initialCards.forEach(function (item) {
        postCreate(item.name, item.link)
    });
}


editButtonPopup.addEventListener('click', PopupProfileEdit);
EditProfileFormElement.addEventListener('submit', ProfileFormSubmitHandler);

newPostFormElement.addEventListener('submit', NewPostFormSubmitHandler);

newPostButtonPopup.addEventListener('click', () => {
    newPostPopup.classList.toggle('popup_enabled')
});


closeEditPopup.addEventListener('click', () => {
    profilePopup.classList.remove('popup_enabled')
    profilePopup.classList.add('popup_disabled')

});


closeNewPostPopup.addEventListener('click', () => {
    newPostPopup.classList.remove('popup_enabled')
    newPostPopup.classList.add('popup_disabled')

    /*
        #newPostPopup.classList.toggle('popup_enabled')
    */
});

closeImagePopup.addEventListener('click', () => {
/*    console.log('sdfasdfsadf')
    imagePopup.classList.remove('popup_enabled')
    imagePopup.classList.add('popup_disabled')*/
    imagePopup.classList.remove('popup_enabled')
    imagePopup.classList.add('popup_disabled')


    /*
        imagePopup.classList.toggle('popup_enabled')
    */
});


document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        if (imagePopup.classList.contains('popup_disabled') != 1) {
            imagePopup.classList.toggle('popup_disabled');
        }
    }
});

RenderInitialPosts();
