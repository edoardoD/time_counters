<?php
// Verifica se il modulo è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera i dati dal modulo
    $email = $_POST["your_name"];
    $password = $_POST["your_pass"];

    // Credenziali di accesso al database
    $host = "localhost"; // Può variare in base al tuo server
    $nome_database = "my_unibowebprogramming";
    $nome_utente = "unibowebprogramming";
    $password_db = "aU74pudmHUeD";

    // Connessione al database
    $connessione = new mysqli($host, $nome_utente, $password_db, $nome_database);

    // Verifica della connessione
    if ($connessione->connect_error) {
        die("Connessione al database fallita: " . $connessione->connect_error);
    }

    // Utilizzo di istruzioni preparate per evitare SQL injection
    $stmt = $connessione->prepare("SELECT * FROM UTENTI WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);

    // Esecuzione della query
    $stmt->execute();

    // Associazione dei risultati della query a delle variabili
    $stmt->bind_result($col1, $col2, $col3, $col4);

    // Recupero dei risultati
    $stmt->fetch();

    // Verifica se ci sono risultati
    if ($col1 !== null) {
        // Credenziali valide, reindirizza alla pagina di benvenuto o un'altra pagina sicura
        header("Location: benvenuto.php");
        exit();
    } else {
        // Credenziali non valide, mostra un messaggio di errore
        echo "Credenziali non valide. Riprova.";
    }

    // Chiudi la dichiarazione preparata
    $stmt->close();

    // Chiudi la connessione al database
    $connessione->close();
}
?>

