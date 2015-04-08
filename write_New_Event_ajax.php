<?php
//write_New_Event_ajax.php
require "database.php";

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
session_start();
$new_title = $_POST['new_title'];
$new_date = $_POST['new_date'];
$new_time = $_POST['new_time'];
$new_description = $_POST['new_description'];

$usertoken = $_POST['usertoken'];
$username_display = $_POST['username_display'];
$username = $_SESSION['username'];
$token = $_SESSION['token'];
if(!isset($username)){
    echo json_encode(
        array(
            "success" => false,
            "message" => "Permission denied! Please log in!"
        )
    );
    exit;
}
if($username != $username_display){
    echo json_encode(
                     array(
                        "success" => false,
                        "message" => "Error: Permission denied! Username doesn't match"
                     )
                     );
    exit;
}
if($token != $usertoken){
    echo json_encode(
                     array(
                        "success" => false,
                        "message" => "Error: User forgery!"
                     )
                     );
    exit;
}

if(!isset($new_title) || !isset($new_date) || !isset($new_time)){
    echo json_encode(array(
	"success" => false,
	"message" => "Error: title, date or time can't be empty!"
));
	exit;
}
//edit this event
$stmt = $mysqli->prepare("insert into events (title, date, time, description, username) values (?, ?, ?, ?, ?)"); 	
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
	"success" => false,
	"message" => "Event can't be added!"
));
	exit;
}

$stmt->bind_param('sssss', $new_title, $new_date, $new_time, $new_description, $username);

$stmt->execute();

$stmt->close();

//ini_set("session.cookie_httponly", 1);

echo json_encode(array(
	"success" => true,
	"message" => "Event added successfully!"
));
exit;
	
?>
