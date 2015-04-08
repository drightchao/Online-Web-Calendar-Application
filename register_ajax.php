<?php
// login_ajax.php
require "database.php";
 
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
 
$username = $_POST['username'];
$password = $_POST['password'];
 
// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
$stmt = $mysqli->prepare("select COUNT(*), encrypted_password from users where username = ?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($cnt, $db_crypt_pass);
$stmt->fetch();
$stmt->close();

if( $cnt == 1 && crypt($password, $db_crypt_pass) == $db_crypt_pass ){
	echo json_encode(array(
		"success" => false,
		"message" => "User already exists"
	));
	exit;

}else if( $cnt == 0 && $username != "" && $password != "" ) {
	$stmt = $mysqli->prepare("insert into users (username, password, encrypted_password) values (?, ?, ?)"); 	
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	$stmt->bind_param('sss', $username, $password, crypt($password));
	$stmt->execute();
	$stmt->close();
	
	ini_set("session.cookie_httponly", 1);
	session_start();
	$_SESSION['username'] = $username;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);
 
	echo json_encode(array(
		"success" => true,
		"token" => htmlspecialchars($_SESSION['token'])
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>

