
let newOptions = []
for (let i = 18; i < 66; i++) {
    newOptions.push(i)
}
var $el = $("#age-select");
// $el.empty();
$.each(newOptions, function(key, value) {
    $el.append($("<option></option>")
       .attr("value", value).text(value));
  });

for(let i = 1; i < 11; i++) {
  $('#familiar-checkbox-div').append(
    '<div class="form-check form-check-inline">'
     +'<input class="form-check-input" type="radio" name="familiarOptions" id="inlineRadio1" value="'+i.toString()+'" required>'
        +'<label class="form-check-label" for="inlineRadio1">'+i.toString()+'</label>'
    +'</div>'
  )
}

let values = {}
$( "#my-form" ).submit(function( event ) {
  // alert( "Handler for .submit() called." );
  event.preventDefault();
  
  $.each($('#my-form').serializeArray(), function(i, field) {
    values[field.name] = field.value;
});
  // const queryString = window.location.search;

  window.location.href = "colorblindScreener.html";
});