<?php
$servername = "localhost";
$username = "id21391162_secretkrich";
$password = "@Mysecret_db21";
$dbname = "id21391162_secretkrich_db";
$conn = new mysqli($servername, $username, $password, $dbname);

$servername1 = "localhost";
$username1 = "id21528199_krich123";
$password1 = "@Krich_123";
$dbname1 = "id21528199_krichwater_db";
$conn1 = new mysqli($servername1, $username1, $password1, $dbname1);

// Check connection
if ($conn->connect_error || $conn1->connect_error) {
    die("Connection failed: " . $conn->connect_error . " " . $conn1->connect_error);
}

// Your SQL query to delete data
$data = json_decode(file_get_contents("php://input"));

$id = $data->Item_id;
$prod_id = $data->Item_prod_id;
$sstatus = 'Done';
// Delete from waters_tbl
$findWaters = "DELETE FROM waters_tbl WHERE id=?";
$stmtWaters = $conn1->prepare($findWaters);
$stmtWaters->bind_param("i", $id);

$findCart = "DELETE FROM cart_tbl WHERE Product_id=? AND Status != ?";
$stmtCart = $conn->prepare($findCart);
$stmtCart->bind_param("is", $prod_id, $sstatus);

if ($stmtCart->execute() && $stmtWaters->execute()) {
    $response = array('success' => true, 'message' => 'Deleted product successfully!');
    echo json_encode($response);
} else {
    $response = array('success' => false, 'message' => "Error: " . $stmtCart->error);
    echo json_encode($response);
}
$stmtCart->close();
$stmtWaters->close();
// Close connections
$conn->close();
$conn1->close();
?>
