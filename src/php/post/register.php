<?php

require "../global.php";

$conn = new mysqli($host, $utente, $password, $database);

// Verifica della connessione
if ($conn->connect_error) {
    die(json_encode(["result"=>false,"error"=>"connessione non riuscita". $conn->connect_error]));
}

// Processa il form quando viene inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $password = $_POST["re_pass"];
    $email = $_POST["email"];

    // Puoi aggiungere ulteriori controlli di validazione qui
    if (empty($password)) {
        die(json_encode(["result"=>false,"error"=>"connessione non riuscita". $conn->connect_error]));
    }

    // Utilizzo di istruzioni preparate per evitare SQL injection
    $stmt = $conn->prepare("INSERT INTO UTENTI (email, nome, cognome, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $email, $name, $surname, $password);

    if ($stmt->execute()) {
        die(json_encode(["result"=>true,"result"=>"Utente registrato con successo"]));
    }

    // Chiudi la dichiarazione preparata
    $stmt->close();
}

// Chiudi la connessione al database
$conn->close();
?>