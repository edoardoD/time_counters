
function scrolToLog() {
    document.getElementById("login").scrollIntoView();
}

function gotoNewAccount() {
    document.getElementById("login-form").scrollIntoView();
}

// $(function () {
//     $("#signup").click(function () {
//         alert($("#name").val());

//     })
// });

// seleziono gli elementi del form
//document.querySelector("register-form")=> cerca un elemento <register-form>
$(function () {
    var pass = document.getElementById("pass");
    form = document.querySelector("#register-form");
    var re_pass = document.getElementById("re_pass");
    var error = document.createElement("div"); // creo un elemento per mostrare l'errore

    // aggiungo uno stile all'elemento di errore
    error.style.color = "red";
    error.style.fontWeight = "bold";
    error.style.display = "none"; // nascondo l'elemento finché non serve

    // aggiungo l'elemento di errore al form
    form.appendChild(error);
    let form_tag = "#"+form.id;
    // aggiungo un evento al submit del form d
    $(form_tag).submit(function (event) {
        event.preventDefault(); // previene l'invio del form
        if (pass.value === re_pass.value) {
            console.log("Valori da inviare:\n" +
                "Nome: " + $("#name").val() + "\n" +
                "Cognome: " + $("#surname").val() + "\n" +
                "Username: " + $("#email").val() + "\n" +
                "Password: " + $("#pass").val());
            registerRequest($("#name").val(),$("#surname").val(),$("#email").val(),$("#pass").val());
        } else {
            // se non sono uguali, mostro l'errore
            // error.textContent = "";
            // error.style.display = "block";
            alert("Le password non coincidono. Per favore, correggile.");
        }

    });
});

function registerRequest(name,surname,email,pass) {
    $.ajax({
        type: "POST",
        url: "php/POST.php",
        data: "request=register&name=" + name + "&surname=" + surname + "&username=" + email + "&password=" + pass,
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
            console.log(data);
            console.log(status);
        }
    });
}


