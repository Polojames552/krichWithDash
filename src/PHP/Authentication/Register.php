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
$fname = $data->Fname;
$lname = $data->Lname;
$email = $data->Email;
$address = $data->Address;
$number = $data->Number;
$username = $data->Username;
$password = $data->Password;
$picture = $data->Picture;

// Using prepared statements to prevent SQL injection
$sql = $conn->prepare("INSERT INTO users_tbl (Fname, Lname, Email, Address, Number, Username, Password, Picture, Status, Role) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Unverified', 'User')");
$sql->bind_param("ssssssss", $fname, $lname, $email, $address, $number, $username, $password, $picture);

if ($sql->execute()) {
    $response = array('success' => true, 'message' => 'Registration Successful');
    echo json_encode($response);
} else {
    $response = array('success' => false, 'message' => "Error: " . $sql->error);
    echo json_encode($response);
}

// Close the connection
$sql->close();
$conn->close();
?>
