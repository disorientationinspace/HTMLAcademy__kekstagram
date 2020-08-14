(function() {
  var DEBOUNCE_INTERVAL = 50;

  var debouncer = function(cb) {
    var last_timeout = null;

    return function() {
      var args = arguments;
      if (last_timeout) {
        window.clearTimeout(last_timeout);
      };
      last_timeout = window.setTimeout(function() {
        cb.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    }
  }

  var last_timeout;
  var single_debounce = function(cb) {
    if (last_timeout) {
        window.clearTimeout(last_timeout);
    }
    last_timeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  window.debounce = {
    debouncer,
    single_debounce,
  }
})();
