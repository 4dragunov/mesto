/*
Класс Card, который создаёт карточку с текстом и ссылкой на изображение:*/
import {postContainer} from './script.js'
export class Card {
    constructor(postName, postLink, template) {
        this._postName = postName;
        this._postLink = postLink;
        this._template = template.cloneNode(true);
    }

    _createPost() {
        this._imgElement = this._template.querySelector('.element__image')
        this._imgElement.alt = this._postName;
        this._imgElement.src = this._postLink;
        this._template.querySelector('.element__name').textContent = this._postName;
        this._postEventListener()
        return this._template
    }

    _likePost(post){
        post.toggle('element__like-button_enabled')
    }

    _deletePost(post){
        console.log(post)
        post.remove()
        
    }

    _postEventListener(){
        const likeButton = this._template.querySelector('.element__like-button')
        const deleteButton = this._template.querySelector('.element__trash-button')
        likeButton.addEventListener('click', (evt) => {
            this._likePost(evt.target.classList)
        })
        deleteButton.addEventListener('click', () => {
            this._deletePost(this._template)
        })
   
    }

    returnPost(){
        const postElement = this._createPost()
        postContainer.prepend(postElement)
    }
}