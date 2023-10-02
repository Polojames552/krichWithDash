import React from "react";
import MyCart from "../Screens/Customer/MyCart";
import Received from "../Screens/Customer/Received";
import HomeScreen from "../Screens/Customer/HomeScreen";
import Orders from "../Screens/Customer/Orders";
import ProductDetails from "../Screens/Customer/ProductDetails";
import AccountDetails from "../Screens/Customer/AccountDetails";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, TouchableOpacity, Text } from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {useRoute} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent({ navigation }) {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can use AsyncStorage to clear user data and navigate to the login screen
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => (
          <FontAwesome5 name="home" size={size} color={color} />
        )}
        onPress={() => navigation.navigate("Home")}
        
      />
      <DrawerItem
        label="My Cart"
        icon={({ color, size }) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        )}
        onPress={() => navigation.navigate("MyCart")}
      />
      <DrawerItem
        label="Received"
        icon={({ color, size }) => (
          <FontAwesome5 name="box" size={size} color={color} />
        )}
        onPress={() => navigation.navigate("Received")}
      />
      <DrawerItem
        label="Orders"
        icon={({ color, size }) => (
          <FontAwesome5 name="clipboard-list" size={size} color={color} />
        )}
        onPress={() => navigation.navigate("Orders")}
      />
      <DrawerItem
        label="Product Details"
        icon={({ color, size }) => (
          <FontAwesome5 name="info-circle" size={size} color={color} />
        )}
        onPress={() => navigation.navigate("ProductDetails")}
      />
      <DrawerItem
  label="Account Details"
  icon={({ color, size }) => (
    <FontAwesome5 name="user" size={size} color={'gray'} />
  )}
  onPress={() => navigation.navigate("AccountDetails")}
/>
      {navigation.isFocused() && (
        <View style={{ marginTop:'108%' }}>
       <TouchableOpacity
       style={{
         backgroundColor: "#FF6347",
         paddingVertical: 10,
         alignItems: "center",
         marginTop: 10,
       }}
       onPress={handleLogout}
     >
       <Text style={{ color: "white", fontSize: 18 }}>Logout</Text>
     </TouchableOpacity>
     </View>
      )}
    </View>
  );
}

export default function Options({ navigation }) {
  const route = useRoute();
  const details = route.params || null;
  console.log('Options Screen:', details);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="KRICH WATER REFILLING STATION"
        options={{
          headerTitle: "KRICH WATER REFILLING STATION",
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: "#70A5CD",
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 24,
          },
        }}
      >
        {() => (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerContentOptions={{ activeTintColor: "blue" }}
          >
            <Drawer.Screen name="Home" component={HomeScreen} initialParams={{details}}  />
            <Drawer.Screen name="MyCart" component={MyCart} />
            <Drawer.Screen name="Received" component={Received} />
            <Drawer.Screen name="Orders" component={Orders} />
            <Drawer.Screen name="ProductDetails" component={ProductDetails} />
            <Drawer.Screen name="AccountDetails" component={AccountDetails} />
            
          </Drawer.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
