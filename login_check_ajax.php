<?php
// login_ajax.php
require "database.php";
 
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

if( isset($_SESSION['username']) && isset($_SESSION['token']) ){
	echo json_encode(array(
		"success" => true,
		"username" => htmlspecialchars($_SESSION['username'])
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Please Login First!"
	));
	exit;
}
?>

