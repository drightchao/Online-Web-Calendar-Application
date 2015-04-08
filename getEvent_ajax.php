<?php
// getEvent_ajax.php
require "database.php";
 
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
session_start(); 
$event_id = $_POST['event_id'];

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
$stmt = $mysqli->prepare("select title, date, time, event_id, description from events where event_id = ?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
			"success" => false,
			"message" => "Error: can't query from database."
			       ));
	exit;
}

$stmt->bind_param('s', $event_id);

$stmt->execute();
$stmt->bind_result($title, $event_date, $event_time, $new_event_id, $description);
$stmt->fetch();
$stmt->close();

echo json_encode(array(
		"success" => true,
                "title" => $title,
                "date"  => $event_date,
                "time" => $event_time,
                "description" => $description,
		"event_id" => $new_event_id
                 ));
exit;
?>