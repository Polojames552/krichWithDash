import React from "react";
import MyCart from "../Screens/Customer/MyCart";
import Received from "../Screens/Customer/Received";
import HomeScreen from "../Screens/Customer/HomeScreen";
import Orders from "../Screens/Customer/Orders";
import ProductDetails from "../Screens/Customer/ProductDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"; // Import the icons

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Create a custom component for the drawer items with icons
const CustomDrawerItem = ({ label, icon }) => (
  <DrawerItem
    label={label}
    icon={({ focused, color, size }) => (
      <FontAwesome5 name={icon} size={size} color={color} /> // Use the imported icon
    )}
    onPress={() => {}}
  />
);

export default function Options() {
  return (
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="KRICH WATER REFILLING STATION">
          {() => (
            <Drawer.Navigator drawerContentOptions={{ activeTintColor: "blue" }}>
              <Drawer.Screen
                name="Home"
                options={{
                  drawerIcon: ({ color, size }) => (
                    <FontAwesome5 name="home" size={size} color={color} />
                  ),
                  headerTitle: '', // Added this line
                }}
                component={HomeScreen}
              />
              <Drawer.Screen
                name="My Cart"
                component={MyCart} 
                options={{
                  drawerIcon: ({ color, size }) => (
                    <FontAwesome5
                      name="shopping-cart"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />

              <Drawer.Screen
                name="Received"
                options={{
                  drawerIcon: ({ color, size }) => (
                    <FontAwesome5 name="box" size={size} color={color} />
                  ),
                }}
                component={Received}
              />
              <Drawer.Screen
                name="Orders"
                options={{
                  drawerIcon: ({ color, size }) => (
                    <FontAwesome5
                      name="clipboard-list"
                      size={size}
                      color={color}
                    /> 
                  ),
                }}
                component={Orders}
              />
              <Drawer.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                  drawerLabel: () => null, // Hide label from drawer
                }}
              />
            </Drawer.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
  );
}
