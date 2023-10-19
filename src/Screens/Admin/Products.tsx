import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

const Products = ({navigation}) => {
  const [data, setData] = useState();
  useEffect(() => {
    // console.log('Screen Refreshed');

    fetchData();
  }, [data]);
  const fetchData = async () => {
    // console.log('Screen Focused');
    try {
      const response = await fetch(
        'https://krichsecret.000webhostapp.com/Products/Display/DisplayWater.php',
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        console.error('Data fetch failed:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
    // finally {
    //   setLoading(false);
    // }
  };
  const handleProductPress = (Price, imageUrl, Name) => {
    navigation.navigate('EditProducts', {Price, imageUrl, Name});
  };
  const handleAddProductPress = () => {
    navigation.navigate('AddProducts');
  };
  const renderProductItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => handleProductPress(item.Price, item.Image, item.Name)}>
        <Image
          source={{
            uri:
              'https://krichsecret.000webhostapp.com/Products/Image/' +
              item.Image,
          }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productDescription}>{item.Name}</Text>
          <Text style={styles.productPrice}>Php {item.Price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeading}>
        <Text style={styles.heading}>Water</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        style={styles.productList}
      />
      {/* <View style={styles.containerHeading}>
        <Text style={styles.heading}>Containers</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        style={styles.containerList}
      /> */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddProductPress}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Added background color to the container
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Changed text color to a darker shade
  },
  productList: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  containerList: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  productItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3, // Added elevation for a slight shadow
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerHeading: {
    backgroundColor: '#f8f8f8',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f8f8f8',
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default Products;
