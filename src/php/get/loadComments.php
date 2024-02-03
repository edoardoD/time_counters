<?php


    $user = $_GET['user'];
    $postId = $_GET['postId'];

    try {
        $connessione = new mysqli($GLOBALS['host'], $GLOBALS['utente'], $GLOBALS['password'], $GLOBALS['database']);
        
        // Verifica la connessione al database
        if ($connessione->connect_error) {
            die(json_encode(["result" => false, "error" => "Connessione non riuscita: " . $connessione->connect_error]));
        }
    
        // Prepara la query da eseguire
        $stmt = $connessione->prepare(
            "SELECT c.testo as text, u.nome as author
            FROM COMMENTI c, UTENTI u 
            WHERE c.utente = u.email 
            AND u.email = ? AND c.id_post = ?");
        $stmt->bind_param("si",$user,$postId);
        if (!$stmt->execute()) {
            die(json_encode(["result" => false, "error" => "Errore nell'esecuzione della query: " . $stmt->error]));
        }
        $result = $stmt->get_result();
        $comments = [];
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        die(json_encode(["result" => true, "comments" => $comments]));
            
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