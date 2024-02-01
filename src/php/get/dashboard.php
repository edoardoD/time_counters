<?php
// Connessione al database
$conn = new mysqli($GLOBALS['host'], $GLOBALS['utenteDB'], $GLOBALS['password'], $GLOBALS['database']);

// Verifica della connessione
if ($conn->connect_error) {
    die(json_encode(["result" => false, "error" => "Connessione non riuscita" . $conn->connect_error]));
}

// Verifica se $_SESSION['username'] è impostata
if (!isset($_SESSION['username'])) {
    die(json_encode(["result" => false, "error" => "Username non presente nella sessione"]));
}

$username = $_SESSION['username'];

// Ottieni il numero dei post associati a quell'utente
$query_num_posts = "SELECT COUNT(*) as num_posts FROM POST WHERE utente = ?";
$stmt_num_posts = $conn->prepare($query_num_posts);
$stmt_num_posts->bind_param("s", $username);
$stmt_num_posts->execute();
$result_num_posts = $stmt_num_posts->get_result();
$row_num_posts = $result_num_posts->fetch_assoc();
$num_posts = $row_num_posts['num_posts'];

// Ottieni il numero dei follower seguiti a quell'utente
$query_num_followers = "SELECT COUNT(*) as num_followers FROM SEGUITI WHERE utente2 = ?";
$stmt_num_followers = $conn->prepare($query_num_followers);
$stmt_num_followers->bind_param("s", $username);
$stmt_num_followers->execute();
$result_num_followers = $stmt_num_followers->get_result();
$row_num_followers = $result_num_followers->fetch_assoc();
$num_followers = $row_num_followers['num_followers'];

// Ottieni il numero dei seguiti relativi a quell'utente
$query_num_following = "SELECT COUNT(*) as num_following FROM SEGUITI WHERE utente1 = ?";
$stmt_num_following = $conn->prepare($query_num_following);
$stmt_num_following->bind_param("s", $username);
$stmt_num_following->execute();
$result_num_following = $stmt_num_following->get_result();
$row_num_following = $result_num_following->fetch_assoc();
$num_following = $row_num_following['num_following'];

// Ottieni i post con i relativi commenti e immagini
$query_posts = "SELECT p.*, u.nome AS nome_utente, u.cognome AS cognome_utente, u.profileImage, i.path_img, c.testo AS commento
                FROM POST p
                JOIN UTENTI u ON p.utente = u.email
                LEFT JOIN IMMAGINI i ON p.id_post = i.id_post
                LEFT JOIN COMMENTI c ON p.id_post = c.id_post
                WHERE p.utente = ?";

$stmt_posts = $conn->prepare($query_posts);
$stmt_posts->bind_param("s", $username);
$stmt_posts->execute();
$result_posts = $stmt_posts->get_result();

// Verifica se ci sono risultati per i post
$posts = [];
if ($result_posts->num_rows > 0) {
    while ($row = $result_posts->fetch_assoc()) {
        $post = [
            'id' => $row['id_post'],
            'descrizione' => $row['descrizione'],
            'utente' => $row['utente'],
            'likes' => $row['likes'],
            'nome' => $row['nome_utente'],
            'profileImage' => $row['profileImage'],
            'comments' => $row['commento'],
            'path_img' => $row['path_img'],
        ];
        $posts[] = $post;
    }
} else {
    die(json_encode(["result" => false, "error" => "Non ci sono post da mostrare"]));
}

// Risultato finale
$result_data = [
    "result" => true,
    "num_posts" => $num_posts,
    "num_followers" => $num_followers,
    "num_following" => $num_following,
    "posts" => $posts,
];

// Stampa il risultato
die(json_encode($result_data));
$conn->close();

?>
