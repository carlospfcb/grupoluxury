<?php
require 'PHPMailerAutoload.php';
date_default_timezone_set('Etc/UTC');

//Create a new PHPMailer instance
$mail = new PHPMailer();
$mail->IsSMTP();
 
//Configuracion servidor mail
// $mail->From = "mail@gmail.com"; 
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls'; //seguridad
$mail->Host = "smtp.gmail.com"; // servidor smtp
$mail->Port = 587; //puerto
$mail->Username ='sistemaflujodecaja@gmail.com'; //nombre usuario
$mail->Password = 'sistema1234'; //contraseña
 
//Agregar destinatario
$mail->AddAddress('eliezerdanielgh1@gmail.com');
$mail->Subject = 'hola';
$mail->Body = 'mensaje';
 
//Avisar si fue enviado o no y dirigir al index
if ($mail->Send()) {
    echo'<script type="text/javascript">
           alert("Enviado Correctamente");
        </script>';

     
} else {
    // echo'<script type="text/javascript">
    //        alert("NO ENVIADO, intentar de nuevo");
    //     </script>';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
?>