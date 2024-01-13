// https://code.tutsplus.com/creating-pretty-popup-messages-using-sweetalert2--cms-30662t


/*


document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';

*/

$(function () {

    navbarHeight = document.querySelector('#nav-menu').offsetHeight;
    var marginTop = navbarHeight + 20; // Aggiungi 20px al margine
    toastMixin = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
        },
        customClass:{
            popup:'swal2-popup-custom'
        }
    });

});



function scrolToLog() {
    document.getElementById("login").scrollIntoView();
}

function gotoNewAccount() {
    document.getElementById("login-form").scrollIntoView();
}






// seleziono gli elementi del form
//document.querySelector("register-form")=> cerca un elemento <register-form>
$(function () {
    let pass = document.getElementById("pass");
    let re_pass = document.getElementById("re_pass");
    form = document.querySelector("#register-form");

    let form_tag = "#"+form.id;
    // aggiungo un evento al submit del form d
    $(form_tag).submit(function (event) {
        event.preventDefault(); // previene l'invio del form
        if (pass.value === re_pass.value) {
            registerRequest($("#name").val(),$("#surname").val(),$("#email").val(),$("#re_pass").val());
        } else {
            toastMixin.fire({
                title: 'password not matching',
                icon: 'error'
            });
        }
    });
});

$(function() {
    password = document.getElementById("your_pass");
    email = document.getElementById("your_name");
    form = document.querySelector("#login-form");

    let form_tag = "#"+form.id;
    $(form_tag).submit(function (event){
        event.preventDefault();
        loginRequest(email.value, password.value);
    })
})

function registerRequest(name,surname,email,pass) {
    console.log(name+" "+surname+" "+email+" "+pass);
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
                toastMixin.fire({
                    animation: true,
                    title: data.messagge
                });
                
            } else {
                toastMixin.fire({
                    title: data.error,
                    icon:'error'
                });
            }
        },
        error: function (data, status, error) {
            toastMixin.fire({
                title: 'il server non risponde',
                icon:'error'
            });
            console.log(error);
        }
    });
}

function loginRequest(name, password) {
    console.log(" "+name+" "+password);
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
                toastMixin.fire({
                    animation: true,
                    title: data.messagge
                });
                
            } else {
                toastMixin.fire({
                    title: data.error,
                    icon:'error'
                });
            }
        },
        error: function (data, status, error) {
            toastMixin.fire({
                title: 'il server non risponde',
                icon:'error'
            });
            console.log(error);
        }
    });
}