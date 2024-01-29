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

    // Inizializza la variabile $text
    $text = null;

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
    
        // Gestisci i file inviati (immagini associate al post)
        for ($i = 0; isset($_FILES['file' . $i]); $i++) {
            $file = $_FILES['file' . $i];
            
            // Controlla se il file è stato caricato senza errori
            if ($file['error'] == 0) {
                $fileName = $file['name'];
                $fileTmpName = $file['tmp_name'];
                $fileSize = $file['size'];
                $fileType = $file['type'];

                $destination = $_SERVER['SERVER_NAME'] . '\/images/' . $fileName;

                if (move_uploaded_file($fileTmpName, $destination)) {

                    // Query per ottenere l'ultimo id_post inserito
                    $sql = "SELECT id_post FROM POST ORDER BY id_post DESC LIMIT 1";
                    $result = $connessione->query($sql);

                    // Verifica se la query ha restituito risultati
                    if ($result->num_rows > 0) {
                        // Ottieni il risultato come array associativo
                        $row = $result->fetch_assoc();
                        
                        // Recupera l'id_post
                        $idpost = $row['id_post'];
                    }

                    $dest_string = strval($destination);

                    // Esegui l'inserimento nella tabella IMMAGINI utilizzando prepared statement
                    $query = "INSERT INTO IMMAGINI (num_img, id_post, path_img) VALUES (?,?,?)";
                    $stmtImg = $connessione->prepare($query);
                    $stmtImg->bind_param("iis", $i, $idpost, $dest_string);
                    
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
        die(json_encode(["result" => false, "error" => "Errore caricamento nella tabella POST."]));
    }

    $stmt->close();
    // Chiudi la connessione al database
    $connessione->close();
}
