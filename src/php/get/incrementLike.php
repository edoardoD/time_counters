<?php

$conn = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Funzione per incrementare il numero di like
function incrementLike($conn, $postId) {
    $postId = intval($postId);

    // Esegui la query per incrementare il numero di like nel post con l'ID specificato
    $query = "UPDATE `POST` SET `likes` = `likes` + 1 WHERE `id_post` = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $postId);

    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}

// Verifica se la richiesta è per incrementare il like
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["request"]) && $_GET["request"] == "incrementLike") {
    if (isset($_GET["postId"])) {
        $postId = $_GET["postId"];

        // Incrementa il numero di like
        $success = incrementLike($conn, $postId);

        // Invia una risposta JSON
        if ($success) {
            $response = array('result' => true, 'message' => 'Like incrementato con successo');
            echo json_encode($response);
            exit;
        } else {
            $response = array('result' => false, 'error' => 'Errore durante l\'incremento del like');
            echo json_encode($response);
            exit;
        }
    } else {
        
        $response = array('result' => false, 'error' => 'ID del post non specificato');
        echo json_encode($response);
        exit;
    }
}

// Chiudi la connessione al database
$conn->close();

?>
