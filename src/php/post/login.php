<?php
// Verifica se il modulo è stato inviato

    // Recupera i dati dal modulo
    $email = $_POST["email"];
    $password = $_POST["pass"];

    // Connessione al database
    $connessione = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);

    // Verifica della connessione
    if ($connessione->connect_error) {
        die(json_encode(["result"=>false,"error"=>"connessione non riuscita". $connessione->connect_error]));
    }

    // Utilizzo di istruzioni preparate per evitare SQL injection
    $stmt = $connessione->prepare("SELECT * FROM UTENTI WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);

    // Esecuzione della query
    $stmt->execute();

    // Associazione dei risultati della query a delle variabili
    $stmt->bind_result($col1, $col2, $col3, $col4, $col5);

    // Recupero dei risultati
    $stmt->fetch();

    // Verifica se ci sono risultati
    if ($col1 !== null) {
        // Credenziali valide, reindirizza alla pagina di benvenuto o un'altra pagina sicura
        session_destroy();
        session_start();
        $_SESSION['username'] = $email;
        die(json_encode(["result"=>true, "messagge"=>"Utente loggato correttamente"]));
    } else {
        // Credenziali non valide, mostra un messaggio di errore
        die(json_encode(["result"=>false, "error"=>"Utente non loggato"]));
    }

    // Chiudi la dichiarazione preparata
    $stmt->close();

    // Chiudi la connessione al database
    $connessione->close();

?>

