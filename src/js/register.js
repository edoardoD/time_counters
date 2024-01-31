// https://code.tutsplus.com/creating-pretty-popup-messages-using-sweetalert2--cms-30662t


/*
document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
*/
function scrolToLog() {
    document.getElementById("login-section").scrollIntoView();
}

function gotoNewAccount() {
    document.getElementById("register-section").scrollIntoView();
}


// seleziono gli elementi del form
//document.querySelector("register-form")=> cerca un elemento <register-form>
$(function () {

    
    marginTop = window.navbarHeight + 20; // Aggiungi 20px al margine

    let pass = document.getElementById("pass");
    let re_pass = document.getElementById("re_pass");
    register_form = document.querySelector("#register-form");

    let form_tag = "#" + register_form.id;
    // aggiungo un evento al submit del form d
    $(form_tag).submit(function (event) {
        event.preventDefault(); // previene l'invio del form
        if (pass.value === re_pass.value) {
            registerRequest($("#name").val(), $("#surname").val(), $("#email").val(), $("#re_pass").val());
        } else {

            window.generalToast.fire({
                title: 'password not matching',
                icon: 'error',
                didOpen: (toast) => {
                    document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
                }
            })
        }
    });

    let password = document.getElementById("your_pass");
    let email = document.getElementById("your_name");
    login_form = document.querySelector("#login-form");

    let login_tag = "#" + login_form.id;
    $(login_tag).submit(function (event) {
        event.preventDefault();
        loginRequest(email.value, password.value);
    })
});



function registerRequest(name, surname, email, pass) {
    // Verifica se tutti i dati sono definiti prima di procedere
    if (name && surname && email && pass) {
        console.log(name + " " + surname + " " + email + " " + pass);
        $.ajax({
            url: "php/router.php",
            type: 'POST',
            data: {
                request: 'register',
                name: name,
                surname: surname,
                email: email,
                pass: pass
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.result) {
                    window.generalToast.fire({
                        animation: true,
                        title: data.message,
                        didOpen: (toast) => {
                            document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
                        },
                        didClose: () => {
                            scrolToLog();
                        }
                    })
                } else {

                    window.generalToast.fire({
                        title: data.error,
                        icon: 'error',
                        didOpen: () => {
                            document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
                        }
                    })
                }
            },
            error: function (data, status, error) {
                window.generalToast.fire({
                    title: 'Il server non risponde',
                    icon: 'error',
                    didOpen: (toast) => {
                        document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
                    }
                })
                console.log(error);
            }
        });
    } else {
        // Se uno o più dati sono mancanti, mostra un messaggio di errore
        window.generalToast.fire({
            title: 'Assicurati di inserire tutti i dati',
            icon: 'error',
            didOpen: (toast) => {
                document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
            }
        })
    }
}


function loginRequest(email, pass) {
    console.log(email + " " + pass + " ");
    $.ajax({
        url: "php/router.php",
        type: 'POST',
        data: {
            request: 'login',
            email: email,
            pass: pass
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.result) {
                window.generalToast.fire({
                    animation: true,
                    title: data.messagge,
                    didOpen: (toast) => {
                        document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
                    },
                    didClose: () => {
                        window.location.href = "index.php?page=mainpage";
                    }
                });
            } else {
                window.generalToast.fire({
                    title: data.error,
                    icon: 'error',
                    didOpen: (toast) => {
                        document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
                    }
                })
            }
        },
        error: function (data, status, error) {
            window.generalToast.fire({
                title: 'Il server non risponde',
                icon: 'error',
                didOpen: (toast) => {
                    document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
                }
            })
            console.log(error);
        }
    });
}