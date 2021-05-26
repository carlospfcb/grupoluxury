<?php


require 'PHPMailerAutoload.php';
date_default_timezone_set('Etc/UTC');

$the_subject = $_POST['subject'];
//$address_to = "eliezerdanielgh1@gmail.com";
$address_to = $_POST['email'];
$name =   $_POST['name'];
$message = $_POST['message'];
$from_name = "Conctato interesado";

//Create a new PHPMailer instance
$mail = new PHPMailer();
$mail->IsSMTP();
 
//Configuracion servidor mail
// $mail->From = "mail@gmail.com"; 
$mail->SMTPAuth = true;
// $mail->SMTPSecure = 'tls'; //seguridad
$mail->Host = 'smtp.gmail.com'; // servidor smtp
$mail->Port = 465; //puerto
$mail->Username ='sistemaflujodecaja@gmail.com'; //nombre usuario
$mail->Password = 'sistema1234'; //contraseña
 
//Agregar destinatario
$mail->AddAddress($address_to);
$mail->Subject = $the_subject;
$mail->Body = $message;
 
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