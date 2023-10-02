import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Customer/Login';
import Splash from '../Screens/Customer/Splash';
import Registration from '../Screens/Customer/Registration';
import HomeScreen from '../Screens/Customer/HomeScreen';
import Options from './Options';
// import {useRoute} from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = route => {
  const details = route.params || null;
  console.log('AppNavigator:', details);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={Registration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{headerShown: false}}
      />
      {/* Add more screens here as needed */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
