import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Products = ({navigation, route}) => {
  const [data, setData] = useState([]);

  const refFlag = route.params?.refreshing;
  const [loading, setLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(refFlag);

  useEffect(() => {
    // console.log('Screen Refreshed');
    fetchData();
  }, [refreshFlag, navigation, route]);

  const fetchData = async () => {
    // console.log('Screen Focused');
    // try {
    const response = await fetch(
      'https://krichwater2023.000webhostapp.com/Products/Display/DisplayWater.php',
    );
    const result = await response.json();
    if (result.success) {
      setData([...result.data]);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // setData(result.data.map(item => ({...item})));
    }
    //   else {
    //     console.error('Data fetch failed:', result.message);
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error.message);
    // }
    // finally {
    //   setLoading(false);
    // }
  };
  const handleProductPress = (id, Price, imageUrl, Name, Type, Stock) => {
    navigation.navigate('EditProducts', {
      id,
      Price,
      imageUrl,
      Name,
      Type,
      Stock,
    });
  };
  const handleAddProductPress = () => {
    navigation.navigate('AddProducts');
  };
  const handleDeleteItem = async id => {
    const InsertAPIURL =
      'https://krichwater2023.000webhostapp.com/Products/Delete/DeleteProduct.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      Item_id: id,
    };
    try {
      const response = await fetch(InsertAPIURL, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(Data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();

      if (responseData.success) {
        // Update the products state to remove selected items
        setRefreshFlag(prev => !prev);
        Alert.alert('Attention', responseData.message);
        console.log('Response Data:', responseData);
      } else {
        console.error(
          'Invalid response format: Missing success or message property',
        );
      }
    } catch (error) {
      Alert.alert('Attention', `Network error: ${error.message}`);
    }
  };

  const renderProductItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          handleProductPress(
            item.id,
            item.Price,
            item.Image,
            item.Name,
            item.Type,
            item.Stock,
          )
        }>
        <Image
          source={{
            uri:
              'https://krichwater2023.000webhostapp.com/Products/Add&Edit/Image/' +
              item.Image,
          }}
          style={[styles.productImage, {resizeMode: 'stretch'}]}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productDescription}>{item.Name}</Text>
          <Text style={styles.productPrice}>₱{item.Price}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert(
                `Attention`,
                'Do you want to delete this product?',
                [
                  {
                    text: 'Delete',
                    onPress: () => handleDeleteItem(item.id),
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              )
            }>
            <Icon name="trash" size={25} color="#B22222" />
          </TouchableOpacity>
          {/* {item.Type === 'Container' ? (
            <Text style={[styles.productPrice, {color: 'green'}]}>
              Stocks: {item.Stock}
            </Text>
          ) : (
            ''
          )} */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeading}>
        <Text style={styles.heading}>List of Products</Text>
      </View>
      {loading ? <ActivityIndicator style={{marginTop: 20}} /> : ''}
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        style={styles.productList}
        extraData={refreshFlag}
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
    borderRadius: 8,
    margin: 10,
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
  deleteButton: {
    marginLeft: 'auto',
  },
});

export default Products;
