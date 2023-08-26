import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';


const splashScreen = () => {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../Assets/Images/splash.png')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
    );
  };
  
  const { height, width } = Dimensions.get('window');
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'green'
    },
    image: {
      width: width,
      height: height,
    },
  });
  
  export default splashScreen;
