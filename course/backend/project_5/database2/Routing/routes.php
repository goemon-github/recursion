
<?php

/*

return [
    'random/part' => 'random-part',
    'parts' => 'parts',
];
*/

/*
use Helpers\DatabaseHelper;
use Helpers\ValidationHelper;
use Response\HTTPRenderer;
use Response\Render\HTMLRenderer;
use Response\Render\JSONRenderer;
*/


/*
use Exceptions\AuthenticationFailureException;
use Helpers\ValidationHelper;
use Helpers\Authenticate;
use Models\ComputerPart;
use Models\User;
use Response\HTTPRenderer;
use Response\Render\HTMLRenderer;
use Response\Render\RedirectRenderer;
use Database\DataAccess\Implementations\ComputerPartDAOImpl;
use Database\DataAccess\DAOFactory;
use Response\Render\JSONRenderer;
use Response\FlashData;
use Types\ValueType;
*/

// ユーザー認証ミドルウェア(2)
use Exceptions\AuthenticationFailureException;
use Helpers\ValidationHelper;
use Helpers\Authenticate;
use Helpers\Settings;
use Models\ComputerPart;
use Response\FlashData;
use Response\HTTPRenderer;
use Response\Render\HTMLRenderer;
use Response\Render\RedirectRenderer;
use Response\Render\MediaRenderer;
use Database\DataAccess\DAOFactory;
use Response\Render\JSONRenderer;
use Routing\Route;
use Types\ValueType;
use Models\User;
use MailServies\Mail;





