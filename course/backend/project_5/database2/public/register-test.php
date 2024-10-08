<?php
// エラーメッセージを格納する配列を初期化します
session_start();

error_log("Current Session ID: " . session_id());
session_regenerate_id(); 
error_log("New Session ID generated: " . session_id());
$errors = [];
$success = false;

// フォームが送信されたかどうかをチェックします
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $retype_password = $_POST['retype_password'] ?? '';
    $agreement = isset($_POST['agreement']);
    $newsletter = isset($_POST['newsletter']);

    // 入力を検証します
    if (empty($username)) $errors[] = 'Username is required.';

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required.';

    if (strlen($password) < 8) $errors[] = 'Password must be at least 8 characters long.';

    if ($password !== $retype_password) $errors[] = 'Passwords do not match.';

    if (!$agreement) $errors[] = 'You must agree to the terms and conditions.';

    // エラーがなければ、成功フラグをtrueに設定します
    $success = count($errors) === 0;
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Register</title>
    </head>
    <body>

    <?php if ($success): ?>
        <p style="color: green;">successful</p>
    <?php else: ?>
        <form action="" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br>

            <label for="retype_password">Retype Password:</label>
            <input type="password" id="retype_password" name="retype_password" required><br>

            <input type="checkbox" id="agreement" name="agreement">
            <label for="agreement">I agree to the terms and conditions</label><br>

            <input type="checkbox" id="newsletter" name="newsletter">
            <label for="newsletter">Subscribe to newsletter</label><br>

            <input type="submit" value="Register">
        </form>

        <!-- エラーメッセージを表示します -->
        <?php if (!empty($errors)): ?>
            <div style="color: red;">
                <p>Error:</p>
                <ul>
                    <?php foreach ($errors as $error): ?>
                        <li><?= htmlspecialchars($error) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

    <?php endif; ?>

    </body>
</html>