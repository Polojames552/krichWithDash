import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Modal, // Added import for Modal
  ScrollView, // Added import for ScrollView
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL =
  "https://krichsecret.000webhostapp.com/Authentication/Login.php";

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkAuthentication();
    checkLogin();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userDataString = await AsyncStorage.getItem("user");

      if (token) {
        const userData = JSON.parse(userDataString);
        const role = userData.Role;

        if (role === "Admin") {
          navigation.replace("AdminOptions", { userData });
        } else if (role === "User") {
          navigation.replace("Options", { userData });
        } else {
          // Handle other roles if needed
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const checkLogin = async () => {
    const isLoggedIn = await AsyncStorage.getItem("login");
    if (isLoggedIn === "true") {
      setIsLoggedIn("true");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&password=${password}`,
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert("Success", data.message);
        const { token, user } = data;
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("login", "true");

        const userData = JSON.parse(JSON.stringify(user));

        const role = userData.Role;

        if (role === "Admin") {
          navigation.replace("AdminOptions", { userData });
        } else if (role === "User") {
          navigation.replace("Options", { userData });
        } else {
          // Handle other roles if needed
        }
      } else {
        Alert.alert("Error", data.message);
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred");
    }
  };

  const handleSignup = () => {
    navigation.navigate("SignUp");
  };

  const handleAboutClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("../../Assets/Images/bg_main.png")}
      style={styles.backgroundImage}
    >
      {isLoggedIn === "false" ? (
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Login</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => {
                setUsername(text);
                setUsernameError("");
              }}
              value={username}
            />
            {usernameError ? (
              <Text style={styles.errorText}>{usernameError}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
              value={password}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4A78D3" }]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.signupText}>Don't have an account yet?</Text>
            <TouchableOpacity
              style={[styles.button, styles.signupButton]}
              onPress={handleSignup}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.aboutLink} onPress={handleAboutClick}>
              About
            </Text>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalText}>
                Welcome to Krich Water Refilling Station - Your Trusted Source
                for Purified Water in Bulan, Sorsogon!
              </Text>
              <Text style={styles.aboutUsText}>
                At Krich Water Refilling Station, we take immense pride in
                providing the community of Bulan, Sorsogon, with the highest
                quality of purified water. Founded 2 years ago, our
                establishment is owned by Karen Guia, and we have since become a
                reliable source for clean and fresh water.
              </Text>
              <Text style={styles.aboutUsText}>
                Our commitment to using PURIFIED water instead of alkaline water
                is based on the belief that water should remain free from
                unpleasant odors even after three days. We understand the
                importance of water quality, and we go the extra mile to ensure
                that our customers receive water that is both safe and
                refreshing.
              </Text>
              <Text style={styles.aboutUsText}>
                We serve a wide customer base, making deliveries to households
                in Poblacion and to our valued resellers. Our dedication to
                customer service is reflected in our operating hours – we are
                open every day of the week, from Monday to Sunday, starting at
                6:00 AM and continuing until 7:00 PM. We are here to meet your
                water needs whenever you require our services.
              </Text>
              <Text style={styles.aboutUsText}>
                Conveniently located at Lapu-Lapu Street, Zone 2, Bulan,
                Sorsogon, our central position allows us to serve you
                efficiently and deliver your orders promptly.
              </Text>
              <Text style={styles.aboutUsText}>
                The quality of our water is maintained through a meticulous
                purification process. We use advanced filtration and
                disinfection equipment to ensure that you receive the best
                possible water quality:
              </Text>
              <Text style={styles.aboutUsText}>
                1. *Multi-Media Sediment Filter*: This initial filter eliminates
                sediments such as rust, sand, and fine particles, ensuring that
                the water is clear and free of impurities.
              </Text>
              <Text style={styles.aboutUsText}>
                2. *Ion Exchanger*: This device replaces hard minerals with
                softer ones, resulting in a smoother and more palatable water.
              </Text>
              <Text style={styles.aboutUsText}>
                3. *Activated Carbon Filter*: It removes organic compounds,
                pesticides, herbicides, and unpleasant tastes and odors,
                improving the overall quality of the water.
              </Text>
              <Text style={styles.aboutUsText}>
                4. *Reverse Osmosis Membrane*: The heart of our purification
                system, this membrane eliminates bacteria, viruses, and
                inorganic minerals while preserving essential oxygen levels. The
                final product water typically has a TDS level of less than 10
                ppm, ensuring exceptional purity.
              </Text>
              <Text style={styles.aboutUsText}>
                5. *Post-Carbon Filter*: This filter enhances the taste of the
                water, ensuring it is not only pure but also delicious.
              </Text>
              <Text style={styles.aboutUsText}>
                6. *Ultraviolet Lamp*: We use this lamp to guarantee the absence
                of harmful microorganisms, making the water safe to consume.
              </Text>
              <Text style={styles.aboutUsText}>
                7. *Ozone Generator*: This device prolongs the shelf life of the
                water by preventing bacterial growth in the product tank.
              </Text>
              <Text style={styles.aboutUsText}>
                Your satisfaction is our top priority, and we are committed to
                delivering the best water quality to your doorstep. For
                inquiries, orders, or assistance, feel free to contact us at
                09610908183. We look forward to serving you with premium
                purified water, making us your go-to choice for all your water
                needs. Thank you for choosing Krich Water Refilling Station!
              </Text>
              <Text style={styles.aboutUsText}></Text>

              {/* Add more about us content as needed */}
            </ScrollView>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 15,
    paddingRight: "60%",
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
  signupButton: {
    backgroundColor: "#4A78D3",
  },
  aboutButton: {
    backgroundColor: "#4A78D3",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    maxHeight: "80%", // Adjust as needed
    width: "90%", // Adjust as needed
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  aboutUsText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 20,
    textAlign: "center",
  },
  aboutLink: {
    color: '#4A78D3',
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
