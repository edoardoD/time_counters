<?php
    require_once "jsonHeader.php";
    require_once "globals.php";

    $requests = [
        'login' => login,
        'register' => register
    ];
    if(isset($_POST['request'])){
        if(array_key_exists($_POST['request'], $requests)){
            $requests[$_POST['request']]();
        }
        else{
            die(json_encode(["result"=>false, "error"=>"richiesta non valida"]));
        }
    }
    else{
        die(json_encode(["result"=>false, "error"=>"nessun parametro impostato"]));
    }

    function login() {
        $conn = mysqli_connect($GLOBALS['host'],$GLOBALS['user'],$GLOBALS['password'],$GLOBALS['dbName']);
        if (!$conn){
            die(json_encode(["result"=>false,"error"=>"connessione non riuscita"]));
        }
        else{
            $username = $_POST['username'];
            $password = $_POST['password'];
            $query = "SELECT * FROM UTENTI WHERE email = '$username' AND Password = '$password'";
            $result= mysqli_query($conn,$query);
            if($result){
                $row= mysqli_fetch_assoc($result);
                if($row){
                    session_unset();
                    session_start();
                    $_SESSION['user'] = $row['email'];
                    $_SESSION['lingua'] = $row['lingua'];
                    die(json_encode(["result" => true, "hi" => "ben arrivayto ".$_SESSION['user']]));
                }
                else{
                    die(json_encode("username o password errati"));
                }
            }
            else{
                die(json_encode("errore nella query"));
            }
        }
        mysqli_close($conn);
    }

    function register() {
        $conn = mysqli_connect($GLOBALS['host'],$GLOBALS['user'],$GLOBALS['password'],$GLOBALS['dbName']);
        if (!$conn){
            die(json_encode(["result"=>false,"error"=>"connessione non riuscita"]));
        }
        else{

            $email = $_POST['username'];
            $nome = $_POST['name'];
            $cognome = $_POST['surname'];
            $password = $_POST['password'];
               
            
            $query = "INSERT INTO UTENTI (email, nome, cognome, password) 
                    VALUES ('$email', '$nome', '$cognome', '$password')";
            

            $result= mysqli_query($conn,$query);
            if($result){
                die(json_encode(["result" => true, "msg"=>"registrazione avvenuta con successo"]));
            }
            else{
                $str = "errore nella query".$email." ".$nome." ".$cognome." ".$password." ".$nazionalita." ".$telefono." ".$lingua;
                die(json_encode(["result"=>false, "error"=> $str]));
            }
        }
        mysqli_close($conn);
    }
?>