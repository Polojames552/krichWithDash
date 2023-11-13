<?php
$servername = "localhost";
$username = "id21528199_krich123";
$password = "@Krich_123";
$dbname = "id21528199_krichwater_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the request
$data = json_decode(file_get_contents("php://input"));

// Assign values to variables
$id = $data->Product_id;
$name = $data->Name;
$price = $data->Price;
$stock = $data->Stock;


    $sql = "UPDATE waters_tbl SET Name = ?, Price = ? , Stock = ? WHERE id = ?";
    $stmt_update = $conn->prepare($sql);
    $stmt_update->bind_param("siii", $name, $price, $stock, $id);

    if ($stmt_update->execute()) {
        $response = array('success' => true, 'message' => 'Product Updated successfully!');
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
