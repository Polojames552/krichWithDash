import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const productsData = [
  {
    id: 1,
    image: require('../../Assets/Images/round.jpg'),
    title: 'Received Product 1',
    price: '$10.99',
    quantity: 1,
    selected: false,
  },
  {
    id: 2,
    image: require('../../Assets/Images/eightliters.jpeg'),
    title: 'Received Product 2',
    price: '$15.99',
    quantity: 2,
    selected: false,
  },
  // Add more products as needed
];

export default function MyCart({ navigation }) {
  const [products, setProducts] = useState(productsData);
  const [selectAll, setSelectAll] = useState(false);

  const handleProductPress = (productId, image, title) => {
    navigation.navigate('ProductDetails', { productId, image, title });
  };

  const toggleSelect = (productId) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId ? {...product, selected: !product.selected} : product
      )
    );
  };

  const toggleSelectAll = () => {
    setSelectAll(prev => !prev);
    setProducts(prevProducts => 
      prevProducts.map(product => ({...product, selected: !selectAll}))
    );
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => handleProductPress(item.id, item.image, item.title)}>
      <TouchableOpacity onPress={() => toggleSelect(item.id)}>
        <Icon name={item.selected ? "check-square-o" : "square-o"} size={25} color="black" />
      </TouchableOpacity>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => alert("Delete button pressed!")}>
        <Icon name="trash" size={25} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleCheckout = () => {
    const selectedProducts = products.filter(product => product.selected);
    // Implement your checkout logic with selected products
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.selectAllContainer} onPress={toggleSelectAll}>
        <View style={styles.checkboxContainer}>
          <Icon name={selectAll ? "check-square-o" : "square-o"} size={25} color="black" />
          <Text style={styles.selectAllText}>Select all</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
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
  deleteButton: {
    marginLeft: 'auto',
  },
  selectAllContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    marginLeft: 10,
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
  },
});
