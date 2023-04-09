import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert,SafeAreaView } from 'react-native';
import { auth, firestore } from '../../service/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc,setDoc, collection} from 'firebase/firestore';
import CusButton from '../component/CusButton';
import CusInput from '../component/CusInput';
const RegisterScreen = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async() => {
    if (password == '') {
      Alert.alert("Cannot register. Please provide sufficient data.")
      // navigation.navigate("Login")
      return
    }
    await createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // Add user to Firestore
        const userCollectionRef = collection(firestore,'users')
        setDoc(doc(userCollectionRef, user.uid), {
            name: name,
            email: email,
        }).then(() => {
            console.log("User added to Firestore");
            Alert.alert(
                'Message',
                'Successful create',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate("Login"),
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              );
          })
          .catch((error) => {
            console.error("Error adding user to Firestore: ", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      });
  };

  return (
    // <></>
    <SafeAreaView style={styles.container}>
      <Text style={{color:'white', fontSize:21, fontWeight:'bold'}}>Please Enter following information</Text>
      <View style={styles.inputView}>
      <CusInput
            setValue={setEmail}
            placeholder="Email"
            value={email}
            hide={false}
          />
        <CusInput
            setValue={setName}
            placeholder="Name"
            value={name}
            hide={false}
          />
       
          <CusInput
            setValue={setPassword}
            placeholder="Password"
            value={password}
            hide={true}
            type="numeric"
          />
        </View>
      <View style={{marginTop:25}}>
        <CusButton text="Register" onPress={handleRegister} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'black'
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  inputView:{
    width:400
  }
});

export default RegisterScreen;