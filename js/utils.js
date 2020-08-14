(function() {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var keyCodes = {
    ESC: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

  var getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

  window.utils = {
    keyCodes,
    getRandomNumber,
  }
})();
