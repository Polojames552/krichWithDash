import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ImageBackground, ScrollView } from "react-native";

const RegistrationScreen= ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../Assets/Images/bg_main.png")}
      style={styles.backgroundImage}
    >
      <View style={{ padding:'20%' }}></View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create an Account</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => setFirstname(text)}
            value={firstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(text) => setLastname(text)}
            value={lastname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Complete Address"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            secureTextEntry
            onChangeText={(text) => setNumber(text)}
            value={number}
          />
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadText}>*Upload Any Valid ID</Text>
            <TouchableOpacity
              style={styles.uploadIcon}
              onPress={() => {
                // Handle opening the gallery here
              }}
            ></TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login Details</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4A78D3" }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already Have an Account?</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4A78D3" }]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  titleContainer: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
    paddingBottom: 15,
    paddingRight: "10%",
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loginContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "5%",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signupContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  uploadContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    paddingRight: "50%",
    paddingBottom: "10%",
  },
  uploadText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});

export default RegistrationScreen;
