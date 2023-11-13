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

const productsData = [
  {
    id: 1,
    image: require('../../Assets/Images/round.jpg'),
    title: 'Received Product 1',
    status: 'preparing', // Added status property
    received: true,
  },
  {
    id: 2,
    image: require('../../Assets/Images/eightliters.jpeg'),
    title: 'Received Product 2',
    status: 'on delivery', // Added status property
    received: false,
  },
  // Add more products as needed
];

export default function Orders({navigation, route}) {
  const details = route.params?.details || null;
  const userData = details.userData;
  const refFlag = route.params?.refreshing;
  const [refreshFlag, setRefreshFlag] = useState(refFlag);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [data, navigation, route]);

  const handleProductPress = (productId, image, title) => {
    navigation.navigate('ProductDetails', {productId, image, title});
  };

  const fetchData = async () => {
    // console.log('Screen Focused');
    // try {
    const user_id = userData.id;
    const response = await fetch(
      `https://krichsecret.000webhostapp.com/Products/Display/DisplayUserOrders.php?userId=${user_id}`,
    );
    const result = await response.json();
    if (result.success) {
      setData([...result.data]);
    } else {
      setData([]);
    }
    // else {
    //   console.error('Data fetch failed:', result.message);
    // }
    // }
    // catch (error) {
    //   console.error('Error fetching data:', error.message);
    // }
  };

  const renderProductItem = ({item}) => (
    <View style={styles.productItem}>
      <Image
        source={{
          uri:
            'https://krichwater2023.000webhostapp.com/Products/Add&Edit/Image/' +
            item.Image,
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.Description}</Text>
        {/* {item.Status && <Text style={styles.productStatus}>{item.Status}</Text>} */}
        {item.Status === 'To Receive' ? (
          <TouchableOpacity
            style={styles.button}
            // onPress={() => handleAccept(order.id)}
            onPress={() =>
              Alert.alert(
                `Confirmation`,
                'Order Received?',
                [
                  {text: 'Yes', onPress: () => handleReceive(item.id)},
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              )
            }>
            <Text style={styles.buttonText}>Receive</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deleteContainer}>
            <Text style={styles.productStatus}>{item.Status}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                Alert.alert(
                  `Attention`,
                  'Do You want to cancel this order?',
                  [
                    {
                      text: 'Yes',
                      onPress: () =>
                        handleDeleteItem(
                          item.id,
                          item.Type,
                          item.Quantity,
                          item.Product_id,
                        ),
                    },
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: true},
                )
              }>
              <Icon name="trash" size={25} color="#B22222" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
  // Item_id:id,
  const handleDeleteItem = async (id, Type, Quantity, Product_id) => {
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Delete/DeleteItemOrder.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      Item_id: id,
      Item_type: Type,
      Item_quantity: Quantity,
      Item_prod_id: Product_id,
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
          setData([]);
          Alert.alert('Attention', response.message);
          console.log('Response: ', response);
        } else {
          console.error(
            'Invalid response format: Missing success or message property',
          );
        }
      })
      .catch(error => {
        Alert.alert('Attention', `Network error: ${error.message}`);
      });
  };

  const handleReceive = Id => {
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/EditUserReceiveOrder.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      Product_Id: Id,
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
          setData([]);
          Alert.alert('Attention', response.message);
          console.log('Response: ', response);
        } else {
          console.error(
            'Invalid response format: Missing success or message property',
          );
        }
      })
      .catch(error => {
        Alert.alert('Attention', `Network error: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
        extraData={refreshFlag}
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
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 10,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  productStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    marginRight: 10,
  },
  receiveButton: {
    marginLeft: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 'auto',
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2E8B57',
    borderRadius: 5,
  },
  deleteButton: {
    marginRight: 8,
  },
  deleteContainer: {
    flexDirection: 'row', // If you want items in a row, change this to 'column'
    alignItems: 'center', // Adjust as needed
    justifyContent: 'flex-start', // Adjust as needed
  },
});
