import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageBackground,
  ScrollView,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Image} from 'react-native';
import UploadImage from './UploadImage';
import auth from '@react-native-firebase/auth';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const RegistrationScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nFile, setNFile] = useState('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(true);
  const [contactError, setContactError] = useState('');
  const [contactTouched, setContactTouched] = useState(false);

  const [cardView, setCardView] = useState(true);
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [fNumber, setFNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeButton, setCodeButton] = useState(true);
  const [i, seti] = useState(3);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  const openGallery = async () => {
    try {
      const images = await launchImageLibrary(options);
      if (images && images.assets) {
        if (images.assets.length === 0) {
          console.log('No image selected.');
        } else {
          setSelectedImage(images.assets[0].uri); // Update the selected image state
        }
      } else {
        console.log('Image selection canceled by the user.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const isButtonDisabled = !(
    username &&
    password &&
    confirmPassword &&
    firstname &&
    lastname &&
    email &&
    address &&
    selectedImage &&
    confirmPasswordTouched &&
    contactTouched
  );
  const handleImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        console.log(image.path);
        console.log(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (confirmPassword && text !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (password !== text) {
      setPasswordError('Passwords do not match');
      setConfirmPasswordTouched(false);
    } else {
      setPasswordError('');
      setConfirmPasswordTouched(true);
    }
    if (text.length == 0) {
      setPasswordError('');
    }
  };

  const handleContactVerification = text => {
    setNumber(text);
    if (text.startsWith('09') && text.length == 11) {
      setContactError('');
      setContactTouched(true);
    } else {
      setContactError('Invalid Contact Number format');
      setContactTouched(false);
    }
    if (text.length == 0) {
      setContactError('');
    }
  };
  // const uploadMyImage = async () => {};
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    // try {
    //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //   setConfirm(confirmation);
    //   setConfirm('123456');
    // } catch (error) {
    //   let errorMessage =
    //     'An error occurred during phone number sign-in. Please try again later.';
    //   if (error.code === 'SOME_SPECIFIC_ERROR_CODE') {
    //     errorMessage =
    //       'A specific error occurred. Please check your phone number and try again.';
    //   }
    //   console.error('signInWithPhoneNumber Error:', error);
    //   throw new Error(errorMessage);
    // }
  }
  const verifyNumber = () => {
    const n1 = number.substring(1);
    const n2 = '+63 ' + n1;
    const n3 = n2.slice(0, 7) + '-' + n2.slice(7);
    const n4 = n3.slice(0, 11) + '-' + n3.slice(11);
    setFNumber(n4);
    // Alert.alert('Phone:', n4);
    signInWithPhoneNumber(n4);
    setCardView(false);
  };
  const textCode = text => {
    setCode(text);
    if (text.length === 6) {
      setCodeButton(false);
    } else {
      setCodeButton(true);
    }
  };
  async function verifyCode() {
    if (i > 0) {
      console.log('Confirm: ', confirm, ' Code: ', code);
      try {
        // Wait for the confirmation to complete
        await confirm.confirm(code);
        // If the confirmation is successful, proceed
        setCodeButton(true);
        insertRecord();
        setLoading(true);

        setTimeout(() => {
          navigation.navigate('Login');
          setLoading(false);
        }, 2000);
      } catch (error) {
        // If an error occurs (e.g., invalid code), handle it here
        // console.error('Error confirming OTP', error);
        // Alert.alert(
        //   'Attention!',
        //   'Invalid Code! You have (' +
        //     i +
        //     ') attempts left to enter the valid OTP code',
        // );
        Alert.alert('Attention!', 'Invalid Code!');
        const r = i - 1;
        setCode('');
        seti(r);
      }
    } else {
      seti(0);
      Alert.alert('Attention!', 'Registration unsuccessful!');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Login');
      }, 2000);
    }
  }

  const insertRecord = async () => {
    // if (
    //   firstname.length == 0 ||
    //   lastname.length == 0 ||
    //   email.length == 0 ||
    //   address.length == 0 ||
    //   number.length == 0 ||
    //   username.length == 0 ||
    //   password.length == 0 ||
    //   confirmPassword.length == 0
    // ) {
    //   Alert.alert('Attention', 'Please Fill the required fields');
    // } else {
    // alert("successful");
    // const baseUrl = "http://krichwater.infinityfreeapp.com/";
    // const InsertAPIURL = baseUrl+"query/RegisterUser.php";

    const InsertAPIURL =
      'https://krichwater2023.000webhostapp.com/Authentication/Register.php';
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let base_url =
      'https://krichwater2023.000webhostapp.com/Authentication/RegisterUploadImage.php';
    const formdata = new FormData();
    formdata.append('submit', 'ok');
    formdata.append('file', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'user_image.jpg',
    });

    let res = await fetch(base_url, {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!res.ok) {
      console.error('Server returned an error:', res.status, res.statusText);
      const responseText = await res.text();
      console.error('Response:', responseText);
      throw new Error('Server returned an error');
    }

    let responseJson = await res.json();
    console.log('Response', responseJson.success);
    const newFilename = responseJson.file_name;
    console.log('New Filename:', newFilename);

    const Data = {
      Fname: firstname,
      Lname: lastname,
      Email: email,
      Address: address,
      Number: number,
      Username: username,
      Password: password,
      Picture: newFilename,
      // Picture: newFilename,
    };
    console.log(Data);

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

    setFirstname('');
    setLastname('');
    setEmail('');
    setAddress('');
    setNumber('');
    setSelectedImage('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    // }
  };

  return (
    <ImageBackground
      source={require('../../Assets/Images/bg_main.png')}
      style={styles.backgroundImage}>
      <View style={{padding: '20%'}}></View>
      {cardView == false ? (
        <View style={[styles.container, {marginTop: -100}]}>
          <View style={styles.loginContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                paddingBottom: 10,
                alignSelf: 'flex-start',
              }}>
              Attempts: <Text style={{fontSize: 15}}>{i}</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="OTP code"
              onChangeText={text => textCode(text)}
              value={code}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: codeButton ? '#ccc' : '#4A78D3'},
              ]}
              onPress={verifyCode}
              disabled={codeButton}>
              {/* <Text style={styles.buttonText}>Confirm</Text> */}
              {loading ? (
                <ActivityIndicator style={{marginTop: 2}} />
              ) : (
                <Text style={styles.buttonText}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.loginContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create an Account</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={text => setFirstname(text)}
              value={firstname}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={text => setLastname(text)}
              value={lastname}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Complete Address"
              onChangeText={text => setAddress(text)}
              value={address}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number (09.....)"
              onChangeText={text => handleContactVerification(text)}
              value={number}
              keyboardType="numeric"
            />
            {contactError ? (
              <Text style={styles.errorText}>{contactError}</Text>
            ) : null}
            <View style={styles.uploadContainer}>
              <Text style={styles.uploadText}>Upload Any Valid ID</Text>
              {/* <TouchableOpacity
              style={styles.uploadIcon}
              onPress={handleImageUpload}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 50, height: 50}}
                />
              ) : (
                <FontAwesome5 name="image" size={40} color={'black'} />
              )}
            </TouchableOpacity> */}
              <TouchableOpacity style={styles.uploadIcon} onPress={openGallery}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{width: 50, height: 50}}
                  />
                ) : (
                  <FontAwesome5 name="image" size={40} color={'black'} />
                )}
              </TouchableOpacity>
            </View>
            {/* <Button title="Submit" onPress={openGallery}></Button> */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Login Details</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handlePasswordChange}
              value={password}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={text => handleConfirmPasswordChange(text)}
              value={confirmPassword}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: isButtonDisabled ? '#ccc' : '#4A78D3'},
              ]}
              // onPress={insertRecord}
              onPress={verifyNumber}
              disabled={isButtonDisabled}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={[styles.button, {backgroundColor: '#4A78D3'}]}
            onPress={uploadMyImage}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity> */}

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already Have an Account?</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#4A78D3'}]}
              onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
    paddingBottom: 15,
    paddingRight: '10%',
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
  uploadContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    paddingRight: '50%',
    paddingBottom: '10%',
  },
  uploadText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default RegistrationScreen;
