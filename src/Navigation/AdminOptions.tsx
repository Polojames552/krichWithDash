import React, {useState} from 'react';
// import MyCart from '../Screens/Customer/MyCart';
// import Received from '../Screens/Customer/Received';
// import HomeScreen from '../Screens/Customer/HomeScreen';
// import Orders from '../Screens/Customer/Orders';
// import ProductDetails from '../Screens/Customer/ProductDetails';
// import AccountDetails from '../Screens/Customer/AccountDetails';
import ProductAddScreen from '../Screens/Admin/ProductAddScreen';
import ProductEditScreen from '../Screens/Admin/ProductEditScreen';
import Dashboard from '../Screens/Admin/Dashboard';
import Products from '../Screens/Admin/Products';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent({navigation}) {
  const handleLogout = () => {
    navigation.replace('Login');
    AsyncStorage.removeItem('authToken');
    AsyncStorage.removeItem('user');
    AsyncStorage.setItem('login', 'false');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerItem
        label="Dashboard"
        icon={({color, size}) => (
          <FontAwesome5 name="home" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Products"
        icon={({color, size}) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Products')}
      />
       <DrawerItem
        label="Products Details"
        icon={({color, size}) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('EditProducts')}
      />
       <DrawerItem
        label="Add Product"
        icon={({color, size}) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('AddProducts')}
      />

     
      {navigation.isFocused() && (
        <View style={{marginTop: '108%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF6347',
              paddingVertical: 10,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={handleLogout}>
            <Text style={{color: 'white', fontSize: 18}}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function AdminOptions({navigation}) {
  const route = useRoute();
  const details = route.params || null;
  console.log('Options Screen:', JSON.stringify(details, null, 2));

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="KRICH WATER REFILLING STATION"
        options={{
          headerTitle: 'ADMIN',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#70A5CD',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 24,
          },
        }}>
        {() => (
          <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions={{activeTintColor: 'blue'}}>
            <Drawer.Screen
              name="Home"
              component={Dashboard}
              initialParams={{details}}
            />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="EditProducts" component={ProductEditScreen} />
            <Drawer.Screen name="AddProducts" component={ProductAddScreen} />
            
           
          </Drawer.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
