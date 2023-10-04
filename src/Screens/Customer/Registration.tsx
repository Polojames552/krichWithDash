import React, {useState} from 'react';
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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Image} from 'react-native';

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
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

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
    number
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

    if (password && text !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const insertRecord = async () => {
    if (
      firstname.length == 0 ||
      lastname.length == 0 ||
      email.length == 0 ||
      address.length == 0 ||
      number.length == 0 ||
      username.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      Alert.alert('Attention', 'Please Fill the required fields');
    } else {
      // alert("successful");
      // const baseUrl = "http://krichwater.infinityfreeapp.com/";
      // const InsertAPIURL = baseUrl+"query/RegisterUser.php";
      const InsertAPIURL =
        'https://underdressed-legisl.000webhostapp.com/Authentication/Register.php';
      const header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      let base_url =
        'https://underdressed-legisl.000webhostapp.com/ImageUploader/RegisterUploadImage.php';
      const formdata = new FormData();
      formdata.append('submit', 'ok');
      formdata.append('file', {
        uri: selectedImage,
        type: 'image/jpeg', // You may need to set the correct image type here
        name: 'user_image.jpg', // You can customize the file name
      });
      let res = await fetch(base_url, {
        method: 'post',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any other headers as needed
        },
      });
      if (!res.ok) {
        throw new Error('Server returned an error');
      }
      let responseJson = await res.json();
      console.log(responseJson, 'responseJson');
      const newFilename = responseJson.file_name;
      // console.log('New Filename:', newFilename);
      const Data = {
        Fname: firstname,
        Lname: lastname,
        Email: email,
        Address: address,
        Number: number,
        Username: username,
        Password: password,
        Picture: newFilename,
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
          Alert.alert('Attention', response[0].Message);
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
    }
  };

  return (
    <ImageBackground
      source={require('../../Assets/Images/bg_main.png')}
      style={styles.backgroundImage}>
      <View style={{padding: '20%'}}></View>
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
            placeholder="Contact Number"
            onChangeText={text => setNumber(text)}
            value={number}
          />
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
            onChangeText={handleConfirmPasswordChange}
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
            onPress={insertRecord}
            disabled={isButtonDisabled}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already Have an Account?</Text>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#4A78D3'}]}
              onPress={handleLogin}>
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
