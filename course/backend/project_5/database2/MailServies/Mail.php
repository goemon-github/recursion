<?php

namespace MailServies;

use Helpers\Settings;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//require "vender/autoload.php";

require_once 'vendor/autoload.php';

class Mail {

    private function getMailServer(): PHPMailer{
        $mail = new PHPMailer(true);
        
        try{
            $mail->Host       = Settings::env('MAIL_HOST');
            $mail->SMTPAuth   = true;                             
            $mail->Username   = Settings::env('MAIL_USERNAME');
            $mail->Password   = $this->getPassword();               
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   
            $mail->Port       = 587;                              


            return $mail;

        }catch(Exception $e){
            error_log("Mialer Error: ". $e->getMessage());
            throw new Exception("Mail setting error");
        }

    }

    private function getPassword():string {
        return Settings::env('MAIL_PASSWORD');
    }

    // メールを送信
    public function sendVerificationEmail(string $toEmail, string $url ){
            $mail = $this->getMailServer();
        try{

            $mail->setFrom($mail->Username, 'Email Verified');
            $mail->addAddress($toEmail);

            $mail->Subject = "computer parts URL link";

            // HTMLコンテンツ
            $mail->isHTML(true);
            ob_start();
            include(__DIR__.'/Message/VerificationEmail-template.php');
            $mail->Body = ob_get_clean();

            // Textコンテンツ
            if(file_exists(__DIR__.'/Message/text/verificationEmail.txt')){
                $mail->AltBody = file_get_contents(__DIR__.'/Message/text/verificationEmail.txt');
            }else {
                throw new Exception("Text Email template not found");
            }

            $isSend = $mail->send();

            if(!$isSend){
                throw new Exception("error: Failed to send verification email");
            }
            return $isSend;


        }catch(Exception $e){
            echo "Message could not be sent. Mailer Error:" . $mail->ErrorInfo;
            error_log("Mailer Error: ". $mail->ErrorInfo);
            return false;
        }
    }


}