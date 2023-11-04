<?php
$servername = "localhost";
$username = "id21391162_secretkrich";
$password = "@Mysecret_db21";
$dbname = "id21391162_secretkrich_db";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Use prepared statements to prevent SQL injection
    $sql = "SELECT * FROM users_tbl WHERE Username=? AND Password=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User credentials are valid
        $user = $result->fetch_assoc(); // Fetch user data
        $role = $user['Status'];
        
        if($role == 'Verified'){
        // Generate a random token (consider using a more secure method)
        $apiToken = bin2hex(random_bytes(32)); // Example: Random 32-byte hexadecimal string

        // Send user data in the response
        $response = array(
            'success' => true,
            'message' => 'Login successful',
            'user' => $user, // Include user data in the response
            'token' => $apiToken,
        );
        }else{
            $response = array('success' => false, 'message' => 'User Unverified!');
        }
       
    } else {
        // User credentials are invalid
        $response = array('success' => false, 'message' => 'Login failed');
    }

    // Set response headers to indicate JSON content
    header('Content-Type: application/json');

    // Send the JSON response
    echo json_encode($response);
} else {
    // Invalid request method
    echo 'Invalid request method';
}

// Close the database connection
$conn->close();
?>
