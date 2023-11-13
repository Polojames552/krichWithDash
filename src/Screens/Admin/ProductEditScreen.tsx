import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  Text,
} from 'react-native';

const ProductEditScreen = ({route, navigation}) => {
  const {id, Price, imageUrl, Name, Type, Stock} = route.params || {};

  const [editedPrice, setEditedPrice] = useState(Price);
  const [editedDescription, setEditedDescription] = useState(Name);
  const [editedStock, setEditedStock] = useState(Stock);

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const disableButton = () => {
    setIsSaveDisabled(
      editedPrice === Price &&
        editedDescription === Name &&
        editedStock === Stock,
    );
  };

  useEffect(() => {
    disableButton();
  }, [editedPrice, editedDescription, editedStock]);

  console.log('Image url: ', imageUrl);

  const handleSave = () => {
    Alert.alert(
      `Attention`,
      'Do you want to save your changes?',
      [
        {
          text: 'Save',
          onPress: () => handleEditProduct(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const handleEditProduct = () => {
    // console.log('Price', editedPrice);
    // console.log('Name', editedDescription);
    // console.log('Stock', editedStock);

    const InsertAPIURL =
      'https://krichwater2023.000webhostapp.com/Products/Add&Edit/EditProductAdmin.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      Product_id: id,
      Name: editedDescription,
      Price: editedPrice,
      Stock: editedStock,
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
          // Alert.alert('Attention', response.message);
          // console.log('Response: ', response);
          Alert.alert(`Attention`, response.message, [
            {
              text: 'Done',
              onPress: () =>
                navigation.navigate('Products', {refreshing: true}),
            },
          ]);
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
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          color: '#2E8B57',
          fontSize: 25,
          paddingBottom: 15,
        }}>
        Edit Product Details
      </Text>
      <Image
        source={{
          uri:
            'https://krichwater2023.000webhostapp.com/Products/Add&Edit/Image/' +
            imageUrl,
        }}
        style={[
          styles.image,
          {resizeMode: 'stretch', height: '25%', width: '40%'},
        ]}
      />
      <Text style={[styles.text, {alignSelf: 'flex-start', marginLeft: 32}]}>
        Name:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={editedDescription}
        onChangeText={text => setEditedDescription(text)}
      />
      <Text style={[styles.text, {alignSelf: 'flex-start', marginLeft: 32}]}>
        Price:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={editedPrice}
        onChangeText={text => setEditedPrice(text)}
        keyboardType="numeric"
      />

      {Type === 'Container' ? (
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text
            style={[styles.text, {alignSelf: 'flex-start', marginLeft: 32}]}>
            Stock:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Stock"
            value={editedStock}
            onChangeText={text => setEditedStock(text)}
            keyboardType="numeric"
          />
        </View>
      ) : (
        ''
      )}
      <View style={{width: '55%', borderRadius: 10, overflow: 'hidden'}}>
        <Button
          title="Save Changes"
          onPress={handleSave}
          disabled={isSaveDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'black',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    // color: '#2E8B57',
    color: '#4682B4',
  },
});

export default ProductEditScreen;
