(function() {
    var bigPicture = document.querySelector(".big-picture");
    var commentsTemplate = document.querySelector(".social__comment");
    var commentsSection = document.querySelector(".social__comments");
    var commentsCounter = document.querySelector(".social__comment-count");
    var currentComments = document.querySelector(".current-comments-amount");
    var commentsLoader = document.querySelector(".social__comments-loader");
    var closeButton = document.querySelector(".big-picture__cancel");
    var overlay = document.querySelector(".overlay");
    var current_picture = null;
    var comments_amount = 0;

    var renderBigPicture = function(picture) {
      showCommentsLoader();
      comments_amount = 0;
      current_picture = picture;
      onBigPictureEvents.showBigPicture();
      bigPicture.querySelector(".big-picture__img").querySelector("img").src = picture.url;
      bigPicture.querySelector(".likes-count").textContent = picture.likes;
      bigPicture.querySelector(".comments-count").textContent = picture.comments.length;
      bigPicture.querySelector(".social__caption").textContent = picture.description;

      deleteComments();
      renderComments(picture, 5);
    }

    function deleteComments() {
      while (commentsSection.firstChild) {
        commentsSection.removeChild(commentsSection.lastChild);
      }
    }

    function renderComments(picture, amount) {
      var fragment = document.createDocumentFragment();
      var amount_needed = comments_amount + amount;
      if (amount_needed >= picture.comments.length) {
        amount_needed = picture.comments.length;
        hideCommentsLoader();
      }
      for (comments_amount; comments_amount < amount_needed; comments_amount++) {
        var comment = picture.comments[comments_amount];
        var newNodeComment = commentsTemplate.cloneNode(true);
        newNodeComment.querySelector(".social__picture").src = comment.avatar;
        newNodeComment.querySelector(".social__text").textContent = comment.message;
        fragment.appendChild(newNodeComment);
      }
      currentComments.textContent = comments_amount;
      commentsSection.appendChild(fragment);
    }

    var onCommentsLoaderClick = () => {
      renderComments(current_picture, 5);
    }

    var hideCommentsLoader = () => {
      commentsLoader.classList.add("visually-hidden");
    }

    var showCommentsLoader = () => {
      commentsLoader.classList.remove('visually-hidden');
    }

    var onBigPictureEvents = {
      showBigPicture() {
        bigPicture.classList.remove("hidden");
        document.addEventListener("keydown", onBigPictureEvents.onESCPress);
      },

      closeBigPicture() {
        bigPicture.classList.add("hidden");
        document.removeEventListener("keydown", onBigPictureEvents.onESCPress);
      },

      onESCPress(evt) {
        if (evt.keyCode === window.utils.keyCodes.ESC) onBigPictureEvents.closeBigPicture();
      },

      onCloseButtonClick() {
        onBigPictureEvents.closeBigPicture();
      },
    };

    closeButton.addEventListener("click", onBigPictureEvents.onCloseButtonClick);
    overlay.addEventListener("click", function(evt) {
      if (evt.target === this) onBigPictureEvents.closeBigPicture();
    });
    commentsLoader.addEventListener("click", onCommentsLoaderClick);

    window.bigPicture = {
      renderBigPicture,
      onBigPictureEvents,
    }
})();
