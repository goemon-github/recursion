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

        // ユーザーがログインしていない場合
        if(!Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'Must login to view this page.');
            return new RedirectRenderer('login');
            
        
        //userのemail_verifiedがfalseの場合 
        }else if(!Authenticate::isEmailVerified()){
            $parse_url= parse_url($_SERVER['REQUEST_URI']);
            $path = trim($parse_url['path'], '/');

            $deniedPaths = ['logout','verify/resend', 'form/verify/resend' ];
            if(!in_array($path, $deniedPaths)){
                return new RedirectRenderer('verify/resend');
            }
        }

        return $next();
    }
}