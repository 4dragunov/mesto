export class Card {
    constructor(data, userInfo, template, handleCardClick, handleDeleteCardSubmit, handleLikePost, handleDisLikePost) {
        this._postElement = template.querySelector('.element').cloneNode(true);
        this._postName = data.name;
        this._postLink = data.link;
        this._postID = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;

        this._user = userInfo.getUserId()

        this._handleCardClick = handleCardClick;
        this._handleDeleteCardSubmit = handleDeleteCardSubmit;
        this._handleLikePost = handleLikePost
        this._handleDisLikePost = handleDisLikePost

        this._deleteButton = this._postElement.querySelector('.element__trash-button');
        this._likeCounter = this._postElement.querySelector('.element__like-counter')
        this._likeButton = this._postElement.querySelector('.element__like-button')
        this._checkPermissions()

        this._likeCounter.textContent = this._likes.length

    }

    _checkPermissions() {
        if (this._user !== this._ownerId) {
            this._deleteButton.remove()
        }

    }

    _likesButtonSet() {
        if (this._checkLike()) {
            this._likeButton.classList.add('element__like-button_enabled')
        }


    }


    _createPost() {
        this._imgElement = this._postElement.querySelector('.element__image')
        this._imgElement.alt = this._postName;
        this._imgElement.src = this._postLink;
        this._postElement.querySelector('.element__name').textContent = this._postName;
        this._likesButtonSet()
        this._postEventListener();
        return this._postElement
    }

    likePost(data) {
        this._likes = data.likes
        this._likeCounter.textContent = this._likes.length
        this._likeButton.classList.toggle('element__like-button_enabled')

    }


    _checkLike() {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id === this._user) {
                return true
            }
        }
    }

    deletePost() {
        this._postElement.remove()
    }


    _postEventListener() {
        this._likeButton.addEventListener('click', () => {
            if (this._checkLike()) {
                this._handleDisLikePost(this)
            } else {
                this._handleLikePost(this)

            }
        })

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteCardSubmit(this);




        })

        this._imgElement.addEventListener('click', () => {
            this._handleCardClick(this._postName, this._postLink);
        });


    }

    returnPost() {
        return this._createPost();
    }
}
