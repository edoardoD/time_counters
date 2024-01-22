

function logOut() {

    Swal.fire({
        title: 'attenzione',
        text: 'sei sicuro di uscire?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Annulla',
    }).then((result) => {
        if (result.isConfirmed) {
            // Azione da eseguire se l'utente clicca su OK
            $.ajax({
                type: 'GET',
                dataType: "json",
                url: "php/router.php",
                data: {
                    request: 'logOut'
                },
                success: function (data) {
                    if (data.result) {
                        window.location.href = "index.php?page=home";
                    }
                },
                error: function (error) {
                    toastMixin.fire({
                        title: 'Il server non risponde',
                        icon: 'error'
                    });
                    console.log(error);
                }
            });

        }
    });
}

$(function () {
    //tutte le volte che chiamo toastmixin devo impostare anche la posizione in cui 
    // voglio che appaia e calcolare i px di margin in base alla grandezza o del footer 
    //o della navbar
    window.navbarHeight = document.querySelector('#nav-menu').offsetHeight;
    window.footerHeigt = document.querySelector('footer').offsetHeight;
    
    window.generalToast = Swal.mixin({
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
          
        },
        customClass:{
            popup:'swal2-popup-custom'
        }
    });
});