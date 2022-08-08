


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let colorSelected
fetch("color_name_code.json")
  .then(response => response.json())
  .then(function(json) {
    colorSelected = json[getRandomInt(10)]
 });

$( "#start-button" ).click(function() {
    const taskNum = getRandomInt(10)
    localStorage.removeItem('taskData');
    // localStorage.setItem('taskData', JSON.stringify({'task_id': taskNum, 'color': colorSelected}))
    window.location.href = "information.html"
    // window.location.href = "information.html?task="+taskNum+"&cnt=0&color="+colorSelected;
});

