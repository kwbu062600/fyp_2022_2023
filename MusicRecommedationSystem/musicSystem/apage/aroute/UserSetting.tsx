import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CusButton from '../component/CusButton';
import FuncBar from '../component/FuncBar';
import ImageBtn from '../component/ImageBtn';
import styles from '../css/UserSetting.scss';
import Modal from 'react-native-modal';
import CusInput from '../component/CusInput';
import { getAuth, updatePassword , signOut} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from '../../service/firebase';
import jwtDecode from 'jwt-decode'; 
const UserSetting = ({navigation, route}:any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const createDate = "03-10-2022";
    const {name,id} = route.params;
    // const username = name;
    const [userName, onChangeName] = useState(name);
    //const [saveName, onSaveName] = useState("KwBuOAO");
    const [password, setPassword] = useState(0);
    const [oldPassword, setOldPassword] = useState(0);
    const [selectedModal, setSelectedModal] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const [newName, setNewName] = useState('');
    const listItem = [
        {
          id: 0,
          name: "Change Name",
          type: "name"
        },
        {
          id: 1,
          name: "Change Password",
          type: "password"
        }
      ];
    
      const toggleModal = (action: string) => {
        setIsModalVisible(!isModalVisible);
        switch (action) {
          case 'Change Name':
            setSelectedModal('Change Name');
            break;
          case 'Change Password':
            setSelectedModal('Change Password');
           
            break;
          case 'changeIcon':
            setSelectedModal('icon');
            break;
          default:
            setSelectedModal('');
            break;
        }
      };
    const logout = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            // Alert.alert("success")
            console.log("log out")
            navigation.navigate("Login")
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });
    }
    const changePW = (password:any) =>{
        if(password != 0){
            if (user !== null) {
                updatePassword(user, password.toString())
                    .then(() => {
                        // Password updated successfully
                        console.log("Password updated successfully");
                        console.log("new password is:", password.toString());
                        logout();
                    })
                    .catch((error) => {
                        // An error occurred while updating the password
                        console.error(error);
                    });
            }
        }else{
            Alert.alert("Cannot Save. Your field is empty");
        }
         
    }

    const updateName = async() => {
        const decodedToken = jwtDecode(id);

        const userId = decodedToken["user_id"];

        const userRef = doc(firestore, "users",userId );
        if(newName != ''){
            await updateDoc(userRef, {
                name: newName
            }).then(()=>{
                console.log("success updated name:", newName);
                navigation.navigate("Home", {id:id})
            })
        }else{
            Alert.alert("Cannot Save. Your field is empty");
        }
        
    }

      const testRend = ({item}: any) => {
        return (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => toggleModal(item.name)}>
              <Text style={styles.listText}>{item.name}</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{selectedModal}</Text>
                {selectedModal === 'Change Name' && (
                  <CusInput
                    setValue={(text: any) => setNewName(text)}
                    placeholder="Username"
                    value={newName}
                    hide={false}
                  />
                )}
                {selectedModal === 'Change Password' && (
                  <>
                    <CusInput
                      setValue={(text: any) => setPassword(text)}
                      placeholder="New Password"
                      value={password}
                      hide={true}
                      type="numeric"
                    />
                  </>
                )}
                <View style={styles.SaveBtn}>
                  <CusButton text="Save" onPress={() => {
                    if (selectedModal === "Change Password") {
                        changePW(password);
                    }
                    else if (selectedModal === "Change Name") {
                        updateName();
                    }
                    toggleModal('');
                   
                    }} />
                </View>
              </View>
            </Modal>
          </View>
        );
      };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <ImageBtn style={styles.icon} source={require('../../image/user.png')}/>
                </View>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.nameText}>{userName}</Text>
                    <Text style={styles.createDateText}>Create on {createDate}</Text>
                </View>
            </View>
            <View style={styles.settingContainer}>
                <FlatList
                    data={listItem}
                    renderItem={testRend}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <FuncBar navigation={navigation} />
        </SafeAreaView>
    )
}


export default UserSetting;