import React, { useState } from 'react';
import { View, Image, Button, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import the image picker library

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openGallery = async () => {
    try {
      const options = {}; // Define your options for the image picker here
      const images = await launchImageLibrary(options);

      if (!images || images.assets.length === 0) {
        console.log("No image selected.");
        return;
      }

      let base_url = "https://underdressed-legisl.000webhostapp.com/uploadimage.php";
      const formdata = new FormData();
      formdata.append('submit', 'ok');
      formdata.append('file', {
        uri: images.assets[0].uri,
        type: images.assets[0].type,
        name: images.assets[0].fileName,
      });

      let res = await fetch(base_url, {
        method: 'post',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any other headers as needed
        },
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      let responseJson = await res.json();
      console.log(responseJson, "responseJson");

      // Set the selected image for the viewer
      setSelectedImage(images.assets[0].uri);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <View>
      {/* Add your image viewer */}
      {selectedImage && (
        <View>
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200 }} // You can adjust the dimensions as needed
          />
        </View>
      )}

      {/* Add a button to open the image gallery */}
      <Button
        title="Open Gallery"
        onPress={openGallery}
      />
    </View>
  );
};

export default UploadImage;
