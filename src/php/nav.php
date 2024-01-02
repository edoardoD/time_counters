<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="<?php echo $_SERVER['PHP_SELF']."?page=home"?>">timesCounter</a>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
       <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
        <ul class= "navbar-nav" >
            <li class="nav-item">
                <a class="nav-link" href="<?php echo $_SERVER['PHP_SELF']."?page=home"?>">home</a>
            </li>
            <li class="navbar-nav">
                <a class="nav-link" href="<?php echo $_SERVER['PHP_SELF']."?page=about"?>">about</a>
            </li>
            <li class="navbar-nav">
                <a class="nav-link" href="<?php echo $_SERVER['PHP_SELF']."?page=login"?>">login</a>
            </li>
            <li class="navbar-nav">
                <a class="nav-link" href="<?php echo $_SERVER['PHP_SELF']."?page=mainpage"?>">main page</a>
            </li>
            </ul>
       </div>
    </div>
</nav>

