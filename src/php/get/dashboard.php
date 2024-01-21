<?php
// Connessione al database
$conn = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);

// Verifica della connessione
if ($conn->connect_error) {
    die(json_encode(["result"=>false,"error"=>"connessione non riuscita". $connessione->connect_error]));
}

// Ottieni l'username dalla variabile di sessione
$username = $_SESSION['username'];

// Query per ottenere i post dell'utente
$query = "SELECT * FROM POST WHERE utente = ?";
$stmt = $connessione->prepare($query);

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

$conn->close();
?>
