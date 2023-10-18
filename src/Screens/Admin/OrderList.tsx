import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const OrderItem = ({ order, showButtons, handleAccept, handleDecline }) => {
  return (
    <View style={styles.orderContainer}>
      <Image source={order.image} style={styles.image} />
      <Text style={styles.description}>{order.description}</Text>
      <Text style={styles.customerInfo}>Customer: {order.customer.name}</Text>
      <Text style={styles.customerInfo}>Address: {order.customer.address}</Text>
      {showButtons && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAccept(order.id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDecline(order.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const NewOrdersScreen = () => {
  const newOrders = [
    { id: 1, image: require('../../Assets/Images/round.jpg'), description: 'New Order 1 Description', customer: { name: 'John Doe', address: '123 Main St' } },
    { id: 2, image: require('../../Assets/Images/round.jpg'), description: 'New Order 2 Description', customer: { name: 'Jane Smith', address: '456 Oak Ave' } },
    // Add more new orders as needed
  ];

  const handleAccept = (orderId) => {
    // Handle accept logic here
  };

  const handleDecline = (orderId) => {
    // Handle decline logic here
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={newOrders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            showButtons={true} 
            handleAccept={handleAccept}
            handleDecline={handleDecline}
          />
        )}
      />
    </View>
  );
};

const CompletedOrdersScreen = () => {
  const completedOrders = [
    { id: 1, image: require('../../Assets/Images/sixliters.jpg'), description: 'Completed Order 1 Description', customer: { name: 'James Brown', address: '789 Pine Rd' } },
    { id: 2, image: require('../../Assets/Images/sixliters.jpg'), description: 'Completed Order 2 Description', customer: { name: 'Jill Green', address: '1010 Cedar Blvd' } },
    // Add more completed orders as needed
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={completedOrders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            showButtons={false} 
          />
        )}
      />
    </View>
  );
};

const CancelledOrdersScreen = () => {
  const cancelledOrders = [
    { id: 1, image: require('../../Assets/Images/slim.jpg'), description: 'Cancelled Order 1 Description', customer: { name: 'Jack Red', address: '111 Elm Ln' } },
    { id: 2, image: require('../../Assets/Images/slim.jpg'), description: 'Cancelled Order 2 Description', customer: { name: 'Jenny Blue', address: '222 Maple Dr' } },
    
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={cancelledOrders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            showButtons={false} 
          />
        )}
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const OrderList = () => {
  return (
   
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "New Orders") {
              iconName = "plus-circle";
            } else if (route.name === "Completed Orders") {
              iconName = "check-circle";
            } else if (route.name === "Cancelled Orders") {
              iconName = "times-circle";
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#70A5CD",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="New Orders" component={NewOrdersScreen} />
        <Tab.Screen name="Completed Orders" component={CompletedOrdersScreen} />
        <Tab.Screen name="Cancelled Orders" component={CancelledOrdersScreen} />
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
    marginBottom: 20,
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
    backgroundColor: '#70A5CD',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderList;
