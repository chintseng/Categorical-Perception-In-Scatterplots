

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  



let values = []
$( "#my-form" ).submit(function( event ) {
  event.preventDefault();
  
  $("input[name='colorblindinput']").each(function(field) {
    values.push(parseInt($(this).val()))
    console.log(field, $(this).val())
});
    console.log(values)
    const correctAns = [7, 13, 16, 8, 12, 9]

    const queryString = window.location.search;
    let flag = true
    for (let i = 0; i < 6; i++) {
        if (values[i] != correctAns[i]) {
            // alert('Not pass')
            flag = false
            
        }
    } 
    if (flag) {
        const taskNum = getRandomInt(10)
        let colorSelected
        fetch("color_name_code.json")
          .then(response => response.json())
          .then(function(json) {
            colorSelected = json[getRandomInt(10)]
            localStorage.setItem('taskData', JSON.stringify({'task_id': taskNum, 'color': colorSelected}))
            window.location.href = "qualify.html?task="+taskNum+"&cnt=0&color="+colorSelected;
        });
    } else {
        window.location.href = "notqualify.html"
    }    

});