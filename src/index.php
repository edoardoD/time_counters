<!-- https://unibowebprogramming.altervista.org/social/ -->

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $_GET['page']?></title>
        
        <script src="https://code.jquery.com/jquery-3.7.1.js"
                integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
                crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link rel="stylesheet" href="css/index.css">
        


        
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