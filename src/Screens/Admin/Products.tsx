import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet
} from "react-native";

const Products = ({ navigation }) => {
  const products = [
    { id: 1, name: "Product 1", imageUrl: "https://example.com/product1.jpg", price: 10, description: "Round" },
    { id: 2, name: "Product 2", imageUrl: "https://example.com/product2.jpg", price: 15, description: "8 Liters" },
    { id: 3, name: "Product 3", imageUrl: "https://example.com/product3.jpg", price: 12, description: "6 Liters" },
    { id: 4, name: "Product 4", imageUrl: "https://example.com/product4.jpg", price: 18, description: "Slim" }
    // Add more products as needed
  ];

  const handleProductPress = (price, imageUrl, description) => {
    navigation.navigate('EditProducts', { price, imageUrl, description });
  };
  const handleAddProductPress = () =>
  {
    navigation.navigate('AddProducts');
  }
  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          handleProductPress(item.price, item.imageUrl, item.description)
        }
      >
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>Php {item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeading}>
        <Text style={styles.heading}>Container with Water</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.productList}
      />
      <View style={styles.containerHeading}>
        <Text style={styles.heading}>Containers</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.containerList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProductPress}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff", // Added background color to the container
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#333", // Changed text color to a darker shade
    },
    productList: {
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    containerList: {
      backgroundColor: "#f8f8f8",
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    productItem: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    addButton: {
      position: "absolute",
      bottom: 16,
      right: 16,
      backgroundColor: "#007BFF",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      elevation: 3, // Added elevation for a slight shadow
    },
    addButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    containerHeading: {
      backgroundColor: "#f8f8f8",
      padding: 8,
      marginBottom: 8,
      borderRadius: 8,
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 8,
        borderRadius: 25,
      },
      productContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        padding: 8,
      },
      productImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 8,
      },
      productDetails: {
        flex: 1,
      },
      productDescription: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
      },
      productPrice: {
        fontSize: 14,
        color: "#007BFF",
      },
});

export default Products;
