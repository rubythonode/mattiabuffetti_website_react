<?php

require './PHPMailerAutoload.php';

if ($_POST) {
	$data = $_POST;
} else {
	$data = json_decode(file_get_contents("php://input"), true);
}
$row = array();
//Create a new PHPMailer instance
$mail = new PHPMailer;
//Set who the message is to be sent from
$mail->setFrom($data['email'], $data['name']);
//Set an alternative reply-to address
$mail->addReplyTo($data['email'], $data['name']);
//Set who the message is to be sent to
$mail->addAddress('mattia.buffetti@gmail.com', 'Luigi Mattia Buffetti');
//Set the subject line
$mail->Subject = 'Contatto sito web';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->Body    = $data['message'];
//Replace the plain text body with one created manually
$mail->AltBody = $data['message'];

//send the message, check for errors
if (!$mail->send()) {
	$row['result'] = 'error';
} else {
	$row['result'] = 'success';
}
print_r( json_encode( $row ) );