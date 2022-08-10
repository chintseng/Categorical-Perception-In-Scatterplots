


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
    if (flag) {
        window.location.href = "qualify.html";
    } else {
        window.location.href = "notqualify.html"
    }    

});