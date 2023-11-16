import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function ProductDetails({navigation, route}: any) {
  const {
    price,
    total_price,
    total_quantity: initialTotalquant,
    image,
    description,
    productId,
    details,
    path,
    stock: initialStock,
    type,
  } = route.params || {};
  const item_price = price;
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(price);
  const total_quantity = parseInt(initialTotalquant);
  const total_stock = parseInt(initialStock);
  const [stock, setStock] = useState(total_stock);
  const [loading, setLoading] = useState(false);
  // const userData = JSON.parse(details.userData);
  // console.log('Not parse', details.userData.id);
  // console.log(path, ': ', productId);
  // console.log(type, ': ', stock);

  useEffect(() => {
    resetCurrentPrice();
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  }, []);
  // }, [total_price, total_quantity, total_stock, navigation, route]);
  // console.log(details);
  const resetCurrentPrice = () => {
    setCurrentPrice(total_price || price);
    setQuantity(total_quantity || 1);
    setStock(total_stock);
  }; //this function is declared to refresh value of Price and quantity when adding order to cart
  // console.log('PD:Route-From: ', currentPrice);
  // console.log('Total-Quantity: ', quantity);

  const handleAddToCart = () => {
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/AddtoCart.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      User_id: details.userData.id,
      Product_id: productId,
      User_Name: details.userData.Fname + ' ' + details.userData.Lname,
      User_Address: details.userData.Address,
      Quantity: quantity,
      Price: item_price,
      Total_Price: currentPrice,
      Description: description,
      Image: image,
      Stock: stock,
      Type: type,
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
    console.log(
      `Added ${quantity} ${description} to cart with price ₱${parseInt(
        currentPrice,
      ).toFixed(2)}`,
    );
    setQuantity(1);
    setCurrentPrice(price);
  };

  const handleEditCart = () => {
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/EditCartWater.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      User_id: details.userData.id,
      Product_id: productId,
      Quantity: quantity,
      Price: item_price,
      Total_Price: currentPrice,
      Description: description,
      Image: image,
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
    console.log(
      `Edited ${quantity} ${description} to cart with price ₱${parseInt(
        currentPrice,
      ).toFixed(2)}`,
    );
  };

  const handleBuyProduct = newUserId => {
    // showConfirmation('Verify', 'Are you sure you want to verify this user?');
    Alert.alert(
      `Attention`,
      'Confirm Order!',
      [
        {text: 'Buy', onPress: () => confirmBuy()},
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const confirmBuy = () => {
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/PlaceOrder.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      User_id: details.userData.id,
      Product_id: productId,
      Quantity: quantity,
      User_Name: details.userData.Fname + ' ' + details.userData.Lname,
      User_Address: details.userData.Address,
      Price: item_price,
      Total_Price: currentPrice,
      Description: description,
      Image: image,
      Stock: stock,
      Type: type,
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
    console.log(
      `Added ${quantity} ${description} to cart with price ₱${parseInt(
        currentPrice,
      ).toFixed(2)}`,
    );
    setQuantity(1);
    setCurrentPrice(price);
    // navigation.goBack('Home', {refreshing: true});
  };
  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator style={{marginTop: 20}} /> : ''}
      {price && description && quantity ? (
        <View>
          <View style={styles.productInfo}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    'https://krichwater2023.000webhostapp.com/Products/Add&Edit/Image/' +
                    image,
                }}
                style={[styles.image, {resizeMode: 'stretch'}]}
              />
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.description}>
              Price: ₱{parseInt(price).toFixed(2)}
            </Text>
            {type === 'Container' ? (
              <Text style={[styles.textStock, {}]}>
                Stocks Available: {stock}
              </Text>
            ) : (
              ''
            )}
            <Text style={styles.productId}>
              Total: ₱{parseInt(currentPrice).toFixed(2)}
            </Text>
          </View>

          <View style={styles.quantityControlContainer}>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity - 1);
                  const totalPrice = parseInt(currentPrice) - parseInt(price);
                  setCurrentPrice(totalPrice); // Halve the price
                }}
                disabled={quantity <= 1}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1);
                  const quant = quantity + 1;
                  const totalPrice = parseInt(currentPrice) + parseInt(price);
                  setCurrentPrice(totalPrice);
                  console.log(quant);
                }}
                disabled={type === 'Container' ? quantity >= stock : false}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {path === 'Home' ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.addToCartButton,
                  {width: '20%', marginRight: 10, backgroundColor: '#4682B4'},
                ]} // Adjust width here
                onPress={handleAddToCart}>
                <Text style={styles.addToCartButtonText}>
                  {' '}
                  <Icon name="shopping-cart" size={25} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addToCartButton,
                  {width: '80%', backgroundColor: '#2E8B57'},
                ]} // Adjust width here
                onPress={handleBuyProduct}>
                <Text style={styles.addToCartButtonText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{...styles.addToCartButton, backgroundColor: '#FF0000'}}
              onPress={handleEditCart}>
              <Text style={styles.addToCartButtonText}>Edit to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.errorMessage}>Select a product first</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productInfo: {
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 10,
    borderColor: '#70A5CD',
    borderRadius: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 6, // Image border radius (to match the container)
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productId: {
    fontSize: 16,
    color: '#555',
  },
  textStock: {
    marginBottom: 8,
    fontSize: 18,
    color: 'green',
  },
  quantityControlContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#555',
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust this based on your layout requirements
  },
  addToCartButton: {
    backgroundColor: '#70A5CD',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  errorMessage: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
