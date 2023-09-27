import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import Options from './src/Navigation/Options';
import UploadImage from './src/Screens/Customer/UploadImage';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      // <UploadImage />
    );
  }
}

const styles = StyleSheet.create({});
