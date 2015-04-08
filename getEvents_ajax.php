<?php
// getEvents_ajax.php
require "database.php";
 
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
session_start();
$month = $_POST['month'];
$year = $_POST['year'];

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
$stmt = $mysqli->prepare("select title, date, event_id from events where username=? and MONTH(date) = ? and YEAR(date) = ? order by event_id");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
			"success" => false,
			"message" => "Error: can't query from database."
			       ));
	exit;
}

$stmt->bind_param('sss', $username, $month, $year);

$stmt->execute();
//$stmt->bind_result($title, $event_date, $new_event_id);
$result = $stmt->get_result();
$date= array();
$title= array();
//$time = array();
//$description = array();
$event_id = array();
while($row = $result->fetch_assoc()){
    $date[] = htmlentities($row["date"]);
    $title[] = htmlentities($row["title"]);
    //$time[] = htmlentities($row["time"]);
    $event_id[] = htmlentities($row["event_id"]);
   // $description[] = htmlentities($row["event_description"]);
}
$stmt->close();

$newArray = array();
$newArray['cnt'] = count($date);
$newArray['success'] = true;
for($i = 0;$i<count($date);$i++){
    
    $newArray['date'.$i] = $date[$i];
    //$newArray['time'.$i] = $time[$i];
    $newArray['title'.$i] = $title[$i];
    $newArray['event_id'.$i] = $event_id[$i];
}

echo json_encode($newArray);
exit;
?>