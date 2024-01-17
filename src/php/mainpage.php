<?php
// Inizializza la sessione
session_start();

// Controlla se l'utente è autenticato
if (!isset($_SESSION['username'])) {
    // Se l'utente non è autenticato, reindirizza alla pagina di login o esegui altre azioni necessarie
    die(json_encode(["result"=>false,"error"=>"Utente non loggato"]));
} 

$connessione = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);

// Verifica la connessione al database
if ($connessione->connect_error) {
    die(json_encode(["result"=>false,"error"=>"connessione non riuscita"]));
}

// Ottieni l'username dalla variabile di sessione
$username = $_SESSION['username'];

// Query per ottenere i post dell'utente
$query = "SELECT * FROM POST WHERE utente = ?";
$stmt = $connessione->prepare($query);

// Verifica la preparazione della query
if ($stmt === false) {
    die("Errore nella preparazione della query: ");
}

// Lega i parametri
$stmt->bind_param("s", $username);

// Esegui la query
$stmt->execute();

// Ottieni i risultati
$result = $stmt->get_result();

// Verifica se ci sono risultati
if ($result) {
    $posts = [];
    // Stampa i risultati
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    die(json_encode(["result"=>true, "posts"=> $posts]));
} else {
    die(json_encode(["result"=>false, "error"=>"Nessun post trovato per l'utente"]));
}

// Chiudi la connessione al database
$stmt->close();
$connessione->close();
?>
