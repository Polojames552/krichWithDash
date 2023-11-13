<?php
// Define your database connection details
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
    $sql = "SELECT * FROM cart_tbl WHERE User_id = $user_id AND Status = 'Done'";
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
