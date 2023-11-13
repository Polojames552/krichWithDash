<?php
$servername = "localhost";
$username = "id21391162_secretkrich";
$password = "@Mysecret_db21";
$dbname = "id21391162_secretkrich_db";
$conn = new mysqli($servername, $username, $password, $dbname);

// $servername1 = "localhost";
// $username1 = "id21528199_krich123";
// $password1 = "@Krich_123";
// $dbname1 = "id21528199_krichwater_db";
// $conn1 = new mysqli($servername1, $username1, $password1, $dbname1);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Your SQL query to delete data
//$sql = "DELETE FROM your_table_name WHERE your_condition";
$data = json_decode(file_get_contents("php://input"));

$id = $data->Item_id;
$type = $data->Item_type;
$quantity = $data->Item_quantity;
$prod_id = $data->Item_prod_id;
// Assign values to variables

// if ($type === "Container") {
//             $findWaters = "SELECT * FROM waters_tbl WHERE id=?";
//             $stmtWaters = $conn1->prepare($findWaters);
//             $stmtWaters->bind_param("i", $prod_id);
//             $stmtWaters->execute();
//             $resultWaters = $stmtWaters->get_result();
        
//             if ($resultWaters->num_rows > 0) {
//                 $dataWaters = $resultWaters->fetch_assoc();
//                 $remainingStock = $dataWaters['Stock'];
        
//                 if ($remainingStock > 0) {
//                     $fStock = $remainingStock + $quantity;
//                     $sqlUpdateWaters = "UPDATE waters_tbl SET Stock = ? WHERE id = ?";
//                     $stmtUpdateWaters = $conn1->prepare($sqlUpdateWaters);
//                     $stmtUpdateWaters->bind_param("ii", $fStock, $prod_id);
//                     $stmtUpdateWaters->execute();
//                     $stmtUpdateWaters->close();
//                 }
//             }
//             $stmtWaters->close();
//         }

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
