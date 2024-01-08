
function scrolToLog() {
    document.getElementById("login").scrollIntoView();
}

function gotoNewAccount() {
    document.getElementById("login-form").scrollIntoView();
}

$(function(){
    $('#signup').attr('disabled', 'disabled');
    $('#agree-term').click(function() {
        if($(this).is(':checked')) {
            $('#signup').removeAttr('disabled');
        } else {
            $('#signup').attr('disabled', 'disabled');
        }
    })
});


$(function(){
    $("#signup").click(function(){
        alert($("name").val());
        $.ajax({
            type:"POST",
            url: "php/POST.php",
            data: "request=register&name="+$("#name").val()+"&surname="+$("#surname").val()+"&tel="+$("#tel").val()+"&username="+$("#email").val()+"&password="+$("#password").val(),
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data.result){
                    alert("registrazione effettuata");
                }else{
                    alert("username già in uso"); 
                }
            },
            error: function(data,status,error){
                alert(data);
                console.error(error);
            }
        });
    })
});





