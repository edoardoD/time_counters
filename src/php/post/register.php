<?php


$conn = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);

// Verifica della connessione
if ($conn->connect_error) {
    die(json_encode(["result"=>false,"error"=>"connessione non riuscita". $conn->connect_error]));
}

$name = $_POST["name"];
$surname = $_POST["surname"];
$email = $_POST["email"];
$password = $_POST["pass"];

if (empty($password)) {
    die(json_encode(["result"=>false,"error"=>"la password non può essere vuota". $conn->connect_error]));
}
// Utilizzo di istruzioni preparate per evitare SQL injection
$stmt = $conn->prepare("INSERT INTO UTENTI (email, nome, cognome, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $email, $name, $surname, $password);
if ($stmt->execute()) {
    die(json_encode(["result"=>true,"message"=>"Utente registrato con successo"]));
}
// Chiudi la dichiarazione preparata
$stmt->close();

// Chiudi la connessione al database
$conn->close();
?>