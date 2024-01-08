
function scrolToLog() {
    document.getElementById("login").scrollIntoView();
}

function gotoNewAccount() {
    document.getElementById("login-form").scrollIntoView();
}

$('#signup').attr('disabled', 'disabled');
$('#agree-term').click(function() {
    if($(this).is(':checked')) {
        $('#signup').removeAttr('disabled');
    } else {
        $('#signup').attr('disabled', 'disabled');
    }
});

$.ajax({
    type:"GET",
    url: "php/GET.php",
    data: "request=lingue",
    dataType: "json",
    success: function(data){
        console.log("sto per mostrare le lingue");
        console.log(data.lingue);
        let html='';
        //ordina data.lingue in modo che inglese sia il primo
        data.lingue.sort(function(a,b){
            if(a.nome=="inglese"){
                return -1;
            }else{
                return 1;
            }
        });
        html +=`
            <option selected disabled >lista delle lingue </option>`;
        data.lingue.forEach(function(lingua){
            html +=`
                <option value="${lingua.nome}">${lingua.nome}</option>`;
        })
        $("#lingue").html(html);
    },
    error: function(data,status,error){
        alert("errore del server!");
        console.error(error);
    }
});
