function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        /*
        const formData = new FormData();
        formData.append('fileToUpload', selectedFile);

        // Esegui la richiesta AJAX per inviare l'immagine al server PHP
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload.php', true);

        // Gestisci la risposta del server
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Immagine caricata con successo.');
            } else {
                console.error('Errore durante il caricamento dell\'immagine.');
            }
        };

        // Invia il FormData contenente l'immagine
        xhr.send(formData);
        */

        $.ajax({
            url: "php/router.php",
            type: 'POST',
            data: {
                request: 'upload',
                filename: selectedFile.name,
            },
            dataType: "json",
            success: function (data) {
                if (data.result) {
                    toastMixin.fire({
                        animation: true,
                        title: data.message
                    });
                } else {
                    toastMixin.fire({
                        title: data.error,
                        icon: 'error'
                    });
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
    } else {
        console.error('Seleziona un file prima di caricare.');
    }
}
