(function() {
  var effect_level_pin = document.querySelector(".effect-level__pin");
  var effect_items = document.querySelectorAll(".effects__item");
  var effect_level_input = document.querySelector(".effect-level__value");
  var effect_level = effect_level_input.getAttribute("value");
  var effect_level_depth = document.querySelector(".effect-level__depth");
  var effect_level_line = document.querySelector(".effect-level__line");
  var main_picture = document.querySelector(".img-upload__preview img");
  var current_filter_name = 'none';
  var effect_none = document.querySelector(".effects__preview--none");
  var effect_chrome = document.querySelector(".effects__preview--chrome");
  var effect_sepia = document.querySelector(".effects__preview--sepia");
  var effect_marvin = document.querySelector(".effects__preview--marvin");
  var effect_phobos = document.querySelector(".effects__preview--phobos");
  var effect_heat = document.querySelector(".effects__preview--heat");
  var scale_up = document.querySelector(".scale__control--bigger");
  var scale_down = document.querySelector(".scale__control--smaller");
  var scale_input = document.querySelector(".scale__control--value");
  var scale = {
    _value: parseInt(scale_input.value),
    change_node_value() {
      scale_input.value = scale._value + "%";
    },
    increase() {
      scale._value = scale._value < 100? scale._value + 5 : 100;
      scale.change_node_value();
      scale.apply_to_picture();
    },
    decrease() {
      scale._value = scale._value > 0? scale._value - 5 : 0;
      scale.change_node_value();
      scale.apply_to_picture();
    },
    apply_to_picture() {
      main_picture.style.transform = `scale(${scale._value / 100 + 1})`;
      console.log(main_picture)
    }
  }

  var reset_percentage = () => {
    effect_level = 20;
    effect_level_input.setAttribute("value", effect_level);

    effect_level_pin.style.cssText = `left: ${effect_level_line.offsetWidth * effect_level/100}px;`
    effect_level_depth.style.cssText = `width: ${effect_level}%`;
  }

  var change_image_filter = function(filter_name) {
    switch (filter_name) {
      case 'none':
        var style = '';
        break;
      case 'chrome':
        var style = `grayscale(${effect_level/100})`;
        break;
      case 'sepia':
        var style = ` sepia(${effect_level/100})`;
        break;
      case 'marvin':
        var style = `invert(${effect_level}%)`;
        break;
      case 'phobos':
        var style = `blur(${effect_level/100*3}px)`;
        break;
      case 'heat':
        var style = `brightness(${effect_level/100*3})`
        break;
    }
    main_picture.style.filter = style;
    console.log(main_picture)
  }


  window.pictureFilter = {
    reset_percentage,
  }

  // Drag-function

  function Coordinate(x) {
    this._x = x;
  };

  Coordinate.prototype = {
    getX() {
      return this._x;
    },

    setX(x) {
      this._x = x;
    }
  }

  effect_level_pin.addEventListener("mousedown", function(evt) {

    var start_coords = new Coordinate(evt.clientX);
    var shift = new Coordinate(0);
    var current_coords = new Coordinate(effect_level_pin.offsetLeft);
    current_coords.setX = function(x) {
      if (x > effect_level_line.offsetWidth) x = effect_level_line.offsetWidth;
      else if (x < 0) x = 0;
      this._x = x;
    }

    function on_pin_mouse_move(moveEvt) {
      if (!moveEvt.clientX > effect_level_line.offsetLeft && !moveEvt.clientX < effect_level_line.offsetLeft + effect_level_line.offsetWidth) {
        return;
      }
      shift.setX(start_coords.getX() - moveEvt.clientX);
      var pin_calculated_offset = current_coords.getX() - shift.getX();

      current_coords.setX(pin_calculated_offset);
      start_coords.setX(moveEvt.clientX);

      effect_level_pin.style.cssText = `left: ${current_coords.getX()}px;`

      var max_level_width = document.querySelector(".effect-level__line").offsetWidth;
      var current_level = effect_level_pin.offsetLeft;
      effect_level = Math.floor(current_level/max_level_width * 100);
      effect_level_input.setAttribute("value", effect_level);

      effect_level_depth.style.cssText = `width: ${effect_level}%`;
      window.debounce.single_debounce(function() {
        change_image_filter(current_filter_name)
        }
      );
    }

    function on_pin_mouse_up() {


      document.removeEventListener("mousemove", on_pin_mouse_move);
      document.removeEventListener("mouseup", on_pin_mouse_up);
    }


    document.addEventListener("mouseup", on_pin_mouse_up);
    document.addEventListener("mousemove", on_pin_mouse_move);
  })

  scale_up.addEventListener("click", scale.increase);
  scale_down.addEventListener("click", scale.decrease);

  effect_none.addEventListener("click", () => {
    reset_percentage();
    current_filter_name = "none";
    change_image_filter(current_filter_name);
  })
  effect_chrome.addEventListener("click", () => {
    reset_percentage();
    current_filter_name = "chrome";
    change_image_filter(current_filter_name);
  })
  effect_sepia.addEventListener("click", () => {
    reset_percentage();
    current_filter_name = "sepia";
    change_image_filter(current_filter_name);
  })
  effect_marvin.addEventListener("click", () => {
    reset_percentage();
    current_filter_name = "marvin";
    change_image_filter(current_filter_name);
  })
  effect_phobos.addEventListener("click", () => {
    reset_percentage();
    current_filter_name = "phobos";
    change_image_filter(current_filter_name);
  })
  effect_heat.addEventListener("click", () => {
    reset_percentage();
    current_filter_name = "heat";
    change_image_filter(current_filter_name);
  })

})();
