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

// SQL query to retrieve data (replace 'waters_tbl' with your actual table name)
$sql = "SELECT * FROM cart_tbl where Status = 'Done'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();

    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Output data as JSON
    //   $sql2 = "SELECT * FROM container_tbl";
    //    $result2 = $conn->query($sql2);
    //    if ($result2->num_rows > 0) {

            // Output data of each row
    //        while ($row1 = $result2->fetch_assoc()) {
    //            $data[] = $row1;
    //        }
            
    //    }
    
    header('Content-Type: application/json');
    echo json_encode(array('success' => true, 'data' => $data));
} else {
    echo json_encode(array('success' => false, 'message' => 'No results'));
}

// Close connection
$conn->close();

?>
