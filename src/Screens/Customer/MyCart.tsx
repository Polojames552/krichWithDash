import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const productsData = [
  {
    id: 1,
    image: require('../../Assets/Images/round.jpg'),
    title: 'Received Product 1',
    price: '$10.99',
    quantity: 1,
  },
  {
    id: 2,
    image: require('../../Assets/Images/eightliters.jpeg'),
    title: 'Received Product 2',
    price: '$15.99',
    quantity: 2,
  },
  // Add more products as needed
];

export default function MyCart({ navigation }) {
  const handleProductPress = (productId, image, title) => {
    navigation.navigate('ProductDetails', { productId, image, title });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => handleProductPress(item.id, item.image, item.title)}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Icon name="minus" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Icon name="plus" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
  },
});
