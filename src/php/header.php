<nav class="nav-bar">
    <ul>
        <li>
            <a href="<?php echo $_SERVER['PHP_SELF']."?page=home"?>">home</a>
        </li>
        <li>
            <a href="<?php echo $_SERVER['PHP_SELF']."?page=about"?>">about</a>
        </li>
        <li>
            <a href="<?php echo $_SERVER['PHP_SELF']."?page=login"?>">login</a>
        </li>
       
            <?php 
                // Questo script mostra un link alla dashboard se l'utente è loggato
                if (isset($_SESSION['user'])) {
                // Usa le virgolette doppie per le stringhe e concatena con il punto
                 echo "<li>";
                 echo "<a href='" . $_SERVER['PHP_SELF'] . "?page=dashboard'>dashboard</a>";
                    echo "</li>";
                }
            ?>
        
    </ul>
</nav>