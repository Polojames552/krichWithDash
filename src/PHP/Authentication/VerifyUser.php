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
$User_id = $data->User_id;
$action = $data->Action;


$find = "SELECT * FROM users_tbl WHERE id=?";
$stmt = $conn->prepare($find);
$stmt->bind_param("i", $User_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User credentials are valid
    $data = $result->fetch_assoc();
   $Cstatus = $data['Status'];
    if($Cstatus =="Unverified"){
         $Status = 'Verified';
         $sql = "UPDATE users_tbl SET Status = ? WHERE id = ?";
         $stmt_update = $conn->prepare($sql);
         $stmt_update->bind_param("si",$Status, $User_id);

         if ($stmt_update->execute()) {
             $response = array('success' => true, 'message' => 'User successfully Verified!');
             echo json_encode($response);
         } else {
             $response = array('success' => false, 'message' => "Error: " . $stmt_update->error);
             echo json_encode($response);
         }
         $stmt_update->close();
    }else{
         $Status = 'Unverified';
         $sql = "UPDATE users_tbl SET Status = ? WHERE id = ?";
         $stmt_update = $conn->prepare($sql);
         $stmt_update->bind_param("si",$Status, $User_id);

         if ($stmt_update->execute()) {
             $response = array('success' => true, 'message' => 'User Suspended!');
             echo json_encode($response);
         } else {
             $response = array('success' => false, 'message' => "Error: " . $stmt_update->error);
             echo json_encode($response);
         }
         $stmt_update->close();
    }
   
}

// Close the connection
$conn->close();
?>
