<?php

namespace MailServies;

use Helpers\Settings;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "./vender/autoload.php";

class Mail {

    public function __construct (){
        $this->host = Settings::env('MAIL_HOST');
        $this->username = Settings::env('MAIL_USERNAME');
    }

    private function getMailServer(): PHPMailer{
        $mail = new PHPMailer(true);
        
        try{
            $mail->Host       = $this->host;                 
            $mail->SMTPAuth   = true;                             
            $mail->Username   = $this->username;
            $mail->Password   = $this->getPassword();               
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   
            $mail->Port       = 587;                              

            // パスワードをメモリ上から削除
            $this->password = null;

            return $mail;

        }catch(Exception $e){
            error_log("Mialer Error: ". $e->getMessage());
            throw new Exception("Mail setting error");
        }

    }

    private function getPassword():string {
        return Settings::env('MAIL_PASSWORD');
    }

    public function sendVerificationEmail(string $toEmail, string $url ){
            $mail = getMailServer();
        try{

            $mail->setFrom($mail->Username, 'Email Verified');
            $mail->addAddress($toEmail);

            $mail->Subject = "computer parts URL link";

            // HTMLコンテンツ
            $mail->isHTML(true);
            ob_start();
            include('Message/verificationEmail-template.php');
            $mail->Body = ob_get_clean();

            if(file_exists('Message/text/verificationEmail.txt')){
                $mail->AltBody = file_get_contents('Message/text/verificationEmail.txt');
            }else {
                throw new Exception("Text Email template not found");
            }

            $isSent = $mail->send();
            return $isSent;
        }catch(Exception $e){
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            error_log("Mailer Error: {$mail->ErrorInfo}");
            return false;
        }
    }


}