(function() {
  var filter_default = document.querySelector("#filter-default");
  var filter_random = document.querySelector("#filter-random");
  var filter_discussed = document.querySelector("#filter-discussed");
  var pictures_layer = document.querySelector(".pictures");
  var current_filter = filter_default;

  var get_random_pictures = (pictures_list, amount) => {
    var new_list = [];
    for (var i = 0; i < amount; i++) {
      var random_index = window.utils.getRandomNumber(0, pictures_list.length);
      new_list.push(pictures_list[random_index]);
      pictures_list.splice(random_index, 1);
    }
    return new_list;
  }

  var sort_by_comments_amount_picture_list = (picture_list) => {
    picture_list.sort(
      (left, right) => right.comments.length - left.comments.length
    )
  }

  var filter_by_default = () => {
    change_active_filter(filter_default);
    clear_pictures();
    window.renderPictures(window.pictures);
  };

  var filter_by_random = () => {
    change_active_filter(filter_random);
    clear_pictures();
    var pictures_copy = window.pictures.slice();
    var random_pictures = get_random_pictures(pictures_copy, 10);
    window.renderPictures(random_pictures);
  }

  var filter_by_discussed = () => {
    change_active_filter(filter_discussed);
    clear_pictures();
    var pictures_copy = window.pictures.slice();
    sort_by_comments_amount_picture_list(pictures_copy);
    window.renderPictures(pictures_copy);
  }

  var on_filter_default_click = () => filter_by_default();
  var on_filter_random_click = () => filter_by_random();
  var on_filter_discussed_click = () => filter_by_discussed();

  var clear_pictures = () => {
    var existing_pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < existing_pictures.length; i++) {
      pictures_layer.removeChild(existing_pictures[i]);
    }
  }

  var change_active_filter = (new_filter) => {
    current_filter.classList.remove('img-filters__button--active');
    new_filter.classList.add('img-filters__button--active');
    current_filter = new_filter;
  }

  filter_default.addEventListener("click", on_filter_default_click);
  filter_random.addEventListener("click", on_filter_random_click);
  filter_discussed.addEventListener("click", on_filter_discussed_click);

})();
