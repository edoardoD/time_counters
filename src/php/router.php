<?php
require_once "jsonHeader.php";

$get_requests = [];

$post_requests = [
    'login' => 'post/login.php',
    'register' => 'post/register.php'
];

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    if(isset($_GET['request'])){
        if(array_key_exists($_GET['request'], $get_requests)){
            require_once $get_requests[$_GET['request']];
        }
        else{
            die(json_encode(["result"=>false, "error"=>"richiesta non valida"]));
        }
    }
    else{
        die(json_encode(["result"=>false, "error"=>"nessun parametro impostato"]));
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['request'])){
        if(array_key_exists($_POST['request'], $post_requests)){
            require_once $post_requests[$_POST['request']];
        }
        else{
            die(json_encode(["result"=>false, "error"=>"richiesta non valida"]));
        }
    }
    else{
        die(json_encode(["result"=>false, "error"=>"nessun parametro impostato"]));
    }
}

?>