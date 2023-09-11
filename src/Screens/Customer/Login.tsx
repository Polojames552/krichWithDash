import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ImageBackground } from "react-native";
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("Options");
  };

  const handleSignup= () =>{
  navigation.navigate("SignUp");
};

  return (
    <ImageBackground
      source={require("../../Assets/Images/bg_main.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
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
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4A78D3" }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account yet?</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4A78D3" }]}
              onPress={handleSignup}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch" or whatever suits your design
    justifyContent: "center",
  },
  titleContainer: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
    paddingBottom:15,
    paddingRight:'60%',
    borderBottomWidth:2
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
});

export default LoginScreen;
