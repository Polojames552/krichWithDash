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

// Your SQL query to delete data
//$sql = "DELETE FROM your_table_name WHERE your_condition";
$data = json_decode(file_get_contents("php://input"));

// Assign values to variables
$id = $data->Item_id;

$find = "DELETE FROM cart_tbl WHERE id=?";
$stmt = $conn->prepare($find);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    $response = array('success' => true, 'message' => 'Item successfully removed from cart');
    echo json_encode($response);
} else {
    $response = array('success' => false, 'message' => "Error: " . $sql_insert->error);
    echo json_encode($response);
}

$stmt->close();
// Close connection
$conn->close();
?>
