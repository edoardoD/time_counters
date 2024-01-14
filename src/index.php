<!-- https://unibowebprogramming.altervista.org/social/ -->
<!-- HTML checker: http://achecker.csr.unibo.it/checker/index.php -->
<!-- Validator: https://validator.w3.org/#validate_by_upload -->
<!-- font awensome scripts: https://cdnjs.com/libraries/font-awesome -->

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
        <!-- fot awensome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
            crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- jquery -->
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <!-- sweetalert -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.10.2/sweetalert2.all.js" 
        integrity="sha512-h+uc/rWXvhloPmX380zKn7+8D9xNiLvVMkhUW+5yIoHYD2I1wzWc/cSAbAflCohdv+AE0pOF2d8zrbQ+fiPQtA==" 
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        
        <?php require "php/paginator.php"?>
            <?php require "php/nav.php"?>

        
        <footer class="fixed-bottom bg-white " >
            <ul class="nav justify-content-center">
                <li><a href="<?php echo $_SERVER['PHP_SELF']."?page=about"?>" class="btn btn-outline-light btn-floating m-1 "><i class="fas fa-info-circle"  id="info"></i></a></li>
                <li><a href="<?php 
                    if (isset($_SESSION['username'])) {echo $_SERVER['PHP_SELF']."?page=dashboard";?>" class="btn btn-outline-light btn-floating m-1 "><i class="fas fa-user-circle " id="profile"></i></a></li> <?php } ?>
               
               <li><a href="<?php echo $_SERVER['PHP_SELF']."?page=search"?>" class="btn btn-outline-light btn-floating m-1 "><i class="fas fa-search" id="search"></i></a></li>
                <?php
                    if (isset($_GET['page']) && $_GET['page'] == 'mainpage' ) {
                        print("<li><p  class=\"btn btn-outline-light btn-floating m-1 \" ><i onclick=\"openNewPostForm()\" class=\"fa fa-solid fa-circle-plus add-post-button \"></i></p></li>");
                    }
                ?>
            </ul>
        </footer>
        
    </body>
</html>