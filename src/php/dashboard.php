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

// Ottieni l'immagine del profilo dell'utente loggato
$query_profile_image = "SELECT profileImage FROM UTENTI WHERE email = ?";
$stmt_profile_image = $conn->prepare($query_profile_image);
$stmt_profile_image->bind_param("s", $username);
$stmt_profile_image->execute();
$result_profile_image = $stmt_profile_image->get_result();
$row_image_profile = $result_profile_image->fetch_assoc();
$image = $row_image_profile['profileImage'];

$dirImgProfile = "php/NuovaCartella/"; // Questo sarà il nome della cartella contenente le immagini profilo

// Risultato finale
$result_data = [
    "result" => true,
    "num_posts" => $num_posts,
    "num_followers" => $num_followers,
    "num_following" => $num_following,
    "profileImage" => $dirImgProfile . $image,
];

// Stampa il risultato
die(json_encode($result_data));
$conn->close();

?>
