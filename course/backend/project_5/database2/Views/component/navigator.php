<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Computer Parts</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/random/part">Random Part</a>
                </li>
                <?php if ($user): ?>
                <li class="nav-item">
                    <a class="nav-link" href="/update/part">Update Part</a>
                </li>
                <?php endif; ?>
            </ul>
            <ul class="navbar-nav ms-auto">
                <?php if ($user): ?>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Welcome, <?php echo htmlspecialchars($user->getUsername()); ?></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                <?php else: ?>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                <?php endif; ?>

                <?php
                    use Helpers\Authenticate;
                    use Routing\Route;
                    $user = Authenticate::getAuthenticatedUser();

                    $lasts = 1 * 60 * 30;
                    $queryParameters = [
                        'id' => $user->getId(),
                        'user'=> hash('sha256', $user->getEmail()),
                        'expiration' => time() + $lasts,
                    ];

                    $testUrl = Route::create('verify/email', function(){}) -> getSignedURL($queryParameters);

                    $t = strstr($testUrl, 'signature='); 
                    $t2 = substr($t, strlen('signature='));
                    $queryParameters['signature'] = substr(strstr($testUrl, 'signature='), strlen('signature=')) ;
                    $testUrl = '/verify/email?id='.$queryParameters['id'].'&user='.$queryParameters['user'].'&expiration='.$queryParameters['expiration'].'&signature='.$queryParameters['signature'];
                ?>
                <li class="nav-item">
                    <a class="nav-link" href="<?php echo $testUrl?> "> [ TEST verify/email ] </a>
                </li>

            </ul>
        </div>
    </div>
</nav>