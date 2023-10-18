import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput } from "react-native";

const UserDetails = ({navigation}) => {
  const [userData, setUserData] = useState({
    username: "johndoe",
    password: "********",
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Cityville",
    number: "123-456-7890",
    image: require('../../Assets/ProfilePics/aldin.jpg') // Default image
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = () => {
    // Implement image upload logic here
    // This could involve using a library like react-native-image-picker
  };

  const handleEditPress = () => {
    setIsEditing(prevState => !prevState);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    // Implement logic to save edited data (if needed)
  };

  const handleChange = (key, value) => {
    setUserData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadButton}>
        <Image source={userData.image} style={styles.profileImage} />
        <Text style={styles.uploadText}>Change Profile Picture</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        {Object.entries(userData).map(([key, value]) => (
          <View style={styles.detailRow} key={key}>
            <Text style={styles.detailLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
            {isEditing ? (
              <TextInput
                style={styles.detailValueEditable}
                value={value}
                onChangeText={(text) => handleChange(key, text)}
              />
            ) : (
              <Text style={styles.detailValue}>{value}</Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={isEditing ? handleSavePress : handleEditPress} style={styles.editButton}>
        <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",  // Align to the top
    paddingTop: 40,  // Add padding to the top to avoid crowding
    paddingHorizontal: 20,
  },
  imageUploadButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  uploadText: {
    marginTop: 5,
    color: "#007BFF",
    fontSize: 16,
  },
  detailsContainer: {
    width: "100%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 10,
    width: 120,
    fontSize: 16,
  },
  detailValue: {
    flex: 1,
    fontSize: 16,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  detailValueEditable: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    padding: 0,
    marginBottom: -5, // Adjust for TextInput default padding
  },
});

export default UserDetails;
