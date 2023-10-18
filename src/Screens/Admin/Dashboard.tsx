import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";

const Dashboard = ({navigation}) => {
  const newUsers = [
    { id: 1, name: "John Doe", image: require('../../Assets/ProfilePics/aldin.jpg') },
    { id: 2, name: "Jane Smith", image: require('../../Assets/ProfilePics/aldin.jpg') },
    // Add more friend request data as needed
  ];
  const handleUserPress = (user) => {
    navigation.navigate('UserDetails', { user }); // Assuming you're passing the user object to UserDetails
  };


  const unverifiedUser = ({ item }) =>(
    <TouchableOpacity onPress={handleUserPress}>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
        <Image
          source={item.image}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <View>
          <Text>{item.name}</Text>
        </View>
        <TouchableOpacity
          style={{ marginLeft: "auto", padding: 8, backgroundColor: "#007BFF", borderRadius: 5 }}
          onPress={() => handleAcceptUser(item.id)}
        >
          <Text style={{ color: "#FFFFFF" }}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 10, padding: 8, backgroundColor: "#DC3545", borderRadius: 5 }}
          onPress={() => handleRejectUser(item.id)}
        >
          <Text style={{ color: "#FFFFFF" }}>Reject</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const verifiedUsers = [
    { id: 101, name: "Verified User 1", image: require('../../Assets/ProfilePics/aldin.jpg') },
    { id: 102, name: "Verified User 2", image: require('../../Assets/ProfilePics/aldin.jpg') },
    // Add more verified user data as needed
  ];

  const renderVerifiedUserItem = ({ item }) => (
    <TouchableOpacity onPress={handleUserPress}>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
        <Image
          source={item.image}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <View>
          <Text>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const handleAcceptUser = (newUserId) => {
    // Implement logic for accepting friend request
  };

  const handleRejectUser = (newUserId) => {
    // Implement logic for rejecting friend request
  };


  return (
    <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>New Users For Verification</Text>
    <FlatList
      data={newUsers}
      renderItem={unverifiedUser}
      keyExtractor={(item) => item.id.toString()}
    />

    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Verified Users</Text>
    <FlatList
      data={verifiedUsers}
      renderItem={renderVerifiedUserItem}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
  );
};

export default Dashboard;
