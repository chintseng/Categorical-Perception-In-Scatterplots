


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

$( "#start-button" ).click(function() {
    const colorPalette = ['D3', 'ColorBrewer']
    // const useShape = ['T', 'F']
    const colorChoice = colorPalette[getRandomInt(2)]
    const taskNum = getRandomInt(6)
    localStorage.removeItem('taskData');
    localStorage.setItem('taskData', JSON.stringify({'task_id': taskNum, 'color': colorChoice}))
    window.location.href = "task.html?task="+taskNum.toString()+"&cnt=0&color="+colorChoice;
});

