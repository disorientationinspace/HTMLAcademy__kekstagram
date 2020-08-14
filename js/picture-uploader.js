(function() {
  var image_upload_input = document.querySelector('#upload-file');
  var image_upload_overlay = document.querySelector(".img-upload__overlay");
  var image_upload_close = document.querySelector(".img-upload__cancel");
  var image_upload_submit = document.querySelector(".img-upload__submit");
  var image_upload_form = document.querySelector("#upload-select-image");
  var image_hashtag_input = document.querySelector(".text__hashtags");
  var image_upload_picture = document.querySelector(".img-upload__preview img");
  var image_effect_previews = document.querySelectorAll(".effects__preview");
  var send_URL = 'https://javascript.pages.academy/kekstagram'
  var IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg', 'gif'];

  var on_image_upload_change = () => {
    var new_picture_file = image_upload_input.files[0];
    var valid = check_file_for_image(new_picture_file);

    if (valid) {
      var file_reader = new FileReader();
      file_reader.addEventListener('load', function() {
        image_upload_picture.src = file_reader.result;
        for (var i = 0; i < image_effect_previews.length; i++) {
          image_effect_previews[i].style.cssText = `background-image: url(${file_reader.result})`;
        }
      });

      file_reader.readAsDataURL(new_picture_file);
      show_image_upload_overlay();
    }
  }

  var check_file_for_image = (file) => {
    var file_name = file.name;
    return IMAGE_EXTENSIONS.some((extension) => file_name.endsWith(extension));
  }
  var on_image_upload_close_click = () => {
    window.pictureFilter.reset_percentage(); // reset before closing
    close_image_upload_overlay();
  }

  var on_image_upload_form_submit = (evt) => {
    evt.preventDefault();
    var image_hashtags = image_hashtag_input.value.split(' ');
    var invalid_too_long = image_hashtags.some(check_text_for_longness);
    var invalid_no_hashtag = !image_hashtags.some(check_for_hashtag);

    if (invalid_too_long) {
      image_hashtag_input.setCustomValidity("Hashtags are too long! (> 20 letters)")
      setTimeout(() => image_hashtag_input.setCustomValidity(''), 2000);
      return;
    }
    if (invalid_no_hashtag && image_hashtags[0] != '') {
      image_hashtag_input.setCustomValidity("Hashtags must start with '#'");
      setTimeout(() => image_hashtag_input.setCustomValidity(''), 2000);
      return;
    }

    var form_data = new FormData(image_upload_form);
    window.backend.upload(send_URL, form_data, on_load);
  }

  var on_load = (response) => {
    window.pictureFilter.reset_percentage(); // reset goes before closing;
    close_image_upload_overlay();
    console.log(response);
  }

  var show_image_upload_overlay = () => image_upload_overlay.classList.remove("hidden");
  var close_image_upload_overlay = () => image_upload_overlay.classList.add("hidden");

  var check_text_for_longness = (text) => text.length > 20;
  var check_for_hashtag = (text) => text.startsWith("#");

  image_upload_form.addEventListener("submit", on_image_upload_form_submit);
  image_upload_input.addEventListener("change", on_image_upload_change);
  image_upload_close.addEventListener("click", on_image_upload_close_click);
})();
