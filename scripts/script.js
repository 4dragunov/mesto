let profile = document.querySelector('.profile')
let editButtonPopup = profile.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup')
let formElement = popup.querySelector('.popup__form');
let closeButtonPopup = popup.querySelector('.popup__close-button');

let currentName = profile.querySelector('.profile__name');
let currentJob = profile.querySelector('.profile__description');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_description');

/*
Валидация формы,  проверка на длину введенного текста.
*/
function FormValidate(data) {
    return data.length > 0;
}

/*
Функция переключает popup форму.
Если она открыта - закрывает, если закрыта - открывает.
*/
function FormShowHide() {
    if (popup.classList.contains('popup_enabled')) {
        popup.classList.remove('popup_enabled')
        popup.classList.add('popup_disabled')
    } else {
        popup.classList.add('popup_enabled')
        popup.classList.remove('popup_disabled')
    }
}

/*
Функция заменяет имя и работу в профиле страницы.
*/
function formSubmitHandler(evt) {
    evt.preventDefault();

    if (FormValidate(nameInput.value)) {
        currentName.textContent = nameInput.value;
    }
    if (FormValidate(jobInput.value)) {
        currentJob.textContent = jobInput.value;

    }
    FormShowHide();


}

/*
Функция отображает в полях формы текущие данные о пользователе
*/
function PopupProfileEdit() {
    FormShowHide();
    let textName = currentName.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    let textJob = currentJob.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    
    nameInput.value = textName;
    jobInput.value = textJob;

}

editButtonPopup.addEventListener('click', PopupProfileEdit);
formElement.addEventListener('submit', formSubmitHandler);
closeButtonPopup.addEventListener('click', FormShowHide);

