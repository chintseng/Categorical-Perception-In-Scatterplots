
$( "#generate-button" ).click(function() {
  const categoryNum = $('#category-num-select').val();
  const pointNum = $('#point-num-select').val();
  const color = $('#color-select').val();
  const level = $('#level-select').val();
  let shape = 'false'
  if ($('#shapeCheck').is(':checked')) {
    shape = 'true'
  }
  window.location.href = "task.html?category="+categoryNum+"&point="+pointNum+"&level="+level+"&color="+color+"&shape="+shape;
});

