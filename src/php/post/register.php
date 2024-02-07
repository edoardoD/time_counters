<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);

    // Verifica della connessione
    if ($conn->connect_error) {
        die(json_encode(["result"=>false,"error"=>"connessione non riuscita". $conn->connect_error]));
    }


    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $email = $_POST["email"];
    $password = $_POST["pass"];
    if(isset($_FILES['profileImg'])){
        $image = $_FILES['profileImg'];
        $imgName = $image['name'];
        $path = "./profileImages/".$imgName;
    }else {
        die(json_encode(["result"=>false,"error"=>"nessun file associato all'immagine profilo "]));
    }


    if (empty($password)) {
        die(json_encode(["result"=>false,"error"=>"la password non può essere vuota". $conn->connect_error]));
    }

    if(!move_uploaded_file($image['tmp_name'],$path)){
        die(json_encode(["result"=>false,"error"=>"move_uploaded_file fallito".$path]));
    }
    // Utilizzo di istruzioni preparate per evitare SQL injection

    $stmt = $conn->prepare("INSERT INTO UTENTI (email, nome, cognome, password, profileImage) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $email, $name, $surname, $password,$imgName);
    if ($stmt->execute()) {
        die(json_encode(["result"=>true,"message"=>"Utente registrato con successo"]));
    }
    else {
        die(json_encode(["result"=>false,"error"=>"Errore durante la registrazione dell'utente"]));
    }
    // Chiudi la dichiarazione preparata
    $stmt->close();

    // Chiudi la connessione al database
    $conn->close();
}

?>