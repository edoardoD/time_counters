
function scrolToLog() {
    document.getElementById("login").scrollIntoView();
}

function gotoNewAccount() {
    document.getElementById("login-form").scrollIntoView();
}

$(function () {
    $('#signup').attr('disabled', 'disabled');
    $('#agree-term').click(function () {
        if ($(this).is(':checked')) {
            $('#signup').removeAttr('disabled');
        } else {
            $('#signup').attr('disabled', 'disabled');
        }
    })
});


// $(function () {
//     $("#signup").click(function () {
//         alert($("#name").val());
        
//     })
// });

$(function () {
    // seleziono gli elementi del form
    var form = document.querySelector("register-form");
    var pass = document.getElementById("pass");
    var re_pass = document.getElementById("re_pass");
    var error = document.createElement("div"); // creo un elemento per mostrare l'errore

    // aggiungo uno stile all'elemento di errore
    error.style.color = "red";
    error.style.fontWeight = "bold";
    error.style.display = "none"; // nascondo l'elemento finché non serve

    // aggiungo l'elemento di errore al form
    form.appendChild(error);

    // aggiungo un evento al submit del form
    form.addEventListener("signup", function (e) {
        // impedisco il comportamento di default del form
        e.preventDefault();

        // controllo se le password sono uguali
        if (pass.value === re_pass.value) {
            // se sono uguali, invio il form
            $.ajax({
                type: "POST",
                url: "php/POST.php",
                data: "request=register&name=" + $("#name").val() + "&surname=" + $("#surname").val() + "&username=" + $("#email").val() + "&password=" + $("#pass").val(),
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.result) {
                        alert("registrazione effettuata");
                    } else {
                        alert("username già in uso");
                    }
                },
                error: function (data, status, error) {
                    alert("errore del server" + error);
    
                }
            });
        } else {
            // se non sono uguali, mostro l'errore
            error.textContent = "Le password non coincidono. Per favore, correggile.";
            error.style.display = "block";
        }
    });

})



