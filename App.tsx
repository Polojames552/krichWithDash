import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import AppNavigator from "./src/Navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Options from "./src/Navigation/Options";


export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
      
    );
  }
}

const styles = StyleSheet.create({});
