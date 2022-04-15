


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

$( "#start-button" ).click(function() {
    const colorPalette = ['D3', 'ColorBrewer']
    // const useShape = ['T', 'F']
    const colorChoice = colorPalette[getRandomInt(2)]
    const taskNum = getRandomInt(6)
    localStorage.removeItem('taskData');
    localStorage.setItem('taskData', JSON.stringify({'task_id': 'delta_0.5', 'color': 'D3'}))
    window.location.href = "task.html?task="+'delta_0.5'+"&cnt=0&color="+'D3';
});

