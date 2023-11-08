<?php
    // array associativo che contiene le pagine disponibili
    $pages = [
        'home' => 'html/home.html',
        'about' => 'html/about.html',
        'login' => 'html/login.html',
        'dashboard' => 'html/dashboard.html',
        'error' => 'html/404.html'
    ];
    if(isset($_GET['page'])){
        // se la pagina richiesta è presente nell'array
        if(array_key_exists($_GET['page'], $pages)){
            // richiedi la pagina
            require $pages[$_GET['page']];
        }
        else{
            // altrimenti restituisci un errore 404
            http_response_code(404);
            require $pages['error'];
        }
    }
    else{
        // se non è stata richiesta nessuna pagina, restituisci la home
        require $pages['home'];
    }    
?>