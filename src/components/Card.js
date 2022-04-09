export class Card {
    constructor(data, user, template, handleCardClick, handleDeleteCardSubmit) {
        this._postName = data.name;
        this._postLink = data.link;
        this._postID = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._user = user
        this._postElement = template.cloneNode(true);

        this._handleCardClick = handleCardClick;
        this._handleDeleteCardSubmit = handleDeleteCardSubmit;

        this._deleteButton = this._postElement.querySelector('.element__trash-button');
        this._checkPermissions()
    }

    _checkPermissions() {
        if (this._user !== this._ownerId) {
            this._deleteButton.remove()
        }

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


    _postEventListener() {
        const likeButton = this._postElement.querySelector('.element__like-button');
        likeButton.addEventListener('click', (evt) => {
            this._likePost(evt.target.classList)
        })
/*        deleteButton.addEventListener('click', (evt) => {
            this._handleDeleteCardSubmit(this._deletePost(evt.target.closest('.element')));

        })*/
        this._deleteButton.addEventListener('click', (evt) => {
/*
            this._handleDeleteCardSubmit(this._postElement);
*/
/*
            this._handleDeleteCardSubmit();
*/
/*
            this._handleDeleteCardSubmit(this._postID, this._postElement);
*/
            this._handleDeleteCardSubmit(this._postID, evt.target.closest('.element'));


            /*
                        this.deletePost(evt.target.closest('.element'));*/


        })
     /*   deleteButton.addEventListener('click', (evt) => {
            this._deletePost(evt.target.closest('.element'));
        })*/
        this._imgElement.addEventListener('click', () => {
            this._handleCardClick(this._postName, this._postLink);
        });


    }

    returnPost() {
        return this._createPost();
    }
}