


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

$( "#start-button" ).click(function() {
    const colorPalette = ['D3', 'ColorBrewer']
    // const useShape = ['T', 'F']
    const colorChoice = colorPalette[getRandomInt(2)]
    const taskNum = getRandomInt(2)
    localStorage.removeItem('taskData');
    localStorage.setItem('taskData', JSON.stringify({'task_id': taskNum, 'color': 'D3'}))
    window.location.href = "sample.html?task="+taskNum+"&cnt=0&color="+'D3';
});

