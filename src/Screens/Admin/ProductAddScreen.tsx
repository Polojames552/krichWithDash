import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function AddProductScreen({navigation}) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  // const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const insertRecord = async () => {
    // alert("successful");
    // const baseUrl = "http://krichwater.infinityfreeapp.com/";
    // const InsertAPIURL = baseUrl+"query/RegisterUser.php";
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/AddProductsWater.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let base_url =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/AddProductsWaterImage.php';
    const formdata = new FormData();
    formdata.append('submit', 'ok');
    formdata.append('file', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'user_image.jpg',
    });

    let res = await fetch(base_url, {
      method: 'POST',
      body: formdata,
      // Note: You might not need to set 'Content-Type' explicitly
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!res.ok) {
      throw new Error('Server returned an error');
    }

    let responseJson = await res.json();
    console.log(responseJson, 'responseJson');
    // Check the server response for the new filename
    const newFilename = responseJson.file_name;
    console.log('New Filename:', newFilename);

    const Data = {
      ProductName: productName,
      ProductPrice: productPrice,
      Picture: newFilename,
    };
    console.log(Data);

    fetch(InsertAPIURL, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(Data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(response => {
        if (response && response.success) {
          Alert.alert('Attention', response.message);
          console.log('Response: ', response);
        } else {
          // Handle the case where 'success' or 'message' is not present in the response
          console.error(
            'Invalid response format: Missing success or message property',
          );
        }
      })
      .catch(error => {
        Alert.alert('Attention', `Network error: ${error.message}`);
      });
    setProductName('');
    setProductPrice('');
    setSelectedImage('');
  };

  const handleAddProduct = () => {
    // Add your logic here to handle adding the product
    // This is where you would send the data to your backend or perform any necessary actions
    // For simplicity, we'll just log the data for now
    console.log('Product Name:', productName);
    console.log('Product Price:', productPrice);
    // console.log('Product Description:', productDescription);
    console.log('Product Image:', productImage);

    // You can add API calls or other logic here to save the product
    // ...

    // After adding the product, navigate back to the home screen
    navigation.navigate('Home');
  };

  const handleImagePicker = () => {
    ImagePicker.showImagePicker({title: 'Select Image'}, response => {
      if (!response.didCancel && !response.error) {
        setProductImage(response.uri);
      }
    });
  };
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const openGallery = async () => {
    try {
      const images = await launchImageLibrary(options);
      if (images && images.assets) {
        if (images.assets.length === 0) {
          console.log('No image selected.');
        } else {
          setSelectedImage(images.assets[0].uri); // Update the selected image state
        }
      } else {
        console.log('Image selection canceled by the user.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={text => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        keyboardType="numeric"
        value={productPrice}
        onChangeText={text => setProductPrice(text)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Product Description"
        multiline
        numberOfLines={4}
        value={productDescription}
        onChangeText={text => setProductDescription(text)}
      /> */}
      {/* <TouchableOpacity onPress={handleImagePicker}>
        <View style={styles.imageContainer}>
          {productImage && (
            <Image source={{uri: productImage}} style={styles.image} />
          )}
          {!productImage && <Text>Choose an image</Text>}
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.uploadIcon} onPress={openGallery}>
        {selectedImage ? (
          <Image
            source={{uri: selectedImage}}
            style={{width: 100, height: 100}}
          />
        ) : (
          <FontAwesome5 name="image" size={40} color={'black'} />
        )}
      </TouchableOpacity>
      <Button title="Add Product" onPress={insertRecord} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  uploadIcon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 10,
  },
});
