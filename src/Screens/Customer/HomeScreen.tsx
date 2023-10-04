import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function HomeScreen({navigation, route}: any) {
  const details = route.params?.details || null;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('H:Route-From: ', route);
  useEffect(() => {
    fetchData();
  }, []);
  // }, [data]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://underdressed-legisl.000webhostapp.com/Display/DisplayHomeWater.php',
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        console.error('Data fetch failed:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleImagePress = (price, image, description, productId) => {
    navigation.navigate('ProductDetails', {
      path: 'Home',
      details,
      price,
      image,
      description,
      productId,
    });
  };
  console.log('Home Screen:', details.userData); //Out put id of user who logged in
  console.log('Products-ID:', data);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() =>
                handleImagePress(
                  item.Price,

                  item.Image,

                  'Round',
                  item.id,
                )
              }>
              <Image
                source={{
                  uri:
                    'https://underdressed-legisl.000webhostapp.com/products/' +
                    item.Image,
                }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.description}>{item.Name}</Text>
                <Text style={styles.price}>
                  Php {parseInt(item.Price).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
