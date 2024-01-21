<?php
<<<<<<< HEAD

    session_destroy();

    // Check if session is destroyed
    if (!isset($_SESSION)) {
        die(json_encode(["result"=>true, "messagge"=>"Utente disconnesso correttamente"]));
    } else {
        die(json_encode(["result"=>false, "error"=>"Utente non disconnesso"]));
    }
=======
    $_SESSION = array();
    if(session_destroy()){
        die(json_encode(["result"=>true,"message"=>"logout riuscito"]));
    }
    die(json_encode(["result"=>false,"error"=>"logout non riuscito"]));
>>>>>>> 93268eea6bde1b0d3e1a0a3ac77276ceb2abbd45
    
?>