import React, {useState} from 'react';
import OrderList from '../Screens/Admin/OrderList';
import UserDetails from '../Screens/Admin/UserDetails';
import ProductAddScreen from '../Screens/Admin/ProductAddScreen';
import ProductEditScreen from '../Screens/Admin/ProductEditScreen';
import UserDashboard from '../Screens/Admin/UserDashboard';
import SalesDashboard from '../Screens/Admin/SalesDashboard';
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
        onPress={() => navigation.navigate('Dashboard')}
      />
      <DrawerItem
        label="Users"
        icon={({color, size}) => (
          <FontAwesome5 name="users" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Users')}
      />
      <DrawerItem
        label="Products"
        icon={({color, size}) => (
          <FontAwesome5 name="box" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Products')}
      />
      <DrawerItem
        label="Orders"
        icon={({color, size}) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Orders')}
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
              <FontAwesome5 name="sign-out-alt" size={24} color={'white'} />
              Logout
            </Text>
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
              name="Dashboard"
              initialParams={{details, refreshing: true}}
              component={SalesDashboard}
            />
            <Drawer.Screen
              name="Users"
              component={UserDashboard}
              initialParams={{details, refreshing: true}}
            />
            <Drawer.Screen
              name="Products"
              initialParams={{refreshing: true}}
              component={Products}
            />
            <Drawer.Screen
              name="Orders"
              initialParams={{refreshing: true}}
              component={OrderList}
            />
          </Drawer.Navigator>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="EditProducts"
        component={ProductEditScreen}
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
        }}
      />
      <Stack.Screen
        name="AddProducts"
        component={ProductAddScreen}
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
        }}
      />

      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
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
        }}
      />
    </Stack.Navigator>
  );
}
