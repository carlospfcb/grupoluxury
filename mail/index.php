<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

$the_subject = $_POST['subject'];
$address = $_POST['email'];
$name =   $_POST['name'];
$message = $_POST['message'];

try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'pereircarlos1993@gmail.com';                     //SMTP username
    $mail->Password   = 'polaroid123$';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('pereircarlos1993@gmail.com', 'Web '); // this one sends

    $mail->addAddress('polaroidweb@gmail.com',);     //Add a recipient
 

    //Content

    $cuerpo =  "
        <html>
    <head>
    <meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'>
    <title>PHPMailer Test</title>
    </head>
    <body>
    <div style='width: 640px; font-family: Arial, Helvetica, sans-serif; font-size: 11px;'>
    <h1>Luxury Contact</h1>
    <h1>Te han contactado mediante la web</h1>
    <p> <strong> $address </strong></p>
    <p> <strong> $name </strong></p>
    <p> <strong> $message </strong></p>

    </div>
    </body>
    </html>
    ";
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $the_subject;
    $mail->Body    = $cuerpo;
   // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

   try {
    $mail->send();
    echo "OK";
} catch (Exception $e) {
    echo "Mailer Error: " . $mail->ErrorInfo;
}
   
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>