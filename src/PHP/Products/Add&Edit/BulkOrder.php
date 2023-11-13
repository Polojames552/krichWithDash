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
$ItemOrderId = $data->OrderId;
$length = count($ItemOrderId);
$num =0;

for($i = 0; $i < $length; $i++){
    
$find = "SELECT * FROM cart_tbl WHERE id=?";
$stmt = $conn->prepare($find);
$itemId = $ItemOrderId[$i];
$stmt->bind_param("i", $itemId);
$stmt->execute();
$result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User credentials are valid
        $data = $result->fetch_assoc();
        $id = $data['id'];
        $type = $data['Type'];
        $quantity = $data['Quantity'];
        $product_id = $data['Product_id'];
        
        if ($type === "Container") {
            // $findWaters = "SELECT * FROM waters_tbl WHERE id=?";
            // $stmtWaters = $conn1->prepare($findWaters);
            // $stmtWaters->bind_param("i", $product_id);
            // $stmtWaters->execute();
            // $resultWaters = $stmtWaters->get_result();
        
            // if ($resultWaters->num_rows > 0) {
            //     $dataWaters = $resultWaters->fetch_assoc();
            //     $remainingStock = $dataWaters['Stock'];
        
            //     if ($remainingStock > 0) {
            //         $fStock = $remainingStock - $quantity;
        
                    $sqlUpdateCart = "UPDATE cart_tbl SET Status = ? WHERE id = ?";
                    $stmtUpdateCart = $conn->prepare($sqlUpdateCart);
                    $setstatus = "For Approval";
                    $stmtUpdateCart->bind_param("si", $setstatus, $id);
                    $stmtUpdateCart->execute();
                    $stmtUpdateCart->close();
        
                    // $sqlUpdateWaters = "UPDATE waters_tbl SET Stock = ? WHERE id = ?";
                    // $stmtUpdateWaters = $conn1->prepare($sqlUpdateWaters);
                    // $stmtUpdateWaters->bind_param("ii", $fStock, $product_id);
                    // $stmtUpdateWaters->execute();
                    // $stmtUpdateWaters->close();
        
                   // $response = array('success' => true, 'message' => 'Product ordered successfully!');
                    //    echo json_encode($response);
                    $num++;
            //     }
            // }
        }
        else{
            $sqlcartwaters = "UPDATE cart_tbl SET Status = ? WHERE id = ?";
            $stmt_update_waters = $conn->prepare($sqlcartwaters);
            $setstatus = "For Approval";
            $stmt_update_waters->bind_param("si", $setstatus, $id);
       
            if ($stmt_update_waters->execute()) {
                //$response = array('success' => true, 'message' => 'Product ordered successfully!');
                //echo json_encode($response);
                 $num++;
            } else {
                $response = array('success' => false, 'message' => "Error: " . $stmt_update_waters->error);
                echo json_encode($response);
            }
            $stmt_update_waters->close();
            
        }
    
        
    }
    $stmt->close();
}
 
if($num == $length){
     $response = array('success' => true, 'message' => 'Product ordered successfully!');
     echo json_encode($response);
}

// Close the connection
$conn->close();
$conn1->close();
?>
