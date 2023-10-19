<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the file is present in the request
    if (isset($_FILES['file']) && !empty($_FILES['file'])) {
        // Check for file upload errors
        if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $response = array(
                'success' => false,
                'message' => 'File upload error: ' . $_FILES['file']['error'],
            );
        } else {
            $targetDirectory = '/storage/ssd3/162/21391162/public_html/Products/Image/';
            $targetFile = $targetDirectory . basename($_FILES['file']['name']);
            $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

            // Check if the file is an actual image
            $isImage = getimagesize($_FILES['file']['tmp_name']);
            if ($isImage !== false) {
                // Generate a unique filename based on the current timestamp
                $newFilename = time() . '.' . $imageFileType;
                $destination = $targetDirectory . $newFilename;

                // Move the uploaded file to the desired directory
                if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
                    $response = array(
                        'success' => true,
                        'message' => 'Image uploaded successfully',
                        'file_path' => $destination,
                        'file_name' => $newFilename,
                    );
                } else {
                    $response = array(
                        'success' => false,
                        'message' => 'Error on uploading image',
                    );
                }
            } else {
                $response = array(
                    'success' => false,
                    'message' => 'File is not an image',
                );
            }
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'No file uploaded',
        );
    }
} else {
    $response = array(
        'success' => false,
        'message' => 'Invalid request method',
    );
}

echo json_encode($response);
?>
