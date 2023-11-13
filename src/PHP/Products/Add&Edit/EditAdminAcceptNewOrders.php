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
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the request
$data = json_decode(file_get_contents("php://input"));

// Assign values to variables
$id = $data->id;
$type = $data->type;
$quantity = $data->quantity;
$product_id = $data->product_id;
$Status= "To Receive";

if($type == "Container"){
    $find = "SELECT * FROM waters_tbl WHERE id=?";
    $stmt = $conn1->prepare($find);
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User credentials are valid
        $data = $result->fetch_assoc();
        $stock = $data['Stock'];
        $fstock = $stock - $quantity;
    
        $sql1 = "UPDATE waters_tbl SET Stock = ? WHERE id = ?";
        $water_update = $conn1->prepare($sql1);
        $water_update->bind_param("ii", $fstock, $product_id);
        $water_update->execute();
        $water_update->close();
        
    }
   
}
    
    $sql = "UPDATE cart_tbl SET Status = ? WHERE id = ?";
    $cart_update = $conn->prepare($sql);
    $cart_update->bind_param("si", $Status, $id);
    if ($cart_update->execute()) {
        $response = array('success' => true, 'message' => 'Order Approved!');
        echo json_encode($response);
    } else {
        $response = array('success' => false, 'message' => "Error: " . $cart_update->error);
        echo json_encode($response);
    }

    // Close the update statement
    $cart_update->close();
   

// Close the connection
$conn->close();
?>
