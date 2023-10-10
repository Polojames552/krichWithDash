import React, { useState } from "react";
import { View, TextInput, Button, Image, StyleSheet } from "react-native";

const ProductEditScreen = ({ route }) => {
    const { price, imageUrl, description } = route.params || {};

  const [editedPrice, setEditedPrice] = useState(price);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = () => {
    // Implement logic to save the edited details
    // You can use `editedPrice` and `editedDescription` in your logic.
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={editedPrice.toString()}
        onChangeText={(text) => setEditedPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={editedDescription}
        onChangeText={(text) => setEditedDescription(text)}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 16,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default ProductEditScreen;