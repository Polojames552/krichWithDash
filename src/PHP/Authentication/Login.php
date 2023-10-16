<?php
// Database connection parameters
$servername = "localhost";
$username = "id21233259_root";
$password = "Krich_2023";
$dbname = "id21233259_krichwater_db";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Perform a database query to check user credentials and fetch user data
    $sql = "SELECT * FROM users_tbl WHERE Username='$username' AND Password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User credentials are valid
        $user = $result->fetch_assoc(); // Fetch user data

        // Send user data in the response
        $response = array(
            'success' => true,
            'message' => 'Login successful',
            'user' => $user // Include user data in the response
        );
    } else {
        // User credentials are invalid
        $response = array('success' => false, 'message' => 'Login failed');
    }

    echo json_encode($response);
} else {
    echo 'Invalid request method';
}

// Close the database connection
$conn->close();
?>
