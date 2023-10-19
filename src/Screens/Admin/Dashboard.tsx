import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';

const Dashboard = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [action, setAction] = useState('');
  useEffect(() => {
    // console.log('Screen Refreshed');
    fetchData();
  }, [data]);
  const handleUserPress = (
    id,
    Username,
    Password,
    Fname,
    Lname,
    Email,
    Address,
    Number,
    Status,
    Picture,
  ) => {
    navigation.navigate('UserDetails', {
      id,
      Username,
      Password,
      Fname,
      Lname,
      Email,
      Address,
      Number,
      Status,
      Picture,
    });
  };

  const handleAcceptUser = newUserId => {
    setSelectedUserId(newUserId);
    setAction('Verify');
    // showConfirmation('Verify', 'Are you sure you want to verify this user?');
    Alert.alert(
      `Attention`,
      'Are you sure you want to Verify this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setSelectedUserId(null),
        },
        {text: 'OK', onPress: () => performAction(newUserId)},
      ],
      {cancelable: true},
    );
  };

  const handleSuspend = newUserId => {
    setSelectedUserId(newUserId);
    setAction('Suspend');
    // showConfirmation('Verify', 'Are you sure you want to verify this user?');
    Alert.alert(
      `Attention`,
      'Are you sure you want to Suspend this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setSelectedUserId(null),
        },
        {text: 'OK', onPress: () => performAction(newUserId)},
      ],
      {cancelable: true},
    );
  };

  const performAction = newUserId => {
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/Authentication/VerifyUser.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      User_id: newUserId,
      Action: action,
    };
    // console.log(Data);
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(Data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(response => {
        if (response && response.success) {
          Alert.alert('Attention', response.message);
          console.log('Response: ', response);
        } else {
          // Handle the case where 'success' or 'message' is not present in the response
          console.error(
            'Invalid response format: Missing success or message property',
          );
        }
      })
      .catch(error => {
        Alert.alert('Attention', `Network error: ${error.message}`);
      });

    console.log(`${action} the user with ID: ${newUserId} `);
    // setSelectedUserId(null);
  };

  const userData = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        handleUserPress(
          item.id,
          item.Username,
          item.Password,
          item.Fname,
          item.Lname,
          item.Email,
          item.Address,
          item.Number,
          item.Status,
          item.Picture,
        )
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Image
          source={require('../../Assets/Images/Avatar.png')}
          style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}}
        />
        <View>
          <Text>
            {item.Fname} {item.Lname}
          </Text>
        </View>
        {item.Status === 'Verified' ? (
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              padding: 8,
              backgroundColor: 'red',
              borderRadius: 5,
            }}
            onPress={() => handleSuspend(item.id)}>
            <Text style={{color: '#FFFFFF'}}>Suspend</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              padding: 8,
              backgroundColor: '#007BFF',
              borderRadius: 5,
            }}
            onPress={() => handleAcceptUser(item.id)}>
            <Text style={{color: '#FFFFFF'}}>Verify</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://krichsecret.000webhostapp.com/Authentication/DisplayUsers.php',
      );
      const result = await response.json();
      // console.log(result.message);
      if (result.success) {
        setData(result.data);
      } else {
        console.error('Data fetch failed:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        New Users For Verification
      </Text>
      <FlatList
        data={data}
        renderItem={userData}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data available.
          </Text>
        )}
      />
    </View>
  );
};

export default Dashboard;
