export class Card {
    constructor(data, userInfo, template, handleCardClick, handleDeleteCardSubmit, handleLikePost, handleDisLikePost) {
        this._postElement = template.cloneNode(true);
        this._postName = data.name;
        this._postLink = data.link;
        this._postID = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._user = userInfo.getUserId()
        this._isLiked = this._checkLike()

        this._handleCardClick = handleCardClick;
        this._handleDeleteCardSubmit = handleDeleteCardSubmit;
        this._handleLikePost = handleLikePost
        this._handleDisLikePost = handleDisLikePost

        this._deleteButton = this._postElement.querySelector('.element__trash-button');
        this._likeCounter = this._postElement.querySelector('.element__like-counter')
        this._likeButton = this._postElement.querySelector('.element__like-button')
        this._checkPermissions()
        this._likesCountSet()
    }

    _checkPermissions() {
        console.log(this._user)
        if (this._user !== this._ownerId) {
            this._deleteButton.remove()
        }

    }

    _likesCountSet() {
        this._likeCounter.textContent = this._likes.length
        if (this._isLiked) {
            this._likeButton.classList.add('element__like-button_enabled')
            this._likeButton.addEventListener('click', () => {
                this._handleDisLikePost(this._postID, this)})

        } else {
            this._likeButton.addEventListener('click', () => {
                this._handleLikePost(this._postID, this)})
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

    likePost(data) {
        this._likes = data.likes.length
        this._likeCounter.textContent = this._likes
        this._likeButton.classList.add('element__like-button_enabled')
        this._likeButton.removeEventListener('click', () => {
            this._handleLikePost(this._postID, this)
        })
        this._likeButton.addEventListener('click', () => {
            this._handleDisLikePost(this._postID, this)})

    }

    disLikePost(data) {
        this._likes = data.likes.length
        this._likeCounter.textContent = this._likes
        this._likeButton.classList.remove('element__like-button_enabled')
        this._likeButton.removeEventListener('click', () => {
            this._handleDisLikePost(this._postID, this)
        })
        this._likeButton.addEventListener('click', () => {
            this._handleLikePost(this._postID, this)
        })


    }


    _checkLike() {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id === this._user) {
                return true
            }
        }
    }


    _postEventListener() {
        /*this._likeButton.addEventListener('click', () => {
            this._handleLikePost(this._postID, this)
        })*/

       /* if (!this._isLiked) {
            this._likeButton.addEventListener('click', () => {
                this._handleLikePost(this._postID, this)
            })
        } else {

            this._likeButton.addEventListener('click', () => {
                this._handleDisLikePost(this._postID, this)
            })
        }*/


        this._deleteButton.addEventListener('click', (evt) => {
            this._handleDeleteCardSubmit(this._postID, evt.target.closest('.element'));


        })

        this._imgElement.addEventListener('click', () => {
            this._handleCardClick(this._postName, this._postLink);
        });


    }

    returnPost() {
        return this._createPost();
    }
}

/*   likeOrDislikePost(data) {
          this._likes = data.likes.length
          this._likeCounter.textContent = this._likes
          this._likeButton.classList.toggle('element__like-button_enabled')
      }

      checkLike() {
          for (let i = 0; i < this._likes.length; i++) {
              console.log(this._likes[i]._id)
              if (this._likes[i]._id === this._user) {
                  return true
              }
          }
      }*/

/*    likeOrDislikePost(data) {
        this._likes = data.likes.length
        this._likeCounter.textContent = this._likes
        this._likeButton.classList.toggle('element__like-button_enabled')
    }*/
