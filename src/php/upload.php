<?php
// Connessione al database
$conn = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);

// Verifica della connessione
if ($conn->connect_error) {
    die(json_encode(["result" => false, "error" => "Connessione non riuscita"]));
}

$target_dir = "uploads/";  // Assicurati di avere questa cartella nel tuo progetto
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verifica se il file è un'immagine
$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
if ($check === false) {
    die(json_encode(["result" => false, "error" => "Il file non è un'immagine"]));
}

// Controlla se il file esiste già
if (file_exists($target_file)) {
    die(json_encode(["result" => false, "error" => "Il file già esiste"]));
}

// Controlla la dimensione del file
if ($_FILES["fileToUpload"]["size"] > 500000) {
    die(json_encode(["result" => false, "error" => "Il file è troppo grande"]));
}

// Consenti solo determinati formati di file
if (!in_array($imageFileType, ["jpg", "jpeg", "png", "gif"])) {
    die(json_encode(["result" => false, "error" => "Estensione non accettata"]));
}

// Se tutto è OK, carica il file
if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    // Memorizza i dati nel database
    $nomeImmagine = basename($_FILES["fileToUpload"]["name"]);

    //-------------------------------------------------------------//
    /* Da modificare, perchè vorrei inserire un id-immagine, il nome dell'immagine, e 
    o l'id utente, oppure associare l'id-immagine all'utente
    Quando riandrò a fare il caricamento (visualizzazione) delle immagini
    vedrò quali id-imm sono associati all'utente, e caricherò dal nome.jpg 
    l'immagine 
     */
    $query = "INSERT INTO IMMAGINI (Nome) VALUES ('$nomeImmagine')";
    //-------------------------------------------------------------//

    if ($conn->query($query) === TRUE) {
        die(json_encode(["result" => true, "error" => "File caricato correttamente"]));
    } else {
        die(json_encode(["result" => false, "error" => "Errore inserimento nel database"]));
    }
} else {
    die(json_encode(["result" => false, "error" => "Errore caricamento file"]));
}

// Chiudi la connessione al database
$conn->close();
