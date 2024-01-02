<!-- https://unibowebprogramming.altervista.org/social/ -->

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $_GET['page']?></title>
        <!-- link bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <!-- link css statico -->
        <link rel="stylesheet" href="css/index.css">
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        
        

        
        <?php require "php/paginator.php"?>
        <?php include "php/nav.php"?>
    </body>

    <footer id="footer">
        <div class="container">
            <div class="row">
                <div class="col">
                    <i class="fas fa-info-circle" id="info" data-link="/link-alla-pagina-generale"></i>
                    <i class="fas fa-user-circle" id="profile" data-link="/link-al-tuo-profilo"></i>
                    <i class="fas fa-search" id="search" data-link="/link-alla-ricerca"></i>
                </div>
            </div>
        </div>
    </footer>
    
</html>