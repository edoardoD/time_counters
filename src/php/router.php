<?php
require_once "jsonHeader.php";
require_once "global.php";
session_start();

$get_requests = [
    'loadPosts' => 'get/mainpage.php',
    'logOut' => 'get/logout.php',
    'dashboard' =>  'dashboard.php',
    'uploadComments' => 'get/uploadComments.php',
    'loadComments' => 'get/loadComments.php',
];

$post_requests = [
    'login' => 'post/login.php',
    'register' => 'post/register.php',
    'chargePost' => 'post/chargePost.php',
];

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    if(isset($_GET['request'])){
        if(array_key_exists($_GET['request'], $get_requests)){
            require $get_requests[$_GET['request']];
        }
        else{
            die(json_encode(["result"=>false, "error"=>"richiesta GET non gestita dal server"]));
        }
    }
    else{
        die(json_encode(["result"=>false, "error"=>"richiesta GET non valida"]));
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['request'])){
        if(array_key_exists($_POST['request'], $post_requests)){
            require $post_requests[$_POST['request']];
        }
        else{
            die(json_encode(["result"=>false, "error"=>"richiesta POST non gestita dal server"]));
        }
    }
    else{
        die(json_encode(["result"=>false, "error"=>"richiesta POST non valida "]));
    }
}

die(json_encode(["result"=>false, "error"=>"Per ora il server gestisce solo rihieste GET e POST mentre la richiesta fatta e : ".$_SERVER['REQUEST_METHOD']]));

?>