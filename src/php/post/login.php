<?php
// Verifica se il modulo è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera i dati dal modulo
    $email = $_POST["email"];
    $password = $_POST["password"];

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
    // Query per verificare le credenziali
    $query = "SELECT * FROM UTENTE WHERE email = '$email' AND password = '$password'";
    $risultato = $connessione->query($query);

    // Verifica se ci sono risultati
    if ($risultato->num_rows > 0) {
        // Credenziali valide, reindirizza alla pagina di benvenuto o un'altra pagina sicura
        header("Location: benvenuto.php");
        exit();
    } else {
        // Credenziali non valide, mostra un messaggio di errore
        echo "Credenziali non valide. Riprova.";
    }

    // Chiudi la connessione al database
    $connessione->close();
}
?>
