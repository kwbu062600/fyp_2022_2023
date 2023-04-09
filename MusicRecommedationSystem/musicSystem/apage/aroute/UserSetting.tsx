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

const UserSetting = ({navigation}:any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const createDate = "03-10-2022";
    const username = "KwBuOAO";
    const [userName, onChangeName] = useState('KwBuOAO');
    //const [saveName, onSaveName] = useState("KwBuOAO");
    const [password, setPassword] = useState(0);
    const listItem = [
        {
            id:1,
            name: "Change Icon",
        },
        {
            id:2,
            name: "Change Name",
        },
        {
            id:3,
            name: "Change Password",
        }
    ]

    const toggleModal = (action: string) => {
        switch (action) {
            case 'Change Name':
                onChangeName(userName); 
              break;
            case 'changePassword':
              //setPassword();
              break;
            case 'changeIcon':
              Alert.alert('Change Icon');
              break;
            default:
              break;
          }

        setIsModalVisible(!isModalVisible);
      };

    const testRend = ({item}:any) => {
        return (
            <View style={styles.listContainer}>
                <TouchableOpacity onPress={()=>toggleModal(item.name)}>
                    <Text style={styles.listText}>{item.name}</Text>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{item.name}</Text>
                        <CusInput
                            setValue={(text)=>onChangeName(text)}
                            placeholder="Username"
                            value={userName}
                            hide={false}
                        />
                        <View style={styles.SaveBtn}>
                            <CusButton text="Save" onPress={()=>toggleModal(item.name)} />
                        </View>
                       
                    </View>
                </Modal>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <ImageBtn style={styles.icon} source={require('../../image/user.png')} onPress={()=>Alert.alert("empty")}/>
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