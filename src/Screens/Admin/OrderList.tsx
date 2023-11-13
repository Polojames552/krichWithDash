import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const OrderItem = ({
  order,
  showButtons,
  handleAccept,
  // handleDecline,
  showDoneButton,
  handleDone,
  route,
}) => {
  return (
    <View style={styles.orderContainer}>
      <Image
        source={{
          uri:
            'https://krichwater2023.000webhostapp.com/Products/Add&Edit/Image/' +
            order.Image,
        }}
        style={styles.image}
      />
      <Text style={styles.description}>{order.Description}</Text>
      {order.Status === 'For Approval' || order.Status === 'To Receive' ? (
        <View>
          <Text
            style={[
              styles.customerInfo,
              {textAlign: 'center', color: 'green'},
            ]}>
            Customer: {order.Name}
          </Text>
          <Text style={styles.customerInfo}>Address: {order.Address}</Text>
        </View>
      ) : (
        <View>
          <Text
            style={[styles.customerInfo, {textAlign: 'center', color: 'red'}]}>
            Customer: {order.Name}
          </Text>
          <Text style={styles.customerInfo}>Address: {order.Address}</Text>
        </View>
      )}
      {/* <Text style={styles.customerInfo}>Customer: {order.Name}</Text>
      <Text style={styles.customerInfo}>Address: {order.Address}</Text> */}
      {showButtons && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => handleAccept(order.id)}
            onPress={() =>
              Alert.alert(
                `Confirmation`,
                'Accept Order?',
                [
                  {
                    text: 'Accept',
                    onPress: () =>
                      handleAccept(
                        order.id,
                        order.Type,
                        order.Quantity,
                        order.Product_id,
                      ),
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              )
            }>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={() => handleDecline(order.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity> */}
        </View>
      )}
      {showDoneButton && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDone(order.id)}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const NewOrdersScreen = (navigation, route) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [data, navigation, route]);
  // }, [data]);

  const fetchData = async () => {
    // console.log('Screen Focused');
    // try {
    const response = await fetch(
      'https://krichsecret.000webhostapp.com/Products/Display/Admin/DisplayAdminNewOrder.php',
    );
    const result = await response.json();
    if (result.success) {
      setData([...result.data]);
    }
    //   else {
    //     console.error('Data fetch failed:', result.message);
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error.message);
    // }
  };

  const handleAccept = (id, Type, Quantity, Product_id) => {
    // console.log(orderId);
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Products/Add&Edit/EditAdminAcceptNewOrders.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      id: id,
      type: Type,
      quantity: Quantity,
      product_id: Product_id,
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
          // Handle the case where 'success' or 'message' is not present in the response
          console.error(
            'Invalid response format: Missing success or message property',
          );
        }
      })
      .catch(error => {
        Alert.alert('Attention', `Network error: ${error.message}`);
      });
  };

  // const handleDecline = orderId => {
  // };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <OrderItem
            order={item}
            showButtons={true}
            handleAccept={handleAccept}
            // handleDecline={handleDecline}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const CompletedOrdersScreen = () => {
  const [dataComplete, setDataComplete] = useState([]);
  useEffect(() => {
    fetchData();
  }, [dataComplete]);
  // }, [dataComplete]);

  const fetchData = async () => {
    // console.log('Screen Focused');
    // try {
    const response = await fetch(
      'https://krichsecret.000webhostapp.com/Products/Display/Admin/DisplayAdminComplete.php',
    );
    const result = await response.json();
    if (result.success) {
      setDataComplete(result.data);
    }
    //   else {
    //     console.error('Data fetch failed:', result.message);
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error.message);
    // }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataComplete}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <OrderItem order={item} showButtons={false} />}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const ToDeliverScreen = () => {
  const [dataDeliver, setDataDeliver] = useState([]);
  useEffect(() => {
    fetchData();
  }, [dataDeliver]);
  // }, [dataDeliver]);

  const fetchData = async () => {
    // console.log('Screen Focused');
    // try {
    const response = await fetch(
      'https://krichsecret.000webhostapp.com/Products/Display/Admin/DisplayAdminToDeliver.php',
    );
    const result = await response.json();
    if (result.success) {
      setDataDeliver(result.data);
    }
    //   else {
    //     console.error('Data fetch failed:', result.message);
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error.message);
    // }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataDeliver}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <OrderItem order={item} showDoneButton={false} />
        )}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const OrderList = (route, navigation) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'New Orders') {
            iconName = 'plus-circle';
          } else if (route.name === 'Completed Orders') {
            iconName = 'check-circle';
          } else if (route.name === 'To Deliver') {
            iconName = 'truck';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#70A5CD',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="New Orders" component={NewOrdersScreen} />
      <Tab.Screen name="To Deliver" component={ToDeliverScreen} />
      <Tab.Screen name="Completed Orders" component={CompletedOrdersScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  orderContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerInfo: {
    marginTop: 10,
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2E8B57',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderList;
