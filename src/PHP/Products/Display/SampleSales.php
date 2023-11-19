<?php
header('Content-Type: application/json');  // Move the header line here

$servername = "localhost";
$username = "id21391162_secretkrich";
$password = "@Mysecret_db21";
$dbname = "id21391162_secretkrich_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Connection failed: ' . $conn->connect_error)));
}

date_default_timezone_set('Asia/Manila');
$formattedTime = new DateTime();
$formattedTime->setTimezone(new DateTimeZone('Asia/Manila'));
$dailyDate = $formattedTime->format('F j, Y');
$Status = 'Done';
$dailyProfit = 0;
$TotalProfit = 0;
$jan = 0;

// Query for the current date
$find = "SELECT * FROM cart_tbl WHERE time_updated = ? AND Status=?";
$stmt = $conn->prepare($find);
$stmt->bind_param("ss", $dailyDate, $Status);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $dailyProfit += $row['Total_Price'];
    }
    echo json_encode(array('success' => true, 'data' => $dailyProfit));
} else {
    echo json_encode(array('success' => false, 'message' => 'No results'));
}

$stmt->close();

// Query for the total profit
$find1 = "SELECT * FROM cart_tbl WHERE Status=?";
$stmt1 = $conn->prepare($find1);
$stmt1->bind_param("s", $Status);
$stmt1->execute();
$result1 = $stmt1->get_result();

if ($result1->num_rows > 0) {
    while ($row1 = $result1->fetch_assoc()) {
        $TotalProfit += $row1['Total_Price'];
    }
    echo json_encode(array('success' => true, 'TotalProfit' => $TotalProfit));
} else {
    echo json_encode(array('success' => false, 'message' => 'No results'));
}

$stmt1->close();

// Query for January
$jansql = "SELECT * FROM cart_tbl WHERE MONTH(time_updated) = ? AND YEAR(time_updated) = ? AND Status=?";
$janstmt = $conn->prepare($jansql);
$janstmt->bind_param("sss", "November", $year, $Status);
$janstmt->execute();
$janresult = $janstmt->get_result();

if ($janresult->num_rows > 0) {
    while ($row = $janresult->fetch_assoc()) {
        $jan += $row['Total_Price'];
    }
    echo json_encode(array('success' => true,'jan' => $jan));
} else {
    echo json_encode(array('success' => false, 'message' => 'No results'));
}

$janstmt->close();
$conn->close();
?>
