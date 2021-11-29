let formElement = document.querySelector('.popup__form');

let EditButtonPopup = document.querySelector('.profile__edit-button');
let CloseButtonPopup = document.querySelector('.popup__close-button');

let popupForm = document.querySelector('.popup');

let currentName = document.querySelector('.profile__name');
let currentJob = document.querySelector('.profile__description');

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
    if (popupForm.classList.contains('popup_enabled')) {
        popupForm.classList.remove('popup_enabled')
        popupForm.classList.add('popup_disabled')
    } else {
        popupForm.classList.add('popup_enabled')
        popupForm.classList.remove('popup_disabled')
    }
}

/*
Функция заменяет имя и работу в профиле страницы.
*/
function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = formElement.querySelector('.popup__input_name').value;
    let jobInput = document.querySelector('.popup__input_description').value;

    if (FormValidate(nameInput)) {
        currentName.innerHTML = nameInput
    }
    if (FormValidate(jobInput)) {
        currentJob.innerHTML = jobInput
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

    let nameInput = document.querySelector('.popup__input_name')
    let descriptionInput = document.querySelector('.popup__input_description')

    nameInput.value = textName;
    descriptionInput.value = textJob;

}

EditButtonPopup.addEventListener('click', PopupProfileEdit);
formElement.addEventListener('submit', formSubmitHandler);
CloseButtonPopup.addEventListener('click', FormShowHide);

