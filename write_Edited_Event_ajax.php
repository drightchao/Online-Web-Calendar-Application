<?php
// write_Edited_Event_ajax.php
require "database.php";
 
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
session_start(); 
$event_id = (int)$_POST['event_id'];
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
//$username = $_SESSION['username'];
// write the edited event to the database.

//edit this event
$stmt = $mysqli->prepare("update events set title=?, date=?, time=?, description=? where event_id=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
	"success" => false,
	"message" => "Event can't be edited!"
));
	exit;
}

$stmt->bind_param('ssssi', $new_title, $new_date, $new_time, $new_description, $event_id);

$stmt->execute();

$stmt->close();

//ini_set("session.cookie_httponly", 1);

echo json_encode(array(
	"success" => true,
	"message" => "Event edited"
));
exit;
	
?>