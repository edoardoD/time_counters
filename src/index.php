<!-- https://unibowebprogramming.altervista.org/social/ -->

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $_GET['page']?></title>
        <!-- link bootstrap 5 -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- link css locali -->
        <link rel="stylesheet" href="css/index.css">
        <!-- js bootstrap 5 -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <!-- script di utility -->
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

        
    <?php require "php/paginator.php"?>
    <?php require "php/nav.php"?>
    </body>
    <footer>
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