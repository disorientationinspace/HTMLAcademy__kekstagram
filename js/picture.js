(function() {
  var getURL = "https://javascript.pages.academy/kekstagram/data";
  var imageFilters = document.querySelector(".img-filters");
  function setup() {
    window.backend.download(getURL, onLoad);
  }

  function onLoad(pics) {
    imageFilters.classList.remove("img-filters--inactive");
    window.pictures = pics;
    window.renderPictures(pics);
  }

  setup();

})();
