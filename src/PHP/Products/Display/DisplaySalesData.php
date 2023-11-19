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

date_default_timezone_set('Asia/Manila');
$formattedTime = new DateTime();
$formattedTime->setTimezone(new DateTimeZone('Asia/Manila'));
$dailyDate = $formattedTime->format('F j, Y');
$month = $formattedTime->format('j');
$year = $formattedTime->format('Y');
// Convert the search parameter to the database format
//$searchDateTime = DateTime::createFromFormat('F j, Y', $formattedDate);
//$searchDateStringForDatabase = $searchDateTime->format('Y-m-d'); // Use the correct format for the database
$Status = 'Done';
$dailyProfit = 0;
$TotalProfit = 0;
$jan =0;
$feb =0;
$mar =0;
$apr =0;
$may =0;
$jun =0;
$jul =0;
$aug =0;
$sep =0;
$oct =0;
$nov =0;
$dec =0;

//$find = "SELECT * FROM cart_tbl WHERE DATE_FORMAT(time_updated, '%Y-%m-%d') = ?";
$find = "SELECT * FROM cart_tbl WHERE time_updated = ? AND Status=?";
$stmt = $conn->prepare($find);
$stmt->bind_param("ss", $dailyDate, $Status);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $dailyProfit += $row['Total_Price'];
    }
   header('Content-Type: application/json');
   echo json_encode(array('success' => true, 'data' => $dailyProfit));
} else {
    echo json_encode(array('success' => false, 'message' => 'No results'));
}
$stmt->close();



//$sql = "SELECT * FROM cart_tbl WHERE time_updated LIKE ? AND time_updated LIKE ? AND Status=?";
// $find1 = "SELECT * FROM cart_tbl WHERE Status=?";
// $stmt1 = $conn->prepare($find1);
// $stmt1->bind_param("s", $Status);
// $stmt1->execute();
// $result1 = $stmt1->get_result();
// if ($result1->num_rows > 0) {
//     while ($row1 = $result1->fetch_assoc()) {
//         $TotalProfit += $row1['Total_Price'];
//     }
//    header('Content-Type: application/json');
//   echo json_encode(array('success' => true, 'TotalProfit' => $TotalProfit));
// } else {
//     echo json_encode(array('success' => false, 'message' => 'No results'));
// }
// $stmt1->close();


// $jansql = "SELECT * FROM cart_tbl WHERE time_updated LIKE ? AND time_updated LIKE ? AND Status=?";
// $janstmt = $conn->prepare($jansql);
// $janstmt->bind_param("sss", "January",$year, $Status);
// $janstmt->execute();
// $janresult = $janstmt->get_result();
// if ($janresult->num_rows > 0) {
//     while ($row = $janresult->fetch_assoc()) {
//         $jan += $row['Total_Price'];
//     }
//     header('Content-Type: application/json');
//     echo json_encode(array('success' => true, 'dailyProfit' => $dailyProfit , 'TotalProfit' => $TotalProfit , 'jan' => $jan));
// } else {
//     echo json_encode(array('success' => false, 'message' => 'No results'));
// }
// $janstmt->close();
$conn->close();

?>
