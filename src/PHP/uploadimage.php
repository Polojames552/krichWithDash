<?php

$data = array('status'=>false);

if(isset($_POST['submit'])){
    $target_file = basename($_FILES['file']['name']);
    $file_type = pathinfo($target_file, PATHINFO_EXTENSION);
    $is_image = getimagesize($_FILES['file']['tmp_name']);
    if($is_image !== false){
        $data['image'] = time() . '.' . $file_type;
        if(move_uploaded_file($FILE['file']['tmp_name'], $data['image'])){
            $data['status'] = true;
        }else{
            $data['message'] = 'Error on uploading image';
        }
    }else{
        $data['message'] = 'File is not an image';
    }
}


header('Access-Control-Allow-Origin: *');
header('Content-type:application/json');

echo json_encode($data);


?>