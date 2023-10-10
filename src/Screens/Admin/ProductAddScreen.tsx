import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function AddProductScreen({ navigation }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleAddProduct = () => {
    // Add your logic here to handle adding the product
    // This is where you would send the data to your backend or perform any necessary actions
    // For simplicity, we'll just log the data for now
    console.log('Product Name:', productName);
    console.log('Product Price:', productPrice);
    console.log('Product Description:', productDescription);
    console.log('Product Image:', productImage);

    // You can add API calls or other logic here to save the product
    // ...

    // After adding the product, navigate back to the home screen
    navigation.navigate('Home');
  };

  const handleImagePicker = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (!response.didCancel && !response.error) {
        setProductImage(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        keyboardType="numeric"
        value={productPrice}
        onChangeText={(text) => setProductPrice(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        multiline
        numberOfLines={4}
        value={productDescription}
        onChangeText={(text) => setProductDescription(text)}
      />
      <TouchableOpacity onPress={handleImagePicker}>
        <View style={styles.imageContainer}>
          {productImage && <Image source={{ uri: productImage }} style={styles.image} />}
          {!productImage && <Text>Choose an image</Text>}
        </View>
      </TouchableOpacity>
      <Button title="Add Product" onPress={handleAddProduct} />
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
});
