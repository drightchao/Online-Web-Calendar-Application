<?php
//logout_ajax.php
session_start();

session_unset();
session_destroy();

if(!isset($_SESSION['username'])){
        echo json_encode(array(
                "success" => true
        ));
        exit;
}else{
        echo json_encode(array(
                "success" => false,
                "message" => "Try Again"
        ));
        exit;
}


?>
