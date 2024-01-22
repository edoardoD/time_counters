<?php
// Controlla se la richiesta è una richiesta POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Gestisci il testo inviato
    if (isset($_POST['text'])) {
        $text = $_POST['text'];
        // Fai qualcosa con $text
    }

    // Gestisci i file inviati
    for ($i = 0; isset($_FILES['file' . $i]); $i++) {
        $file = $_FILES['file' . $i];

        // Controlla se il file è stato caricato senza errori
        if ($file['error'] == 0) {
            $fileName = $file['name'];
            $fileTmpName = $file['tmp_name'];
            $fileSize = $file['size'];
            $fileType = $file['type'];

            // Fai qualcosa con i dati del file
            // Ad esempio, sposta il file caricato in una directory di upload
            $uploadDir = '/path/to/upload/dir';
            if (move_uploaded_file($fileTmpName, $uploadDir . '/' . $fileName)) {
                echo 'File ' . $fileName . ' caricato con successo.';
            } else {
                echo 'Errore nel caricamento del file ' . $fileName;
            }
        } else {
            echo 'Errore nel caricamento del file ' . $fileName;
        }
    }
} else {
    echo 'Non è una richiesta POST';
}
?>
