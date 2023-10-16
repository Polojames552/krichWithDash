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

// Assign values to variables
$User_id = $data->User_id;
$Product_id = $data->Product_id;
$Quantity = $data->Quantity;
$Price = $data->Price;
$Total_Price = $data->Total_Price;
$Description = $data->Description;
$Image = $data->Image;

$find = "SELECT * FROM cart_tbl WHERE User_id=? AND Product_id=?";
$stmt = $conn->prepare($find);
$stmt->bind_param("ii", $User_id, $Product_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User credentials are valid
    $data = $result->fetch_assoc();
    $users_id = $data['User_id'];
    $products_id = $data['Product_id'];

    $quant = $data['Quantity'] + $Quantity;
    $tot_price = $data['Total_Price'] + $Total_Price;

    $sql = "UPDATE cart_tbl SET Quantity = ?, Total_Price = ? WHERE Product_id = ? AND User_id = ?";
    $stmt_update = $conn->prepare($sql);
    $stmt_update->bind_param("iiii", $quant, $tot_price, $Product_id, $User_id);

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
    $sql_insert = $conn->prepare("INSERT INTO cart_tbl (User_id, Product_id, Quantity, Price, Total_Price, Description, Image,Status) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?,?)");
    $sql_insert->bind_param("iiiiisss", $User_id, $Product_id, $Quantity, $Price, $Total_Price, $Description, $Image,$Status);

    if ($sql_insert->execute()) {
        $response = array('success' => true, 'message' => 'Product successfully added to your cart!');
        echo json_encode($response);
    } else {
        $response = array('success' => false, 'message' => "Error: " . $sql_insert->error);
        echo json_encode($response);
    }

    // Close the insert statement
    $sql_insert->close();
}

// Close the connection
$conn->close();
?>
