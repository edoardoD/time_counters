<?php

// Controlla se l'utente è autenticato
if (!isset($_SESSION['username'])) {
    die(json_encode(["result" => false, "error" => "Utente non loggato, impossibile caricare i post"]));
}

try {
    $connessione = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);
    
    // Verifica la connessione al database
    if ($connessione->connect_error) {
        die(json_encode(["result" => false, "error" => "Connessione non riuscita: " . $connessione->connect_error]));
    }

    // Ottieni l'username dalla variabile di sessione
    $username = $_SESSION['username'];

    // Query per ottenere i post dell'utente con commenti
    $query = "SELECT p.*, u.nome AS nome_utente, u.cognome AS cognome_utente, u.profileImage, i.path_img, COUNT(c.id) AS comments
    FROM POST p
    JOIN UTENTI u ON p.utente = u.email
    LEFT JOIN IMMAGINI i ON p.id_post = i.id_post
    LEFT JOIN COMMENTI c ON p.id_post = c.id_post
    WHERE p.utente IN (SELECT SEGUITI.utente2 FROM SEGUITI WHERE SEGUITI.utente1 = ?)
    GROUP BY p.id_post, u.nome, u.cognome, u.profileImage, i.path_img, p.utente;
    "; 
    $stmt = $connessione->prepare($query);

    // Verifica la preparazione della query
    if ($stmt === false) {
        die(json_encode(["result" => false, "error" => "Errore della preparazione della query: " . $connessione->error]));
    }

    // Lega i parametri
    $stmt->bind_param("s", $username);

    // Esegui la query
    if (!$stmt->execute()) {
        die(json_encode(["result" => false, "error" => "Errore nell'esecuzione della query: " . $stmt->error]));
    }

    // Ottieni i risultati
    $result = $stmt->get_result();

    $dir = "php/postImages/";
    $dirImgProfile = "php/NuovaCartella"; // Questo sarà il nome della cartella contenente le immagini profilo
    // Verifica se ci sono risultati
    if ($result) {
        $posts = [];
        // Stampa i risultati
        while ($row = $result->fetch_assoc()) {
            $post = [
                'id' => $row['id_post'],
                'descrizione' => $row['descrizione'],
                'username' => $row['utente'],
                'likes' => $row['likes'],
                'nome' => $row['nome_utente'],
                'profileImage' => $dirImgProfile . $row['profileImage'],
                'comments' => $row['comments'], 
                'path_img' => $dir . $row['path_img'],
            ];
            $posts[] = $post;
        }
        
        die(json_encode(["result" => true, "posts" => $posts], JSON_UNESCAPED_UNICODE));
    } else {
        die(json_encode(["result" => false, "error" => "Nessun post trovato per l'utente"]));
    }
} catch (Exception $e) {
    die(json_encode(["result" => false, "error" => "Errore generico: " . $e->getMessage()]));
} finally {
    // Chiudi la connessione al database solo se è stata aperta con successo
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($connessione)) {
        $connessione->close();
    }
}

?>
