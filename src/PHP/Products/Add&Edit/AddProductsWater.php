<?php
$servername = "localhost";
$db_username = "id21391162_secretkrich";
$db_password = "@Mysecret_db21";
$dbname = "id21391162_secretkrich_db";

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the request
$data = json_decode(file_get_contents("php://input"));

// Assign values to variables
$name = $data->ProductName;
$price = $data->ProductPrice;
$picture = $data->Picture;

// Using prepared statements to prevent SQL injection
$sql = $conn->prepare("INSERT INTO waters_tbl (Name, Price, Image) 
                       VALUES (?, ?, ?)");
$sql->bind_param("sis", $name, $price, $picture);

if ($sql->execute()) {
    $response = array('success' => true, 'message' => 'Product added Successfully');
    echo json_encode($response);
} else {
    $response = array('success' => false, 'message' => "Error: " . $sql->error);
    echo json_encode($response);
}

// Close the connection
$sql->close();
$conn->close();
?>