return [
    /*
    'random/part'=>function(): HTTPRenderer{
        $part = DatabaseHelper::getRandomComputerPart();

        return new HTMLRenderer('component/random-part', ['part'=>$part]);
    },
    'parts'=>function(): HTTPRenderer{
        // IDの検証
        $id = ValidationHelper::integer($_GET['id']??null);

        $part = DatabaseHelper::getComputerPartById($id);
        return new HTMLRenderer('component/parts', ['part'=>$part]);
    },
    'api/random/part'=>function(): HTTPRenderer{
        $part = DatabaseHelper::getRandomComputerPart();
        return new JSONRenderer(['part'=>$part]);
    },
    'api/parts'=>function(){
        $id = ValidationHelper::integer($_GET['id']??null);
        $part = DatabaseHelper::getComputerPartById($id);
        return new JSONRenderer(['part'=>$part]);
    },
    */

    /*
    'random/part'=>function(): HTTPRenderer{
        //$partDao = new ComputerPartDAOImpl();
        $partDao = DAOFactory::getComputerPartDAO();
        $part = $partDao->getRandom();

        if($part === null) throw new Exception('No parts are available!');

        return new HTMLRenderer('component/computer-part-card', ['part'=>$part]);
    },
    'parts'=>function(): HTTPRenderer{
        // IDの検証
        $id = ValidationHelper::integer($_GET['id']??null);

        //$partDao = new ComputerPartDAOImpl();
        $partDao = DAOFactory::getComputerPartDAO();
        $part = $partDao->getById($id);

        if($part === null) throw new Exception('Specified part was not found!');

        return new HTMLRenderer('component/computer-part-card', ['part'=>$part]);
    },
    'update/part' => function(): HTMLRenderer {
        if(!Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'Permission Denied.');
            return new RedirectRenderer('random/part');
        };

        $part = null;
        //$partDao = new ComputerPartDAOImpl();
        $partDao = DAOFactory::getComputerPartDAO();
        if(isset($_GET['id'])){
            $id = ValidationHelper::integer($_GET['id']);
            $part = $partDao->getById($id);
        }
        return new HTMLRenderer('component/update-computer-part',['part'=>$part]);
    },
    'form/update/part' => function(): HTTPRenderer {
        if(!Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'Permission Denied.');
            return new RedirectRenderer('random/part');
        };

        try {
            // リクエストメソッドがPOSTかどうかをチェックします
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Invalid request method!');
            }

            $required_fields = [
                'name' => ValueType::STRING,
                'type' => ValueType::STRING,
                'brand' => ValueType::STRING,
                'modelNumber' => ValueType::STRING,
                'releaseDate' => ValueType::DATE,
                'description' => ValueType::STRING,
                'performanceScore' => ValueType::INT,
                'marketPrice' => ValueType::FLOAT,
                'rsm' => ValueType::FLOAT,
                'powerConsumptionW' => ValueType::FLOAT,
                'lengthM' => ValueType::FLOAT,
                'widthM' => ValueType::FLOAT,
                'heightM' => ValueType::FLOAT,
                'lifespan' => ValueType::INT,
            ];

            //$partDao = new ComputerPartDAOImpl();
            $partDao = DAOFactory::getComputerPartDAO();

            // 入力に対する単純なバリデーション。実際のシナリオでは、要件を満たす完全なバリデーションが必要になることがあります。
            $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

            if(isset($_POST['id'])) $validatedData['id'] = ValidationHelper::integer($_POST['id']);

            // 名前付き引数を持つ新しいComputerPartオブジェクトの作成＋アンパッキング
            $part = new ComputerPart(...$validatedData);

            error_log(json_encode($part->toArray(), JSON_PRETTY_PRINT));

            // 新しい部品情報でデータベースの更新を試みます。
            // 別の方法として、createOrUpdateを実行することもできます。
            if(isset($validatedData['id'])) $success = $partDao->update($part);
            else $success = $partDao->create($part);

            if (!$success) {
                throw new Exception('Database update failed!');
            }

            return new JSONRenderer(['status' => 'success', 'message' => 'Part updated successfully']);
        } catch (\InvalidArgumentException $e) {
            error_log($e->getMessage()); // エラーログはPHPのログやstdoutから見ることができます。
            return new JSONRenderer(['status' => 'error', 'message' => 'Invalid data.']);
        } catch (Exception $e) {
            error_log($e->getMessage());
            return new JSONRenderer(['status' => 'error', 'message' => 'An error occurred.']);
        }
    },

    "delete/part" => function(): HTTPRenderer {

    },

    "parts/all" => function(): HTTPRenderer {

    },

    "parts/type" => function(): HTTPRenderer {

    },

    // ユーザー認証とミドルウェア
    'register'=>function(): HTTPRenderer{
        if(Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'Cannot register as you are already logged in.');
            return new RedirectRenderer('random/part');
        }

        return new HTMLRenderer('page/register');
    },

    'form/register' => function(): HTTPRenderer {
        // ユーザが現在ログインしている場合、登録ページにアクセスすることはできません。
        if(Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'Cannot register as you are already logged in.');
            return new RedirectRenderer('random/part');
        }

        try {
            // リクエストメソッドがPOSTかどうかをチェックします
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method!');

            $required_fields = [
                'username' => ValueType::STRING,
                'email' => ValueType::EMAIL,
                'password' => ValueType::PASSWORD,
                'confirm_password' => ValueType::PASSWORD,
                'company' => ValueType::STRING,
            ];

            $userDao = DAOFactory::getUserDAO();

            // シンプルな検証
            $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

            if($validatedData['confirm_password'] !== $validatedData['password']){
                FlashData::setFlashData('error', 'Invalid Password!');
                return new RedirectRenderer('register');
            }

            // Eメールは一意でなければならないので、Eメールがすでに使用されていないか確認します
            if($userDao->getByEmail($validatedData['email'])){
                FlashData::setFlashData('error', 'Email is already in use!');
                return new RedirectRenderer('register');
            }

            // 新しいUserオブジェクトを作成します
            $user = new User(
                username: $validatedData['username'],
                email: $validatedData['email'],
                company: $validatedData['company']
            );

            // データベースにユーザーを作成しようとします
            $success = $userDao->create($user, $validatedData['password']);

            if (!$success) throw new Exception('Failed to create new user!');

            // ユーザーログイン
            Authenticate::loginAsUser($user);

            FlashData::setFlashData('success', 'Account successfully created.');
            return new RedirectRenderer('random/part');
        } catch (\InvalidArgumentException $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'Invalid Data.');
            return new RedirectRenderer('register');
        } catch (Exception $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'An error occurred.');
            return new RedirectRenderer('register');
        }
    },
    'logout'=>function(): HTTPRenderer{
        if(!Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'Already logged out.');
            return new RedirectRenderer('random/part');
        }

        Authenticate::logoutUser();
        FlashData::setFlashData('success', 'Logged out.');
        return new RedirectRenderer('random/part');
    },

    'login'=>function(): HTTPRenderer{
        if(Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'You are already logged in.');
            return new RedirectRenderer('random/part');
        }

        return new HTMLRenderer('page/login');
    },
    'form/login'=>function(): HTTPRenderer{
        if(Authenticate::isLoggedIn()){
            FlashData::setFlashData('error', 'You are already logged in.');
            return new RedirectRenderer('random/part');
        }

        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method!');

            $required_fields = [
                'email' => ValueType::EMAIL,
                'password' => ValueType::STRING,
            ];

            $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

            Authenticate::authenticate($validatedData['email'], $validatedData['password']);

            FlashData::setFlashData('success', 'Logged in successfully.');
            return new RedirectRenderer('update/part');
        } catch (AuthenticationFailureException $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'Failed to login, wrong email and/or password.');
            return new RedirectRenderer('login');
        } catch (\InvalidArgumentException $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'Invalid Data.');
            return new RedirectRenderer('login');
        } catch (Exception $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'An error occurred.');
            return new RedirectRenderer('login');
        }
    },
    */

    // ユーザー認証ミドルウェア(2)

    'login' => Route::create('login', function (): HTTPRenderer {
        return new HTMLRenderer('page/login');
    })->setMiddleware(['guest']),
    'form/login' => Route::create('form/login', function (): HTTPRenderer {
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method!');

            $required_fields = [
                'email' => ValueType::EMAIL,
                'password' => ValueType::STRING,
            ];

            $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

            Authenticate::authenticate($validatedData['email'], $validatedData['password']);

            FlashData::setFlashData('success', 'Logged in successfully.');
            return new RedirectRenderer('update/part');
        } catch (AuthenticationFailureException $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'Failed to login, wrong email and/or password.');
            return new RedirectRenderer('login');
        } catch (\InvalidArgumentException $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'Invalid Data.');
            return new RedirectRenderer('login');
        } catch (Exception $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'An error occurred.');
            return new RedirectRenderer('login');
        }
    })->setMiddleware(['guest']),
    'register' => Route::create('register', function (): HTTPRenderer {
        return new HTMLRenderer('page/register');
    })->setMiddleware(['guest']),
    'form/register' => Route::create('form/register', function (): HTTPRenderer {
        try {
            // リクエストメソッドがPOSTかどうかをチェックします
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method!');

            $required_fields = [
                'username' => ValueType::STRING,
                'email' => ValueType::EMAIL,
                'password' => ValueType::PASSWORD,
                'confirm_password' => ValueType::PASSWORD,
                'company' => ValueType::STRING,
            ];

            $userDao = DAOFactory::getUserDAO();

            // シンプルな検証
            $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

            if($validatedData['confirm_password'] !== $validatedData['password']){
                FlashData::setFlashData('error', 'Invalid Password!');
                return new RedirectRenderer('register');
            }

            // Eメールは一意でなければならないので、Eメールがすでに使用されていないか確認します
            if($userDao->getByEmail($validatedData['email'])){
                FlashData::setFlashData('error', 'Email is already in use!');
                return new RedirectRenderer('register');
            }

            // 新しいUserオブジェクトを作成します
            $user = new User(
                username: $validatedData['username'],
                email: $validatedData['email'],
                company: $validatedData['company']
            );

            // データベースにユーザーを作成しようとします
            $success = $userDao->create($user, $validatedData['password']);

            if (!$success) throw new Exception('Failed to create new user!');

            // ユーザーログイン
            Authenticate::loginAsUser($user);

            // 署名付きメールを送る 
            $loginUser = Authenticate::getAuthenticatedUser();
            $queryParameters = $loginUser->generateSignedURLQueryParams();

            $signedUrl = Route::create('verify/email', function(){})->getSignedURL($queryParameters);
            $mail = new Mail();
            $mail->sendVerificationEmail(Settings::env("MAIL_TO_ADDRESS"), $signedUrl);


            FlashData::setFlashData('success', 'Account successfully created.');
            return new RedirectRenderer('random/part');
        } catch (\InvalidArgumentException $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'Invalid Data.');
            return new RedirectRenderer('register');
        } catch (Exception $e) {
            error_log($e->getMessage());

            FlashData::setFlashData('error', 'An error occurred.');
            return new RedirectRenderer('register');
        }
    })->setMiddleware(['guest']),
    'logout' => Route::create('logout', function (): HTTPRenderer {
        Authenticate::logoutUser();
        FlashData::setFlashData('success', 'Logged out.');
        return new RedirectRenderer('random/part');
    })->setMiddleware(['auth']),
    'random/part' => Route::create('random/part', function (): HTTPRenderer {
        $partDao = DAOFactory::getComputerPartDAO();
        $part = $partDao->getRandom();

        if($part === null) throw new Exception('No parts are available!');

        return new HTMLRenderer('component/computer-part-card', ['part'=>$part]);
    }),
    'parts' => Route::create('parts', function (): HTTPRenderer {
        // IDの検証
        $id = ValidationHelper::integer($_GET['id']??null);

        $partDao = DAOFactory::getComputerPartDAO();
        $part = $partDao->getById($id);

        if($part === null) throw new Exception('Specified part was not found!');

        return new HTMLRenderer('component/computer-part-card', ['part'=>$part]);
    }),

    /*
    'update/part' => Route::create('update/part', function (): HTTPRenderer {
        $part = null;
        $partDao = DAOFactory::getComputerPartDAO();
        if(isset($_GET['id'])){
            $id = ValidationHelper::integer($_GET['id']);
            $part = $partDao->getById($id);
        }
        return new HTMLRenderer('component/update-computer-part',['part'=>$part]);
    })->setMiddleware(['auth']),
    'form/update/part' => Route::create('form/update/part', function (): HTTPRenderer {
        try {
            // リクエストメソッドがPOSTかどうかをチェックします
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Invalid request method!');
            }

            $required_fields = [
                'name' => ValueType::STRING,
                'type' => ValueType::STRING,
                'brand' => ValueType::STRING,
                'modelNumber' => ValueType::STRING,
                'releaseDate' => ValueType::DATE,
                'description' => ValueType::STRING,
                'performanceScore' => ValueType::INT,
                'marketPrice' => ValueType::FLOAT,
                'rsm' => ValueType::FLOAT,
                'powerConsumptionW' => ValueType::FLOAT,
                'lengthM' => ValueType::FLOAT,
                'widthM' => ValueType::FLOAT,
                'heightM' => ValueType::FLOAT,
                'lifespan' => ValueType::INT,
            ];

            $partDao = DAOFactory::getComputerPartDAO();

            // 入力に対する単純な検証。実際のシナリオでは、要件を満たす完全なバリデーションが必要になることがあります。
            $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

            if(isset($_POST['id'])) $validatedData['id'] = ValidationHelper::integer($_POST['id']);

            // 名前付き引数を持つ新しいComputerPartオブジェクトの作成＋スプレット構文による入力
            $part = new ComputerPart(...$validatedData);

            error_log(json_encode($part->toArray(), JSON_PRETTY_PRINT));

            // 新しい部品情報でデータベースの更新を試みます
            // 別の方法として、createOrUpdateを実行することもできます
            if(isset($validatedData['id'])) $success = $partDao->update($part);
            else $success = $partDao->create($part);

            if (!$success) {
                throw new Exception('Database update failed!');
            }

            return new JSONRenderer(['status' => 'success', 'message' => 'Part updated successfully']);
        } catch (\InvalidArgumentException $e) {
            error_log($e->getMessage());// エラーログは PHP のログや stdout から見ることができます。
            return new JSONRenderer(['status' => 'error', 'message' => 'Invalid data.']);
        } catch (Exception $e) {
            error_log($e->getMessage());
            return new JSONRenderer(['status' => 'error', 'message' => 'An error occurred.']);
        }
    })->setMiddleware(['auth']),
    */
    // ユーザー認証ミドルウェア4
    'update/part' => Route::create('update/part', function (): HTTPRenderer {
        $user = Authenticate::getAuthenticatedUser();
        $part = null;
        $partDao = DAOFactory::getComputerPartDAO();
        if(isset($_GET['id'])){
            $id = ValidationHelper::integer($_GET['id']);
            $part = $partDao->getById($id);
            if($user->getId() !== $part->getSubmittedById()){
                FlashData::setFlashData('error', 'Only the author can edit this computer part.');
                return new RedirectRenderer('register');
            }
        }
        return new HTMLRenderer('component/update-computer-part',['part'=>$part]);
    })->setMiddleware(['auth']),
    'form/update/part' => Route::create('form/update/part', function (): HTTPRenderer {
        try {
            // クエストメソッドがPOSTかどうかをチェックします
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Invalid request method!');
            }
            
            $required_fields = [
                'name' => ValueType::STRING,
                'type' => ValueType::STRING,
                'brand' => ValueType::STRING,
                'modelNumber' => ValueType::STRING,
                'releaseDate' => ValueType::DATE,
                'description' => ValueType::STRING,
                'performanceScore' => ValueType::INT,
                'marketPrice' => ValueType::FLOAT,
                'rsm' => ValueType::FLOAT,
                'powerConsumptionW' => ValueType::FLOAT,
                'lengthM' => ValueType::FLOAT,
                'widthM' => ValueType::FLOAT,
                'heightM' => ValueType::FLOAT,
                'lifespan' => ValueType::INT,
            ];

            $partDao = DAOFactory::getComputerPartDAO();

            // 入力に対する単純な認証。実際のシナリオでは、要件を満たす完全な認証が必要になることがあります
            $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

            $user = Authenticate::getAuthenticatedUser();
            
            // idが設定されている場合は、認証を行います
            if(isset($_POST['id'])){
                $validatedData['id'] = ValidationHelper::integer($_POST['id']);
                $currentPart = $partDao->getById($_POST['id']);
                if($currentPart === null || $user->getId() !== $currentPart->getSubmittedById()){
                    return new JSONRenderer(['status' => 'error', 'message' => 'Invalid Data Permissions!']);
                }
            }

            $validatedData['submitted_by_id'] = $user->getId();

            $part = new ComputerPart(...$validatedData);

            error_log(json_encode($part->toArray(), JSON_PRETTY_PRINT));

            // 新しい部品情報でデータベースの更新を試みます。
            // 別の方法として、createOrUpdateを実行することもできます。
            if(isset($validatedData['id'])) $success = $partDao->update($part);
            else $success = $partDao->create($part);

            if (!$success) {
                throw new Exception('Database update failed!');
            }

            return new JSONRenderer(['status' => 'success', 'message' => 'Part updated successfully', 'id'=>$part->getId()]);
        } catch (\InvalidArgumentException $e) {
            error_log($e->getMessage());
            return new JSONRenderer(['status' => 'error', 'message' => 'Invalid data.']);
        } catch (Exception $e) {
            error_log($e->getMessage());
            return new JSONRenderer(['status' => 'error', 'message' => 'An error occurred.']);
        }
    })->setMiddleware(['auth']),

    // URL署名検証ミドルウェア3
    'test/share/files/jpg'=> Route::create('test/share/files/jpg', function(): HTTPRenderer{
        // このURLは署名を必要とするため、URLが正しい署名を持つ場合にのみ、この最終ルートコードに到達します。
        $required_fields = [
            'user' => ValueType::STRING,
            'filename' => ValueType::STRING, // 本番環境では、有効なファイルパスに対してバリデーションを行いますが、ファイルパスの単純な文字列チェックを行います。
        ];

        $validatedData = ValidationHelper::validateFields($required_fields, $_GET);
        return new MediaRenderer(sprintf("private/shared/%s/%s", $validatedData['user'],$validatedData['filename']), 'jpg');
    })->setMiddleware(['signature']),

    /*
    'test/share/files/jpg/generate-url'=> Route::create('test/share/files/jpg/generate-url', function(): HTTPRenderer{
        $required_fields = [
            'user' => ValueType::STRING,
            'filename' => ValueType::STRING, // 本番環境では、有効なファイルパスに対してバリデーションを行いますが、ファイルパスの単純な文字列チェックを行います。
        ];

        $validatedData = ValidationHelper::validateFields($required_fields, $_GET);

        return new JSONRenderer(['url'=>Route::create('test/share/files/jpg', function(){})->getSignedURL($validatedData)]);
    }),
    */
    'test/share/files/jpg/generate-url'=> Route::create('test/share/files/jpg/generate-url', function(): HTTPRenderer{

        $required_fields = [
            'user' => ValueType::STRING,
            'filename' => ValueType::STRING,
        ];

        $validatedData = ValidationHelper::validateFields($required_fields, $_GET);

        if(isset($_GET['lasts'])){
            $validatedData['expiration'] = time() + ValidationHelper::integer($_GET['lasts']);
        }

        return new JSONRenderer(['url'=>Route::create('test/share/files/jpg', function(){})->getSignedURL($validatedData)]);
    }),

    // Email System
    "verify/email"=>Route::create("verify/email", function():HTTPRenderer {
        try{


            // ログインしているユーザーを取得
            $loginUser = Authenticate::getAuthenticatedUser();

            // URLのユーザー情報を確認
            $required_fields = [
                'id' => ValueType::INT,
                'user' => ValueType::STRING,
            ];

            $validatedData = ValidationHelper::validateFields($required_fields, $_GET);

            // ログインしているユーザーがいなければエラー
            if(!$loginUser) {
                throw new Exception('user not found');
            }

            // ユーザーの詳細が URL パラメータと一致していることを確認します
            if(
                $loginUser->getId() !== $validatedData['id'] ||
                $validatedData['user'] !== hash('sha256', $loginUser->getEmail())
            ){
                FlashData::setFlashData('error', 'The URL  is incorrect or no longer valid');
                return new RedirectRenderer('random/part');
            }

            // email_verifiedを更新
            $loginUser->setEmailVerified(true);
            $userDao = DAOFactory::getUserDAO();
            $userDao ->updateEmailVerified($loginUser);


            return new RedirectRenderer('random/part');
        } catch (Exception $e) {
            error_log($e->getMessage());
            FlashData::setFlashData('error', 'An error occurred.');
            return new RedirectRenderer('register');
        }
    })->setMiddleware(['signature']),

    "verify/resend" => Route::create("verify/resend", function():HTTPRenderer {
        // 期限切れのエラーがなければセットする
        if(!$_SESSION['flash']['error']){
            FlashData::setFlashData('error', 'Your email has already been verified.');
        }
        return new HTMLRenderer('page/updateEmail');
    })->setMiddleware(['auth']),
    "form/verify/resend" => Route::create('form/verify/resend', function(): HTTPRenderer {
        try{

            // POSTの確認
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Invalid request method!');
            }

            // POSTにemailがあるか
            if(!isset($_POST['email'])){
                return new JSONRenderer(["status" => 'error', 'message' => 'エラーが発生しました。もう一度試してください']);
            };
            
            $loginUser = Authenticate::getAuthenticatedUser();

            if($_POST['email']){
                // メールアドレスの入力があればユーザーのメールアドレスを更新する

                // 簡単なメールアドレスの確認
                $required_fields = [
                    'email' => ValueType::EMAIL,
                ];
                $validatedData = ValidationHelper::validateFields($required_fields, $_POST);

                // メールアドレスが一意か確認
                $userDao = DAOFactory::getUserDAO();
                if($userDao->getByEmail($validatedData['email'])){
                    FlashData::setFlashData('error', 'Email is already in use!');
                    return new RedirectRenderer('verify/resend');
                }

                $loginUser->setEmail($validatedData['email']);
                $userDao->updateEmail($loginUser);
            }

            // 検証メールの再発行 期限:30分
            $queryParameters = $loginUser->generateSignedURLQueryParams();

            $url = Route::create('verify/email', function(){}) -> getSignedURL($queryParameters);

            // emailを送信
            $mail = new Mail();
            $mail->sendVerificationEmail(Settings::env("MAIL_TO_ADDRESS"), $url);

            return new HTMLRenderer('component/emailVerifiedPage');

        }catch(Exception $e){
            error_log($e->getMessage());
        }
    })->setMiddleware(['auth']),

];