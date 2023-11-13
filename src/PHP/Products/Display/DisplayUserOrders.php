<?php
//ForGames
// $servername = "localhost";
// $username = "id21528199_krich123";
// $password = "@Krich_123";
// $dbname = "id21528199_krichwater_db";

//Krich
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

// Check if the user ID is provided in the URL
if (isset($_GET['userId'])) {
    $user_id = $_GET['userId'];

    // Prepare and execute the SQL query
    $sql = "SELECT * FROM cart_tbl WHERE User_id = $user_id AND (Status = 'To Receive' OR Status = 'For Approval') ORDER BY Status='To Receive' DESC, time_updated DESC";
    
  //  $sql = "SELECT * FROM cart_tbl WHERE User_id='$user_id' AND (Status = 'To For Approval' OR Status = 'To Receive') BY Status//='For Approval' DESC, time_updated DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch data from the result set
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Prepare the response in JSON format
        $response = array(
            'success' => true,
            'data' => $data
        );

        echo json_encode($response);
    } else {
        // If no data is found
        $response = array(
            'success' => false,
            'message' => 'No data found for the user ID: ' . $user_id
        );

        echo json_encode($response);
    }
} else {
    // If user ID is not provided in the URL
    $response = array(
        'success' => false,
        'message' => 'User ID is not provided in the URL'
    );

    echo json_encode($response);
}

// Close the database connection
$conn->close();
?>
