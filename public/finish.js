
const urlParams = new URLSearchParams(window.location.search);

const code = urlParams.get('code');

$(document).ready(function(){  
    $("#code-text").text(code)
  });