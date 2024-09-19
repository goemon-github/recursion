<?php

namespace Middleware;

use Helpers\Authenticate;
use Response\FlashData;
use Response\HTTPRenderer;
use Response\Render\RedirectRenderer;

class AuthenticatedMiddleware implements Middleware
{
    public function handle(callable $next): HTTPRenderer
    {
        error_log('Running authentication check...');
        if(!Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'Must login to view this page.');
            return new RedirectRenderer('login');
        }

        return $next();
    }
}
ミドルウェアを介して URL 署名をチェックします。
ミドルウェアを通してリンクが期限切れでないことを確認します。
ルート内で、ユーザーの詳細が URL パラメータと一致していることを確認します。
ルート内で、データベースの email_verified 列を更新します。