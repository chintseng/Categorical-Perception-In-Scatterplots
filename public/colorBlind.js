


let values = []
$( "#my-form" ).submit(function( event ) {
    event.preventDefault();
  
    $("input[name='colorblindinput']").each(function(field) {
        values.push(parseInt($(this).val()))
    });

    const correctAns = [7, 13, 16, 8, 12, 9]

    let flag = true
    for (let i = 0; i < 6; i++) {
        if (values[i] != correctAns[i]) {
            flag = false
        }
    } 
    let my_current_data = JSON.parse(localStorage.getItem('taskData'))
    if (flag) {
        if (my_current_data['user_info']['qualify'] != false) {
            my_current_data['user_info']['qualify'] = true
            localStorage.setItem('taskData', JSON.stringify(my_current_data))
            window.location.href = "qualify.html";
        } else {
            window.location.href = "notqualify.html"
        }
    } else {
        my_current_data['user_info']['qualify'] = false
        localStorage.setItem('taskData', JSON.stringify(my_current_data))
        window.location.href = "notqualify.html"
    }  
});