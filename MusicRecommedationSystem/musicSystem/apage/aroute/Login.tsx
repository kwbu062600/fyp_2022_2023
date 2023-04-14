import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import styles from '../css/Login.scss';
import CusButton from '../component/CusButton';
import CusInput from '../component/CusInput';
import {server_host} from '../api/api'
import { fetchData } from '../api/usefulFunction';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth, firestore } from '../../service/firebase';
import {doc,getDocs, collection} from 'firebase/firestore';
const LoginPage = ({navigation, route}: any) => {
  const [username, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const [id, setID] = useState('');
  const [token, setToken] = useState('');
  const ac = "Admin";
  const pw = 123456;
  const loginData = {
    username: username,
    password: password
  }

  // const onLogin = async() => {
  //   await fetchData(`${server_host}${API_user}`,'POST', undefined, loginData )
  //   .then((response) => response.json())
  //   .then((data) => {setID(data)})
  //   if(id) {
  //     navigation.navigate('Facial Detection',{id:id})
  //   }
  // };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log("User logged in");
        userCredential.user.getIdToken().then((token) => {
          setToken(token);
          navigation.navigate('Facial Detection',{
            id:token
          })
        });
      }) 
      .catch((error) => {
        // console.error("Error logging in: ", error);
        Alert.alert("Please enter correct account information");
      });
  };

  const onFacebook = () => {
    Alert.alert('Facebook');
  };

  const onGoogle = () => {
    Alert.alert('Google');
  };

  const onApple = () => {
    Alert.alert('Apple');
  };

  const onGuest = () => {
    // next page
 
      navigation.navigate('Home', {id:"1"});
    
  };

  const onRegister = () => {
    // next page
    navigation.navigate('Register');
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconView}>
        <View style={styles.iconHolder}>
          <Image
            style={styles.icon}
            source={require('../../image/music.png')}
          />
        </View>
      </View>
      <View style={styles.inputView}>
        <CusInput
          setValue={onChangeName}
          placeholder="Email"
          value={username}
          hide={false}
        />
        <CusInput
          setValue={onChangePassword}
          placeholder="Password"
          value={password}
          hide={true}
          type="numeric"
        />
      </View>

      <View style={styles.btnView}>
        <View style={styles.btnList1}>
          <CusButton text="Login" onPress={handleLogin} />
          <CusButton text="Register" onPress={onRegister} />
        </View>
        {/* <View style={{marginTop: 10}}>
          <CusButton text="Guest" onPress={onGuest} />
        </View> */}
      </View>
      {/* <View style={styles.socialLoginView}>
        <TouchableOpacity onPress={onGoogle}>
          <View style={styles.socialList}>
            <View
              style={[
                {backgroundColor: 'rgba(255, 255, 255,1)'},
                styles.imageContainer,
              ]}>
              <View style={styles.FbOuter}>
                <Image
                  style={styles.image}
                  source={require('../../image/google.png')}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onFacebook}>
          <View style={styles.socialList}>
            <View
              style={[
                {backgroundColor: 'rgba(25, 61, 138,0.8)'},
                styles.imageContainer,
              ]}>
              <View style={styles.FbOuter}>
                <Image
                  style={styles.image}
                  source={require('../../image/facebook.png')}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onApple}>
          <View style={styles.socialList}>
            <View
              style={[
                {backgroundColor: 'rgba(255, 255, 255,1)'},
                styles.imageContainer,
              ]}>
              <View style={styles.FbOuter}>
                <Image
                  style={styles.image}
                  source={require('../../image/apple.png')}
                />
              </View> */}
            {/* </View> */}
          {/* </View> */}
        {/* </TouchableOpacity> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default LoginPage;
