<?php
// Content of database.php
 
$mysqli = new mysqli('localhost', 'wusuichao', '901221', 'calendar');
 
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>
