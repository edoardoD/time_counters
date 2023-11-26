<!-- https://unibowebprogramming.altervista.org/social/ -->

<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Social Media Feed</title>
  <link rel="stylesheet" href="css/mainpage.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <script src="js/mainpage.js"></script>   
</head>
<body>
    
    <div class="content">
        <?php include "php/header.php"?>
    </div>
    
    <div class="content">
        <?php require "php/paginator.php"?>
    </div>
</body>
</html>