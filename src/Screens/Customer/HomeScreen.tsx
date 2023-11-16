import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

export default function HomeScreen({navigation, route}: any) {
  const details = route.params?.details || null;
  const [data, setData] = useState([]);

  const refFlag = route.params?.refreshing;
  const [refreshFlag, setRefreshFlag] = useState(refFlag);
  const [loading, setLoading] = useState(false);
  // console.log('H:Route-From: ', route);
  useEffect(() => {
    // console.log('Screen Refreshed');
    // setRefreshing(true);
    fetchData();
  }, [refreshFlag, navigation, route]);
  // }, [data, navigation, route]);
  const fetchData = async () => {
    // console.log('Screen Focused');
    // try {
    const response = await fetch(
      'https://krichwater2023.000webhostapp.com/Products/Display/DisplayWater.php',
    );
    const result = await response.json();
    if (result.success) {
      setData(result.data);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    //   else {
    //     console.error('Data fetch failed:', result.message);
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error.message);
    // }
    // finally {
    //   setLoading(false);
    // }
  };
  const handleImagePress = (
    price,
    image,
    description,
    productId,
    stock,
    type,
  ) => {
    navigation.navigate('ProductDetails', {
      path: 'Home',
      details,
      price,
      image,
      description,
      productId,
      stock,
      type,
      refreshing: true,
    });
  };
  // console.log('Home Screen:', details.userData);
  // console.log('Products-ID:', data);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator style={{marginTop: 20}} /> : ''}
      <View style={styles.row}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          // refreshing={refreshing}
          extraData={refreshFlag}
          ListEmptyComponent={() => (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No data available.
            </Text>
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={
                styles.imageContainer
                // item.Type === 'Water'
                //   ? styles.imageContainer
                //   : styles.imageContainer1
              }
              onPress={() => {
                item.Stock == 0
                  ? Alert.alert('Attention', 'Product out of Stock')
                  : handleImagePress(
                      item.Price,
                      item.Image,
                      item.Name,
                      item.id,
                      item.Stock,
                      item.Type,
                    );
              }}>
              <Image
                source={{
                  uri:
                    'https://krichwater2023.000webhostapp.com/Products/Add&Edit/Image/' +
                    item.Image,
                }}
                style={[styles.image, {resizeMode: 'stretch'}]}
              />
              <View style={styles.textContainer}>
                {item.Type === 'Container' ? (
                  <Text style={[styles.price, {color: 'red'}]}>
                    Type: {item.Type}
                  </Text>
                ) : (
                  <Text style={[styles.price, {color: 'blue'}]}>
                    Type: {item.Type}
                  </Text>
                )}

                <Text style={styles.description}>{item.Name}</Text>
                <Text style={styles.price}>
                  ₱ {parseInt(item.Price).toFixed(2)}
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
  imageContainer1: {
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#AAAAAA',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
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
