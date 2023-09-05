import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  LogBox,
} from 'react-native';

// Icon Set
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector, useDispatch} from 'react-redux';

const {width} = Dimensions.get('window');
const widthSize = width;

const HomeScreen = ({navigation}) => {
  const localImageSource = require('../../Assets/Images/splash.png');

    return (
      <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View />

          <View
            style={{justifyContent: 'center', alignItems: 'center', left: 5}}>
            <Text
              style={{
                color: '#542E16',
                fontSize: 18,
                fontFamily: 'RalewayBlack-8VzB',
                fontWeight: '900',
              }}>
              Krich
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('ProductDetails')}
              style={{marginRight: 10}}>
              <IconIonicons
                onPress={() => navigation.navigate('CartDetails')}
                name="basket-outline"
                color="black"
                size={25}
              />
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  padding: 5,
                  backgroundColor: 'red',
                  borderRadius: 20,
                  height: 25,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                
              </View>
            </TouchableOpacity>
          </View>
        </View>
       
      </View>
    );
 
};

export default HomeScreen;

const styles = StyleSheet.create({
  ItemContainer: {
    backgroundColor: 'white',
    flex: 1,
    height: widthSize / 1.9,
    margin: 5,
    borderRadius: 10,
    elevation: 5,
    marginTop: 40,
  },
  ItemInvisible: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
});
