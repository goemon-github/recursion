<!DOCTYPE html>
<html>
    <head>
        <title>Lorem Ipsum</title>
    </head>
    <body>

    <h1>TEST URL LINK</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    <a href=<?php echo $url ?> > <?php echo $url?> </a>
    <a href=<?php echo htmlspecialchars($url, ENT_OUOTES, 'uTF-8') ?> > <?php  echo htmlspecialchars($url, ENT_OUOTES, 'uTF-8') ?></a>

    <h2>これはテストです</h2>


    <footer>
        <p>&copy; <?php echo date("Y"); ?> Lorem Ipsum Inc</p>
    </footer>
    </body>
</html>