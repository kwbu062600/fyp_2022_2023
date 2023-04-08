import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, firestore } from '../../service/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc,setDoc, collection} from 'firebase/firestore';
const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async() => {
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
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});

export default RegisterScreen;