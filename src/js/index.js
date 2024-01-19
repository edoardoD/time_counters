

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