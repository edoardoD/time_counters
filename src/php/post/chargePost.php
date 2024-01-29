<?php
// Controlla se la richiesta è una richiesta POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $connessione = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);
    // Verifica la connessione al database
    if ($connessione->connect_error) {
        die(json_encode(["result" => false, "error" => "connessione non riuscita"]));
    }

    // Ottieni l'username dalla variabile di sessione
    $username = $_SESSION['username'];

    // Gestisci il testo inviato
    if (isset($_POST['text'])) {
        $text = $_POST['text'];
        // Fai qualcosa con $text
    }

    // Esegui l'inserimento nella tabella POST utilizzando prepared statement
    $query = "INSERT INTO POST (descrizione, utente) VALUES (?, ?)";
    $stmt = $connessione->prepare($query);
    $stmt->bind_param("ss", $text, $username); // Nota: la variabile $text era precedentemente non definita
    
    if ($stmt->execute()) {
        $lastInsertedId = $connessione->insert_id;
        
        // Gestisci i file inviati (immagini associate al post)
        for ($i = 0; isset($_FILES['file' . $i]); $i++) {
            $file = $_FILES['file' . $i];

            // Controlla se il file è stato caricato senza errori
            if ($file['error'] == 0) {
                $fileName = $file['name'];
                $fileTmpName = $file['tmp_name'];
                $fileSize = $file['size'];
                $fileType = $file['type'];

                // Sposta il file nella cartella img
                $uploadDir = '/path/to/img'; // Imposta il percorso corretto
                $destination = $uploadDir . '/' . $fileName;

                if (move_uploaded_file($fileTmpName, $destination)) {
                    // Esegui l'inserimento nella tabella IMMAGINI utilizzando prepared statement
                    $query = "INSERT INTO IMMAGINI (id_post, ref_img) VALUES (?, ?)";
                    $stmtImg = $connessione->prepare($query);
                    $stmtImg->bind_param("is", $lastInsertedId, $fileName);

                    if ($stmtImg->execute()) {
                        $stmtImg->close();
                    } else {
                        die(json_encode(["result" => false, "error" => "Errore1 nel caricamento del file " . $fileName]));
                    }
                } else {
                    die(json_encode(["result" => false, "error" => "Errore2 nel caricamento del file " . $fileName]));
                }
            } else {
                die(json_encode(["result" => false, "error" => "Errore3 nel caricamento del file " . $fileName]));
            }
        }
        
        die(json_encode(["result" => true, "message" => "Post caricato con successo."]));
    } else {
        die(json_encode(["result" => false, "error" => "Errore caricamento statement."]));
    }

    $stmt->close();
    // Chiudi la connessione al database
    $connessione->close();
}
?>
