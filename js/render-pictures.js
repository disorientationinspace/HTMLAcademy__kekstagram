(function() {
  var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  var fragment = document.createDocumentFragment();
  var picturesLayer = document.querySelector(".pictures");

  var renderPictures = function(pictures) {
    pictures.forEach((picture) => {
      var newNodePicture = pictureTemplate.cloneNode(true);
      newNodePicture.querySelector(".picture__img").src = picture.url;
      newNodePicture.querySelector(".picture__likes").textContent = picture.likes;
      newNodePicture.querySelector(".picture__comments").textContent = picture.comments.length;
      newNodePicture.addEventListener("click", function() {
        window.bigPicture.onBigPictureEvents.showBigPicture();
        window.bigPicture.renderBigPicture(picture);
      })

      fragment.appendChild(newNodePicture);
    })
    picturesLayer.appendChild(fragment);
  }

  window.renderPictures = renderPictures;

})();
