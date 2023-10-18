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
$role = "User";
// SQL query to retrieve data (replace 'waters_tbl' with your actual table name)
$sql = "SELECT * FROM users_tbl WHERE Role='$role' ORDER BY time_updated DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();

    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Output data as JSON
    header('Content-Type: application/json');
    echo json_encode(array('success' => true, 'data' => $data));
} else {
    echo json_encode(array('success' => false, 'message' => 'No results'));
}

// Close connection
$conn->close();

?>
