<?php
$servername = "localhost";
$username = "id21391162_secretkrich";
$password = "@Mysecret_db21";
$dbname = "id21391162_secretkrich_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the request
$data = json_decode(file_get_contents("php://input"));


// Assign values to variables
date_default_timezone_set('Asia/Manila');
$formattedTime = new DateTime();
$formattedTime->setTimezone(new DateTimeZone('Asia/Manila')); // Adjust to Philippine time
$currentTime = $formattedTime->format('Y-m-d H:i:s');

$User_id = $data->Product_Id;
$Status= "Done";

    $sql = "UPDATE cart_tbl SET Status = ? , time_updated = ? WHERE id = ?";
    $stmt_update = $conn->prepare($sql);
    $stmt_update->bind_param("ssi", $Status,$currentTime, $User_id);

    if ($stmt_update->execute()) {
        $response = array('success' => true, 'message' => 'Order Received!');
        echo json_encode($response);
    } else {
        $response = array('success' => false, 'message' => "Error: " . $stmt_update->error);
        echo json_encode($response);
    }

    // Close the update statement
    $stmt_update->close();

// Close the connection
$conn->close();
?>
