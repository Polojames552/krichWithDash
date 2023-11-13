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

date_default_timezone_set('Asia/Manila');
$formattedTime = new DateTime();
$formattedTime->setTimezone(new DateTimeZone('Asia/Manila')); // Adjust to Philippine time
$currentTime = $formattedTime->format('Y-m-d H:i:s');

// Assign values to variables
$User_id = $data->User_id;
$Product_id = $data->Product_id;
$User_name = $data->User_Name;
$User_address = $data->User_Address;
$Quantity = $data->Quantity;
$Price = $data->Price;
$Total_Price = $data->Total_Price;
$Description = $data->Description;
$Image = $data->Image;
$Stock = $data->Stock;
$Type = $data->Type;
//$currentTime = date("Y-m-d H:i:s");
$pstatus = "Pending";
$find = "SELECT * FROM cart_tbl WHERE User_id=? AND Product_id=? AND Status=?";
$stmt = $conn->prepare($find);
$stmt->bind_param("iis", $User_id, $Product_id,$pstatus);
$stmt->execute();
$result = $stmt->get_result();


if ($result->num_rows > 0){
    // User credentials are valid
    $data = $result->fetch_assoc();
    $users_id = $data['User_id'];
    $products_id = $data['Product_id'];
    $pstatus = "Pending";

    $quant = $data['Quantity'] + $Quantity;
    $tot_price = $data['Total_Price'] + $Total_Price;

    $sql = "UPDATE cart_tbl SET Quantity = ?, Total_Price = ? WHERE Product_id = ? AND User_id = ? AND Status = ?";
    $stmt_update = $conn->prepare($sql);
    $stmt_update->bind_param("iiiis", $quant, $tot_price, $Product_id, $User_id, $pstatus);

    if ($stmt_update->execute()) {
        $response = array('success' => true, 'message' => 'Product successfully added to your cart!');
        echo json_encode($response);
    } else {
        $response = array('success' => false, 'message' => "Error: " . $stmt_update->error);
        echo json_encode($response);
    }

    // Close the update statement
    $stmt_update->close();
} else {
    // Using prepared statements to prevent SQL injection
    $Status = "Pending";
    $fStock;
    if ($Type == "Container"){
         //$fStock =  $Stock- $Quantity;
         $fStock =  $Stock;
    }else{
        $fStock =  0;
    }
    $sql_insert = $conn->prepare("INSERT INTO cart_tbl (User_id, Product_id, Name, Address, Quantity, Price, Total_Price, Description, Image,Status,time_updated,Type, Stock) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)");
    $sql_insert->bind_param("iissiiisssssi", $User_id, $Product_id, $User_name, $User_address, $Quantity, $Price, $Total_Price, $Description, $Image,$Status,$currentTime,$Type,$fStock);
    
    if ($sql_insert->execute()) {
        $response = array('success' => true, 'message' => 'Product successfully added to your cart!');
        echo json_encode($response);
    } else {
        $response = array('success' => false, 'message' => "Error: " . $sql_insert->error);
        echo json_encode($response);
    }
    // Close the insert statement
    $sql_insert->close();
    
    
    // reduce item stock in the database
    //if($Type == "Container"){
    //    $finalStock =  $Stock- $Quantity;
    //    $sql = "UPDATE waters_tbl SET Stock = ? WHERE id = ?";
    //    $stmt = $conn->prepare($sql);
    //    if ($stmt) {
    //        $stmt->bind_param("ii", $finalStock, $Product_id);
    //        $stmt->execute();
    //        $stmt->close();
    //    }
     
    //}
    
}

// Close the connection
$conn->close();
?>
