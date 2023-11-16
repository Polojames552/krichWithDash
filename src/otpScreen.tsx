import React, {useState, useEffect} from 'react';
import {Button, TextInput, Alert, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

const OtpScreen = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [fNumber, setFNumber] = useState('');
  const [buttonD, setButtonD] = useState(true);
  const [codeButton, setCodeButton] = useState(true);
  const [loading, setLoading] = useState(false);
  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // setConfirm(confirmation);
    setConfirm('123456');
  }

  function confirmCode() {
    setCodeButton(true);
    if (confirm === code) {
      Alert.alert('Code is correct');
      setCode('');
      setTimeout(() => {
        setConfirm(null);
        setLoading(false);
      }, 2000);
    } else {
      setCode('');
      Alert.alert('Code is wrong');
    }
  }

  const checkFormat = () => {
    // +63 936-937-9796
    const n1 = number.substring(1);
    const n2 = '+63 ' + n1;
    const n3 = n2.slice(0, 7) + '-' + n2.slice(7);
    const n4 = n3.slice(0, 11) + '-' + n3.slice(11);
    setFNumber(n4);
    signInWithPhoneNumber(n4);
    // Alert.alert('Number: ', n4);
  };
  const handleTextChange = text => {
    setNumber(text);
    // Enable the button only if the length of the entered number is 11
    if (text.length === 11) {
      setButtonD(false);
    } else {
      setButtonD(true);
    }
  };

  const textCode = text => {
    setCode(text);
    if (text.length === 6) {
      setCodeButton(false);
    } else {
      setCodeButton(true);
    }
  };
  if (!confirm) {
    return (
      <>
        <TextInput
          placeholder="09........."
          value={number}
          onChangeText={text => handleTextChange(text)}
          keyboardType="numeric"
        />
        <Button
          title="Phone Number Sign In"
          // onPress={() => signInWithPhoneNumber('+63 936-937-9796')}
          // onPress={() => signInWithPhoneNumber(fNumber)}
          onPress={() => checkFormat()}
          disabled={buttonD}
        />
      </>
    );
  }

  return (
    <>
      <TextInput
        value={code}
        onChangeText={text => textCode(text)}
        keyboardType="numeric"
      />
      {/* <ActivityIndicator style={{marginTop: 20}} /> */}
      <Button
        disabled={codeButton}
        title={'Confirm'}
        onPress={() => confirmCode()}
      />
    </>
  );
};

export default OtpScreen;
