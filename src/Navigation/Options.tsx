import React, {useState} from 'react';
import MyCart from '../Screens/Customer/MyCart';
import Received from '../Screens/Customer/Received';
import HomeScreen from '../Screens/Customer/HomeScreen';
import Orders from '../Screens/Customer/Orders';
import ProductDetails from '../Screens/Customer/ProductDetails';
import AccountDetails from '../Screens/Customer/AccountDetails';
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
        label="Home"
        icon={({color, size}) => (
          <FontAwesome5 name="home" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Home', {refreshing: true})}
      />
      <DrawerItem
        label="My Cart"
        icon={({color, size}) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('MyCart', {refreshing: true})}
      />

      <DrawerItem
        label="My Orders"
        icon={({color, size}) => (
          <FontAwesome5 name="clipboard-list" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Orders', {refreshing: true})}
      />
      <DrawerItem
        label="Received"
        icon={({color, size}) => (
          <FontAwesome5 name="box" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Received', {refreshing: true})}
      />

      {navigation.isFocused() && (
        <View style={{marginTop: '146%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF6347',
              paddingVertical: 10,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={handleLogout}>
            <Text style={{color: 'white', fontSize: 18}}>
              {' '}
              <FontAwesome5 name="sign-out-alt" size={24} color={'white'} />
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function Options({navigation}) {
  const route = useRoute();
  const details = route.params || null;
  // console.log('Options Screen:', JSON.stringify(details, null, 2));
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="KRICH WATER REFILLING STATION"
        options={{
          headerTitle: 'KRICH WATER REFILLING STATION',
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
            drawerContentOption={{activeTintColor: 'blue'}}
            initialRouteName="Home" // Set the initial route to Home
          >
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{details, refreshing: true}}
            />
            <Drawer.Screen
              name="MyCart"
              component={MyCart}
              initialParams={{details}}
            />
            <Drawer.Screen
              name="Orders"
              initialParams={{details}}
              component={Orders}
            />
            <Drawer.Screen
              name="Received"
              initialParams={{details}}
              component={Received}
            />
          </Drawer.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerTitle: 'KRICH WATER REFILLING STATION',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#70A5CD',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 24,
          },
        }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{
          headerTitle: 'KRICH WATER REFILLING STATION',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#70A5CD',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 24,
          },
        }}
      />
    </Stack.Navigator>
  );
}
