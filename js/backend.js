(function() {

  var download = function(url, onLoad) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener("load", function() {
      onLoad(xhr.response);
    })

    xhr.addEventListener("error", function() {
      console.log(`There was an error: ${xhr.statusText}`);
    })

    xhr.addEventListener("timeout", function() {
      console.log(`Tried to download file for ${xhr.timeout} ms, unsuccessful`)
    })

    xhr.open("GET", url);
    xhr.send();
  }

  var upload = function(url, data, onLoad) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener("load", function() {
      onLoad(xhr.response);
    })

    xhr.addEventListener("error", function() {
      console.log(`There was an error: ${xhr.statusText}`);
    })

    xhr.addEventListener("timeout", function() {
      console.log(`Tried to upload file for ${xhr.timeout} ms, unsuccessful`)
    })

    xhr.open("POST", url);
    xhr.send(data);
  }

  window.backend = {
    download,
    upload,
  }

})();
