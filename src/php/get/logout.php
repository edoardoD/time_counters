<?php
    $_SESSION = array();
    if(session_destroy()){
        die(json_encode(["result"=>true,"message"=>"logout riuscito"]));
    }
    die(json_encode(["result"=>false,"error"=>"logout non riuscito"]));
    
?>