<!-- https://unibowebprogramming.altervista.org/social/ -->
<!-- HTML checker: http://achecker.csr.unibo.it/checker/index.php -->
<!-- Validator: https://validator.w3.org/#validate_by_upload -->

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
        <footer class="">
            <div class="container p-4 pb-0">
                <div class="row">
                    <div class="col">
                        <a href="<?php echo $_SERVER['PHP_SELF']."?page=about"?>" class="btn btn-outline-light btn-floating m-1"><i class="fas fa-info-circle"  id="info"></i></a>
                        <a href="<?php echo $_SERVER['PHP_SELF']."?page=dashboard"?>" class="btn btn-outline-light btn-floating m-1"><i class="fas fa-user-circle " id="profile"></i></a>
                        <a href="<?php echo $_SERVER['PHP_SELF']."?page=search"?>" class="btn btn-outline-light btn-floating m-1"><i class="fas fa-search" id="search"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    </body>
</html>