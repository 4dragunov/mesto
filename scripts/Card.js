import {showImagePopup} from './script.js'

/*
Класс Card, который создаёт карточку с текстом и ссылкой на изображение:*/
export class Card {
    constructor(postName, postLink, template) {
        this._postName = postName;
        this._postLink = postLink;
        this._postElement = template.content.cloneNode(true);
    }

    _createPost() {
        this._imgElement = this._postElement.querySelector('.element__image')
        this._imgElement.alt = this._postName;
        this._imgElement.src = this._postLink;
        this._postElement.querySelector('.element__name').textContent = this._postName;
        this._postEventListener()
        return this._postElement
    }

    _likePost(post) {
        post.toggle('element__like-button_enabled');
    }

    _deletePost(post) {
        post.remove();

    }

    _postEventListener() {
        const likeButton = this._postElement.querySelector('.element__like-button');
        const deleteButton = this._postElement.querySelector('.element__trash-button');
        const imageButton = this._postElement.querySelector('.element__image');
        likeButton.addEventListener('click', (evt) => {
            this._likePost(evt.target.classList)
        })
        deleteButton.addEventListener('click', (evt) => {
            this._deletePost(evt.target.closest('.element'))
        })
        imageButton.addEventListener('click', () => {
            showImagePopup(this._postName, this._postLink)
        })


    }

    returnPost() {
        const postElement = this._createPost()
        return postElement
    }
}