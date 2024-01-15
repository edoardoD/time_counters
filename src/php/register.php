<?php
// Connessione al database (sostituisci con i tuoi dati)
$host = "localhost"; // Può variare in base al tuo server
$nome_database = "my_unibowebprogramming";
$nome_utente = "unibowebprogramming";
$password_db = "aU74pudmHUeD";

$conn = new mysqli($host, $nome_utente, $password_db, $nome_database);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Variabile per indicare se l'inserimento è avvenuto con successo
$insertSuccess = false;

// Processa il form quando viene inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $password = $_POST["re_pass"];
    $email = $_POST["email"];

    // Puoi aggiungere ulteriori controlli di validazione qui
    if (empty($password)) {
        echo "La password non può essere vuota. Riprova.";
        exit();
    }

    // Utilizzo di istruzioni preparate per evitare SQL injection
    $stmt = $conn->prepare("INSERT INTO UTENTI (email, nome, cognome, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $email, $name, $surname, $password);

    if ($stmt->execute()) {
        $insertSuccess = true;
    }

    // Chiudi la dichiarazione preparata
    $stmt->close();
}

// Chiudi la connessione al database
$conn->close();
?>