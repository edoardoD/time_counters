<?php

// Controlla se l'utente è autenticato
if (!isset($_SESSION['username'])) {
    die(json_encode(["result" => false, "error" => "Utente non loggato"]));
}

try {
    $connessione = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);
    
    // Verifica la connessione al database
    if ($connessione->connect_error) {
        die(json_encode(["result" => false, "error" => "Connessione non riuscita: " . $connessione->connect_error]));
    }

    // Ottieni l'username dalla variabile di sessione
    $username = $_SESSION['username'];

    // Query per ottenere i post dell'utente
    $query = "SELECT p.*
              FROM POST p
              JOIN SEGUITI s ON p.utente = s.utente2
              JOIN UTENTI u ON s.utente1 = u.email
              WHERE u.email = ?;";
    $stmt = $connessione->prepare($query);

    // Verifica la preparazione della query
    if ($stmt === false) {
        die(json_encode(["result" => false, "error" => "Errore della preparazione della query: " . $connessione->error]));
    }

    // Lega i parametri
    $stmt->bind_param("s", $username);

    // Esegui la query
    if (!$stmt->execute()) {
        die(json_encode(["result" => false, "error" => "Errore nell'esecuzione della query: " . $stmt->error]));
    }

    // Ottieni i risultati
    $result = $stmt->get_result();

    // Verifica se ci sono risultati
    if ($result) {
        $posts = [];
        // Stampa i risultati
        while ($row = $result->fetch_assoc()) {
            $posts[] = $row;
        }
        die(json_encode(["result" => true, "posts" => $posts], JSON_UNESCAPED_UNICODE));
    } else {
        die(json_encode(["result" => false, "error" => "Nessun post trovato per l'utente"]));
    }
} catch (Exception $e) {
    die(json_encode(["result" => false, "error" => "Errore generico: " . $e->getMessage()]));
} finally {
    // Chiudi la connessione al database
    $stmt->close();
    $connessione->close();
}
?>
