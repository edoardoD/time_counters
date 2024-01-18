<?php
// Credenziali di accesso al database
$host = "localhost"; // Può variare in base al tuo server
$nome_database = "my_unibowebprogramming";
$nome_utente = "unibowebprogramming";
$password_db = "aU74pudmHUeD";

// Connessione al database
$conn = new mysqli($host, $nome_utente, $password_db, $nome_database);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Query per ottenere i dati
$query_seguiti = "SELECT utente2 FROM SEGUITI";
$result_seguiti = $conn->query($query_seguiti);

$query_post = "SELECT id_post FROM POST";
$result_post = $conn->query($query_post);

$query_seguaci = "SELECT utente1 FROM SEGUITI";
$result_seguaci = $conn->query($query_seguaci);

// Estrarre i risultati
if ($result_seguiti->num_rows > 0) {
    $row = $result_seguiti->fetch_assoc();
    $num_followers = $row['utente2'];
} else {
    $num_followers = 0;
}

if ($result_post->num_rows > 0) {
    $row = $result_post->fetch_assoc();
    $num_posts = $row['id_post'];
} else {
    $num_posts = 0;
}

if ($result_seguaci->num_rows > 0) {
    $row = $result_seguaci->fetch_assoc();
    $num_following = $row['utente1'];
} else {
    $num_following = 0;
}

$conn->close();
?>
