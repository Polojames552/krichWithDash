import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

export default function ProductDetails({route}: any) {
  const { price, image, description, details } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(price);

  useEffect(() => {
    resetCurrentPrice();
  }, [price, 1]);

  const resetCurrentPrice = () => {
    setCurrentPrice(price || 0); // Default to 0 if price is undefined
    setQuantity(1);
  }; //this function is declared to refresh value of Price and quantity when adding order to cart

  // console.log(route.params);
  const handleAddToCart = () => {
    const InsertAPIURL =
      'https://underdressed-legisl.000webhostapp.com/cart.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    // console.log('New Filename:', newFilename);
    const Data = {
      User_id: details.userData.id,
      Quantity: quantity,
      Price: currentPrice,
      Description: description,
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
        Alert.alert('Attention', response[0].Message);
        resetCurrentPrice();
      })
      .catch(error => {
        Alert.alert('Attention', `Network error: ${error.message}`);
      });
    console.log(
      `Added ${quantity} ${description} to cart with price ₱${currentPrice.toFixed(
        2,
      )}`,
    );
  };

  return (
    <View style={styles.container}>
        {price && description && quantity ? (
        <View>
      <View style={styles.productInfo}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.description}>Price: ₱{price.toFixed(2)}</Text>
        <Text style={styles.productId}>Total: ₱{currentPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.quantityControlContainer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity - 1);
              const totalPrice = currentPrice - price;
              setCurrentPrice(totalPrice); // Halve the price
            }}
            disabled={quantity <= 1}>
            <Text style={styles.controlButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity + 1);
              const totalPrice = currentPrice + price;
              setCurrentPrice(totalPrice); // Double the price
            }}>
            <Text style={styles.controlButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
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