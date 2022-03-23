export class Card {
    constructor(postName, postLink, template, handleCardClick) {
        this._postName = postName;
        this._postLink = postLink;
        this._postElement = template.content.cloneNode(true);
        this._handleCardClick = handleCardClick;
    }

    _createPost() {
        this._imgElement = this._postElement.querySelector('.element__image')
        this._imgElement.alt = this._postName;
        this._imgElement.src = this._postLink;
        this._postElement.querySelector('.element__name').textContent = this._postName;
        this._postEventListener();
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
        likeButton.addEventListener('click', (evt) => {
            this._likePost(evt.target.classList)
        })
        deleteButton.addEventListener('click', (evt) => {
            this._deletePost(evt.target.closest('.element'));
        })
        this._imgElement.addEventListener('click', () => {
            this._handleCardClick(this._postName, this._postLink);
        });


    }

    returnPost() {
        return this._createPost();
    }
}