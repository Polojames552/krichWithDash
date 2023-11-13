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

// Retrieve data from the request
$data = json_decode(file_get_contents("php://input"));

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

date_default_timezone_set('Asia/Manila');
$formattedTime = new DateTime();
$formattedTime->setTimezone(new DateTimeZone('Asia/Manila')); // Adjust to Philippine time
$currentTime = $formattedTime->format('Y-m-d H:i:s');


    // Using prepared statements to prevent SQL injection
    $Status = "For Approval";
    $fStock;
// if ($Type == "Container"){
//         $find = "SELECT * FROM waters_tbl WHERE id=?";
//         $stmt = $conn1->prepare($find);
//         $stmt->bind_param("i", $Product_id);
//         $stmt->execute();
//         $result = $stmt->get_result();
//         if ($result->num_rows > 0) {
//             // User credentials are valid
//             $data = $result->fetch_assoc();
//             $remainingStock = $data['Stock'];
            
//             if($remainingStock > 0){
//                 $fStock =  $remainingStock - $Quantity;
//                 //$fStock =  $Stock;
//                 $sql_insert = $conn->prepare("INSERT INTO cart_tbl (User_id, Product_id, Name, Address, Quantity, Price, Total_Price, Description, Image,Status,time_updated,Type, Stock) 
//                                                VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?,?,?,?)");
//                 $sql_insert->bind_param("iissiiisssssi", $User_id, $Product_id,$User_name,$User_address, $Quantity, $Price, $Total_Price, $Description, $Image,$Status,$currentTime,$Type,$fStock);
                
                
//                 $sql = "UPDATE cart_tbl SET Stock = ? WHERE Product_id = ? AND Status = ?";
//                 $stmt_update = $conn->prepare($sql);
//                 $sstatus= "Pending";
//                 $stmt_update->bind_param("iis", $fStock, $Product_id,$sstatus);
                
//                 if ($sql_insert->execute()) {
//                     $stmt_update->execute();
//                     $response = array('success' => true, 'message' => 'Product ordered successfully!');
//                     echo json_encode($response);
//                 } else {
//                     $response = array('success' => false, 'message' => "Error: " . $sql_insert->error);
//                     echo json_encode($response);
//                 }
//                 // Close the insert statement
//                 $sql_insert->close();
                
                
//                 // reduce item stock in the database
//                 if($Type == "Container"){
//                    // $finalStock =  $Stock- $Quantity;
//                     $sql = "UPDATE waters_tbl SET Stock = ? WHERE id = ?";
//                     $stmt = $conn1->prepare($sql);
//                     if ($stmt) {
//                         $stmt->bind_param("ii", $fStock, $Product_id);
//                         $stmt->execute();
//                         $stmt->close();
//                     }             
//                 }
//             }else{
//                  $response = array('success' => true, 'message' => 'Stocks Not Available');
//                  echo json_encode($response);
//             }
//         }
// }else{
        $fStock =  0;
        $sql_insert = $conn->prepare("INSERT INTO cart_tbl (User_id, Product_id, Name, Address, Quantity, Price, Total_Price, Description, Image,Status,time_updated,Type, Stock) 
                                   VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?,?,?,?)");
        $sql_insert->bind_param("iissiiisssssi", $User_id, $Product_id,$User_name,$User_address, $Quantity, $Price, $Total_Price, $Description, $Image,$Status,$currentTime,$Type,$fStock);
        
        if ($sql_insert->execute()) {
            $response = array('success' => true, 'message' => 'Product ordered successfully!');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => "Error: " . $sql_insert->error);
            echo json_encode($response);
        }
        // Close the insert statement
        $sql_insert->close();
  
// }
   

// Close the connection
$conn->close();
// $conn1->close();
?>
