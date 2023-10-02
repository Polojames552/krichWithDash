import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default function HomeScreen({navigation, route}: any) {
  // const {details} = route.params;
  const details = route.params?.details || null;
  // const details = navigation.getParam('');
  const handleImagePress = (price: any, image: any, description: any) => {
    navigation.navigate('ProductDetails', {details, price, image, description});
  };
  console.log('Home Screen:', details.userData); //Out put id of user who logged in

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            handleImagePress(
              10,
              require('../../Assets/Images/round.jpg'),
              'Round',
            )
          }>
          <Image
            source={require('../../Assets/Images/round.jpg')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.description}>Round</Text>
            <Text style={styles.price}>Php 10.00</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            handleImagePress(
              15,
              require('../../Assets/Images/eightliters.jpeg'),
              '8 Liters',
            )
          }>
          <Image
            source={require('../../Assets/Images/eightliters.jpeg')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.description}>8 Liters</Text>
            <Text style={styles.price}>Php 15.00</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            handleImagePress(
              12,
              require('../../Assets/Images/sixliters.jpg'),
              '6 Liters',
            )
          }>
          <Image
            source={require('../../Assets/Images/sixliters.jpg')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.description}>6 Liters</Text>
            <Text style={styles.price}>Php 12.00</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            handleImagePress(
              18,
              require('../../Assets/Images/slim.jpg'),
              'Slim',
            )
          }>
          <Image
            source={require('../../Assets/Images/slim.jpg')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.description}>Slim</Text>
            <Text style={styles.price}>Php 18.00</Text>
          </View>
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
    backgroundColor: '#F3F3F3', // Light gray background
    padding: 20, // Added padding for spacing
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageContainer: {
    margin: 5,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center', // Center the content
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 15,
  },
  textContainer: {
    alignItems: 'center',
  },
  description: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial', // Use a custom font if available
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green', // Adjust the color if needed
  },
});
