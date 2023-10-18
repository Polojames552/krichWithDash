import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';

// const productsData = [
//   {
//     id: 1,
//     image: require('../../Assets/Images/round.jpg'),
//     title: 'Received Product 1',
//     price: '$10.99',
//     quantity: 1,
//     selected: false,
//   },
//   {
//     id: 2,
//     image: require('../../Assets/Images/eightliters.jpeg'),
//     title: 'Received Product 2',
//     price: '$15.99',
//     quantity: 2,
//     selected: false,
//   },
//   // Add more products as needed
// ];

export default function MyCart({navigation, route}) {
  const details = route.params?.details || null;
  const userData = details.userData;
  // console.log('User-ID: ', userData.id);
  // console.log('MyC:Route-From: ', route);

  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState([]);
  const load = route.params.refreshing;

  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalP, setTotalP] = useState(0);
  // const [refreshing, setRefreshing] = useState(load);
  useEffect(() => {
    // console.log('MyCart2: ', refreshing);
    fetchData();
    // }, [data]);
    // }, [products]);
  }, []);
  const fetchData = async () => {
    // console.log('MyCart2: ', refreshing);
    const user_id = userData.id;
    const response = await fetch(
      `https://krichsecret.000webhostapp.com/Products/Display/DisplayMyCartWater.php?userId=${user_id}`,
    );
    const result = await response.json();
    if (result.success) {
      setData([...result.data]);
      setProducts(result.data.map(product => ({...product, selected: false})));
      // setRefreshing(false);
      // console.log('Result-latest: ', result.data);
    } else {
      console.error('Data fetch failed:', result.message);
    }
  };
  // console.log('Data-MyCart: ', data);
  const handleProductPress = (
    price,
    total_price,
    description,
    productId,
    image,
    total_quantity,
    details,
  ) => {
    navigation.navigate('ProductDetails', {
      path: 'MyCart',
      price,
      total_price,
      description,
      productId,
      total_quantity,
      image,
      details,
    });
  };

  const toggleSelect = (productId, Total_Price) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {...product, selected: !product.selected}
          : product,
      ),
    );

    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter(id => id !== productId)
        : [...prevSelectedItems, productId],
    );

    setTotalP(prevTotalP => {
      const priceChange = selectedItems.includes(productId)
        ? -parseInt(Total_Price)
        : parseInt(Total_Price);
      return prevTotalP + priceChange;
    });
  };

  const toggleSelectAll = () => {
    setSelectAll(prev => !prev);
    setProducts(prevProducts => {
      const newProducts = prevProducts.map(product => ({
        ...product,
        selected: !selectAll,
      }));
      const totalPriceSum = newProducts.reduce(
        (sum, product) =>
          sum + (product.selected ? parseInt(product.Total_Price) : 0),
        0,
      );
      setTotalP(totalPriceSum);
      return newProducts;
    });
  };

  // const toggleSelectAll = () => {
  //   setSelectAll(prev => !prev);
  //   setProducts(prevProducts =>
  //     prevProducts.map(product => ({...product, selected: !selectAll})),
  //   );
  // };
  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        handleProductPress(
          item.Price,
          item.Total_Price,
          item.Description,
          item.Product_id,
          item.Image,
          item.Quantity,
          details,
        )
      }>
      <TouchableOpacity onPress={() => toggleSelect(item.id, item.Total_Price)}>
        <Icon
          name={item.selected ? 'check-square-o' : 'square-o'}
          size={25}
          color="black"
        />
      </TouchableOpacity>
      <Image
        source={{
          uri:
            'https://krichsecret.000webhostapp.com/Products/Image/' +
            item.Image,
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productTitle}>{item.Description}</Text>
          <Text style={styles.productPrice}>
            ₱{parseInt(item.Total_Price).toFixed(2)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => Alert.alert('Delete button pressed!')}>
        <Icon name="trash" size={25} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleCheckout = () => {
    const selectedProducts = products.filter(product => product.selected);
    console.log('selected: ', selectedProducts);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh} //put this on navigating screens
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
      />
      <TouchableOpacity
        style={styles.selectAllContainer}
        onPress={toggleSelectAll}>
        <View style={styles.checkboxContainer}>
          <Icon
            name={selectAll ? 'check-square-o' : 'square-o'}
            size={25}
            color="black"
          />
          <Text style={styles.selectAllText}>Select all</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.totalPriceText}>Price: {totalP}</Text>
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
  totalPriceText: {
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 75,
    right: 20,
    fontSize: 16,
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
  },
});
