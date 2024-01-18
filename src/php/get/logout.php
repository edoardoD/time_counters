<?php

    session_destroy();

    // Check if session is destroyed
    if (!isset($_SESSION)) {
        die(json_encode(["result"=>true, "messagge"=>"Utente disconnesso correttamente"]));
    } else {
        die(json_encode(["result"=>false, "error"=>"Utente non disconnesso"]));
    }
    
?>