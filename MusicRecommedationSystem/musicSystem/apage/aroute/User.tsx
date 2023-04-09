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
import styles from '../css/User.scss';
import { auth, firestore } from '../../service/firebase';
import {doc,getDocs, collection,getDoc} from 'firebase/firestore';
import jwtDecode from 'jwt-decode'; 
const User = ({navigation, route}:any) => {
    const createDate = "03-10-2022";
    const {id} = route.params;
    const [username, setUserName] = useState("");

    const listItem = [
        {
            id:1,
            name: "User Setting",
            option: ()=> navigation.navigate("User Setting"),
        },
        {
            id:2,
            name: "Report To Us",
            option: () => Alert.alert("empty"),
        },
        {
            id:3,
            name: "About Us",
            option: () => Alert.alert("empty"),
        }
    ]

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
    
            const getUserData = async () => {
                try{
                // Alert.alert(id)
                const decodedToken = jwtDecode(id);
        
                const userId = decodedToken["user_id"];
                // Alert.alert(JSON.stringify(userId))
                const userRef = doc(firestore, "users", userId);
            
                const userSnap = await getDoc(userRef);
        
                const data = userSnap.data();
                if(data){
                    setUserName(data.name)
                }
               
                } catch (err) {
                    console.error(err);
                }
            }
            getUserData();
        });

        
        return unsubscribe;

    }, [navigation]);
    const testRend = ({item}:any) => {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.listText}>{item.name}</Text>
                {/* <Text style={{color:"white"}}>dark</Text> */}
                <View style={styles.arrowContainer}>
                    <ImageBtn style={styles.arrow} source={require('../../image/arr.png')} onPress={item.option}/>
                </View>
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
                    <Text style={styles.nameText}>{username}</Text>
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
            <View style={styles.logoutContainer}>  
                <CusButton text="Logout" onPress={()=> navigation.navigate("Login")} />
            </View>
            <FuncBar navigation={navigation} />
        </SafeAreaView>
    )
}


export default User;