import React, {useState, useEffect} from 'react';
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
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://underdressed-legisl.000webhostapp.com/auth.php';
const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('false');
  useEffect(() => {
    // Check if the user is already authenticated
    checkAuthentication();
    checkLogin();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userDataString = await AsyncStorage.getItem('user');
  
      if (token) {
        const userData = JSON.parse(userDataString); // Parse user object
        const role = userData.Role;
  
        if (role === 'Admin') {
          navigation.replace('AdminOptions', {userData});
        } else if (role === 'User') {
          navigation.replace('Options', {userData});
        } else {
          // Handle other roles if needed
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };
  
  const checkLogin = async () => {
    const isLoggedIn = await AsyncStorage.getItem('login');
    if (isLoggedIn === 'true') {
      setIsLoggedIn('true');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', data.message);
        const {token, user} = data;
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('login', 'true');
  
        const userData = JSON.parse(JSON.stringify(user)); // Parse user object
  
        // Extract Role
        const role = userData.Role;
  
        if (role === 'Admin') {
          navigation.replace('AdminOptions', {userData});
        } else if (role === 'User') {
          navigation.replace('Options', {userData});
        } else {
          // Handle other roles if needed
        }
  
      } else {
        Alert.alert('Error', data.message);
        setPassword('');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred');
    }
  };
  const handleSignup = () => {
    navigation.navigate('SignUp');
  };
  return (
    <ImageBackground
      source={require('../../Assets/Images/bg_main.png')}
      style={styles.backgroundImage}>
      {isLoggedIn === 'false' ? (
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Login</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={text => {
                setUsername(text);
                setUsernameError(''); // Clear username error on typing
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
              onChangeText={text => {
                setPassword(text);
                setPasswordError(''); // Clear password error on typing
              }}
              value={password}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#4A78D3'}]}
              onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.signupText}>Don't have an account yet?</Text>
            <TouchableOpacity
              style={[styles.button, styles.signupButton]} // This line is updated
              onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or "stretch" or whatever suits your design
    justifyContent: 'center',
  },
  titleContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
    paddingBottom: 15,
    paddingRight: '60%',
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '5%',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  signupButton: {
    backgroundColor: '#4A78D3',
  },
});

export default LoginScreen;
