import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const productsData = [
  {
    id: 1,
    image: require('../../Assets/Images/round.jpg'),
    title: 'Received Product 1',
    received: false,
  },
  // Add more products as needed
];

export default function Received({navigation, route}) {
  const details = route.params?.details || null;
  const userData = details.userData;
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const refFlag = route.params?.refreshing;
  const [refreshFlag, setRefreshFlag] = useState(refFlag);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('Screen Refreshed');
    // setRefreshing(true);
    fetchData();
  }, [refreshFlag, navigation, route]);

  const handleProductPress = (productId, image, title) => {
    navigation.navigate('ProductDetails', {productId, image, title});
  };

  const fetchData = async () => {
    const user_id = userData.id;
    const response = await fetch(
      `https://krichsecret.000webhostapp.com/Products/Display/DisplayUserReceived.php?userId=${user_id}`,
    );
    const result = await response.json();
    if (result.success) {
      setData([...result.data]);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // setProducts(result.data.map(product => ({...product})));
      // setRefreshing(false);
      // console.log('Result-latest: ', result.data);
    } else {
      // console.error('Data fetch failed:', result.message);
    }
  };

  const renderProductItem = ({item}) => (
    <View style={styles.productItem}>
      <Image
        source={{
          uri:
            'https://krichwater2023.000webhostapp.com/Products/Add&Edit/Image/' +
            item.Image,
        }}
        style={[styles.productImage, {resizeMode: 'stretch'}]}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.Description}</Text>
        <Text style={[styles.productTitle, {fontSize: 11}]}>
          {item.time_updated}
        </Text>
        {item.Status && <Icon name="check" size={20} color="green" />}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator style={{marginTop: 20}} /> : ''}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
        extraData={refreshFlag}
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
