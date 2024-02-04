<?php
// Your server-side code to handle the request and load the post correctly to the database

$textMessage = $_GET['textMessage'];
$user = $_SESSION['username'];
$postId = $_GET['postId'];

// Perform the necessary operations to load the post correctly to the database
try {
    $connessione = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);
    
    // Verifica la connessione al database
    if ($connessione->connect_error) {
        die(json_encode(["result" => false, "error" => "Connessione non riuscita: " . $connessione->connect_error]));
    }

    // Prepara la query da eseguire
    $stmt = $connessione->prepare("INSERT INTO COMMENTI (testo,id_post,utente) VALUES (?,?,?)");
    $stmt->bind_param("sis", $textMessage, $postId, $user);
    if (!$stmt->execute()) {
        die(json_encode(["result" => false, "error" => "Errore nell'esecuzione della query: " . $stmt->error]));
    }
    // Chiudi la connessione al database 

    $stmt->close();
    $connessione->close();
    die(json_encode(["result" => true, "message" => "Commento inserito correttamente"]));



} catch (Exception $e) {
    die(json_encode(["result" => false, "error" => "Errore generico: " . $e->getMessage()]));
} finally {
    // Chiudi la connessione al database solo se è stata aperta con successo
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($connessione)) {
        $connessione->close();
    }
}


?>