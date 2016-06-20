<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 's0556072@htw-berlin.de'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "HWT WebSite Kontakt von:  $name";
$email_body = "Du hast eine neue Nachricht bekommen.\n\n"."Hier sind die Details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";
mail($to,$email_subject,$email_body);
return true;			
?>