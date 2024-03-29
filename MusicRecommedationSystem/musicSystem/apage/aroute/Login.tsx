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
import {server_host, API_user} from '../api/api'
import { fetchData } from '../api/usefulFunction';
const LoginPage = ({navigation, route}: any) => {
  const [username, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const [id, setID] = useState('');
  const ac = "Admin";
  const pw = 123456;
  const loginData = {
    username: username,
    password: password
  }

  const onLogin = async() => {
    await fetchData(`${server_host}${API_user}`,'POST', undefined, loginData )
    .then((response) => response.json())
    .then((data) => {setID(data)})
    if(id) {
      navigation.navigate('Facial Detection',{id:id})
    }
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
    if (username == ac && password == pw) {
      navigation.navigate('Facial Detection', {id:"1"});
    }
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
          placeholder="Username"
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
          <CusButton text="Login" onPress={onLogin} />
          <CusButton text="Register" onPress={onLogin} />
        </View>
        <View style={{marginTop: 10}}>
          <CusButton text="Guest" onPress={onGuest} />
        </View>
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
