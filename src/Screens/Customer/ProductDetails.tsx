import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ProductDetails({ route }) {
  const { price, image, description } = route.params;

  const [quantity, setQuantity] = useState(1);

  const [currentPrice, setCurrentPrice] = useState(price);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${description} to cart with price ₱${currentPrice.toFixed(2)}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Text style={styles.description}>{description}</Text>
       <Text style={styles.productId}>Price: ₱{currentPrice.toFixed(2)}</Text>

      </View>
      
      <View style={styles.quantityControlContainer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity 
            onPress={() => {
              setQuantity(quantity - 1);
              setCurrentPrice(currentPrice / 2); // Halve the price
            }} 
            disabled={quantity <= 1}
          >
            <Text style={styles.controlButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity 
            onPress={() => {
              setQuantity(quantity + 1);
              setCurrentPrice(currentPrice * 2); // Double the price
            }}
          >
            <Text style={styles.controlButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
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
});
