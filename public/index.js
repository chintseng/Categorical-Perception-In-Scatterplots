
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

$( "#start-button" ).click(function() {
  const categoryNum = $('#category-num-select').val();
  const pointNum = $('#point-num-select').val();
  const color = $('#color-select').val();
  const level = $('#level-select').val();
  let shape = 'false'
  if ($('#shapeCheck').is(':checked')) {
    shape = 'true'
  }
  window.location.href = "task.html?task="+getRandomInt(6).toString()+"&cnt=0";
});

