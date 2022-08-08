


$( "#start-main-button" ).click(function() {
    const queryString = window.location.search
    // localStorage.setItem('taskData', JSON.stringify({'task_id': taskNum, 'color': colorSelected}))
    window.location.href = "sample.html"+queryString
    // window.location.href = "information.html?task="+taskNum+"&cnt=0&color="+colorSelected;
});
