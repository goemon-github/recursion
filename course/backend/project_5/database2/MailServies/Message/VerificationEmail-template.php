<!DOCTYPE html>
<html >
<head>
    <title>computer parts URL LINK</title>
</head>
<body>
    
    <h1>署名付きURL</h1>

    <h2>以下のリンクをクリックし、メールアドレスの認証を行ってください</h2>
    <a href=<?php echo htmlspecialchars($url, ENT_QUOTES, 'utf-8')?>> <?php echo htmlspecialchars($url, ENT_QUOTES, 'utf-8')?> </a>

    <ul>
        <li>Recursion</li>
        <li>Project-5</li>
        <li>Email Verification System</li>
    </ul>

    <h3>このメールはテストメールです</h3>

    <footer>
        <p>&copy; <?php echo date("Y"); ?> Recursion Inc</p>
    </footer>
</body>
</html>