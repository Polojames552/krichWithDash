import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const productsData = [
  {
    id: 1,
    image: require('../../Assets/Images/round.jpg'),
    title: 'Received Product 1',
    received: true,
  },
  {
    id: 2,
    image: require('../../Assets/Images/eightliters.jpeg'),
    title: 'Received Product 2',
    received: false,
  },
  // Add more products as needed
];

export default function Received({navigation}) {
  const handleProductPress = (productId, image, title) => {
    navigation.navigate('ProductDetails', {productId, image, title});
  };

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item.id, item.image, item.title)}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        {item.received && <Icon name="check" size={20} color="green" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 10,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
