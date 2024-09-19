<!DOCTYPE html>
<html >
<head>
    <title>computer parts URL LINK</title>
</head>
<body>
    
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    <h2>URL LINK</h2>
    <a href=<?php echo htmlspecialchars($url, ENT_OUOTES, 'utf-8')?>> <?php echo htmlspecialchars($url, ENT_OUOTES, 'utf-8')?> </a>

    <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Consectetur adipiscing elit</li>
        <li>Sed do eiusmod tempor incididunt</li>
        <li>Ut labore et dolore magna aliqua</li>
    </ul>

    <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>

    <footer>
        <p>&copy; <?php echo date("Y"); ?> Lorem Ipsum Inc</p>
    </footer>
</body>
</html>