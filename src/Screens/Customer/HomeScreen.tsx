import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

export default function HomeScreen({ navigation }) {
  const handleImagePress = (productId, image, description) => {
    navigation.navigate('ProductDetails', { productId, image, description });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(1, require('../../Assets/Images/round.jpg'), 'Round')}>
          <Image source={require('../../Assets/Images/round.jpg')} style={styles.image} />
          <Text style={styles.description}>Round</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(2, require('../../Assets/Images/eightliters.jpeg'), '8 Liters')}>
          <Image source={require('../../Assets/Images/eightliters.jpeg')} style={styles.image} />
          <Text style={styles.description}>8 Liters</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(3, require('../../Assets/Images/sixliters.jpg'), '6 Liters')}>
          <Image source={require('../../Assets/Images/sixliters.jpg')} style={styles.image} />
          <Text style={styles.description}>6 Liters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(4, require('../../Assets/Images/slim.jpg'), 'Slim')}>
          <Image source={require('../../Assets/Images/slim.jpg')} style={styles.image} />
          <Text style={styles.description}>Slim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageContainer: {
    margin: 5,
    borderColor: '#70A5CD',
    borderWidth: 5,
    alignItems: 'center',
    borderRadius: 30
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 30
  },
  description: {
    marginTop: 5,
    fontSize:20,
    fontWeight:'bold'
  }
});
