import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
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

  const refFlag = route.params?.refreshing;

  // console.log('User-ID: ', userData.id);
  // console.log('MyC:Route-From: ', route);

  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState([]);
  // const load = route.params.refreshing
  // const [refreshing, setRefreshing] = useState(false);

  const [products, setProducts] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalP, setTotalP] = useState(0);

  const [allID, setAllId] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(refFlag);

  useEffect(() => {
    fetchData();
    // }, [data]);
    // }, [products]);
  }, [refreshFlag, navigation, route]);

  const fetchData = async () => {
    const user_id = userData.id;
    const response = await fetch(
      `https://krichsecret.000webhostapp.com/Products/Display/DisplayMyCartWater.php?userId=${user_id}`,
    );
    const result = await response.json();
    if (result.success) {
      setData([...result.data]);
      setLoading(true);
      setTimeout(() => {
        // setData([]);
        setLoading(false);
      }, 2000);
      setProducts(result.data.map(product => ({...product, selected: false})));
      // setRefreshing(false);
      // console.log('Result-latest: ', result.data);
    } else {
      setData([]);
      // console.error('Data fetch failed:', result.message);
    }
  };

  refreshFlag === true ? console.log('true') : console.log('false');

  // console.log('Data-MyCart: ', data);
  const handleProductPress = (
    price,
    total_price,
    description,
    productId,
    image,
    total_quantity,
    type,
    stock,
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
      type,
      stock,
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
    setSelectedItems(prevSelectedItems => {
      const updatedItems = prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter(id => id !== productId)
        : [...prevSelectedItems, productId];

      setTotalP(prevTotalP => {
        const priceChange = prevSelectedItems.includes(productId)
          ? -parseInt(Total_Price)
          : parseInt(Total_Price);
        return prevTotalP + priceChange;
      });

      setAllId(prevAllID =>
        updatedItems.includes(productId)
          ? [...prevAllID, productId]
          : prevAllID.filter(id => id !== productId),
      );

      return updatedItems;
    });
  };
  console.log(selectedItems);

  const toggleSelectAll = () => {
    setProducts(prevProducts => {
      const newSelectAll = !selectAll;
      const newProducts = prevProducts.map(product => ({
        ...product,
        selected: newSelectAll,
      }));
      const totalPriceSum = newProducts.reduce(
        (sum, product) =>
          sum + (product.selected ? parseInt(product.Total_Price) : 0),
        0,
      );
      setTotalP(totalPriceSum);

      if (newSelectAll) {
        const allID = newProducts.map(item => item.id);
        // console.log(allID);
        setAllId(allID);
        setSelectedItems(allID);
      } else {
        setAllId([]);
        setSelectedItems([]);
      }
      setSelectAll(newSelectAll);
      return newProducts;
    });
  };

  // const handleRefresh = () => {
  //   // Perform refresh logic
  //   fetchData();
  //   setRefreshFlag(!refreshFlag);
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
          item.Type,
          item.Stock,
          details,
        )
      }>
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={() => toggleSelect(item.id, item.Total_Price)}>
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
        onPress={() =>
          Alert.alert(
            `Attention`,
            'Remove this product from cart',
            [
              {text: 'Remove', onPress: () => handleDeleteItem(item.id)},
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
    </TouchableOpacity>
  );
  const handleDeleteItem = id => {
    Alert.alert('You deleted item', id);
  };
  const handleBuyProductConfirmation = () => {
    // showConfirmation('Verify', 'Are you sure you want to verify this user?');
    Alert.alert(
      `Order Confirmation`,
      'Please confirm order!',
      [
        {text: 'Buy', onPress: () => handleCheckout()},
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const handleCheckout = async () => {
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/BulkOrders.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      OrderId: allID,
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
        setProducts(prevProducts =>
          prevProducts.filter(product => !selectedItems.includes(product.id)),
        );
        // Clear other state variables
        setTotalP(0);
        setAllId([]);
        // Trigger a re-render by updating refreshFlag
        setRefreshFlag(prev => !prev);
        setSelectAll(false);
        setSelectedItems([]);
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

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator style={{marginTop: 20}} /> : ''}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        // refreshing={refreshing}
        // onRefresh={handleRefresh} //put this on navigating screens
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
        extraData={refreshFlag}
      />
      {products.length > 1 ? (
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
      ) : (
        ''
      )}
      <Text style={styles.totalPriceText}>Price: {totalP}</Text>
      <TouchableOpacity
        disabled={allID.length === 0}
        style={[
          styles.checkoutButton,
          allID.length === 0 && styles.checkoutButtonDisabled,
        ]}
        onPress={handleBuyProductConfirmation}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.checkoutButton} onPress={handleRefresh}>
        <Text style={styles.checkoutText}>Refresh</Text>
      </TouchableOpacity> */}
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
    backgroundColor: '#2E8B57',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  checkoutButtonDisabled: {
    backgroundColor: 'gray',
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
