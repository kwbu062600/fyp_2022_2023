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
import {firestore} from '../../service/firebase';
import {doc,getDocs, collection,getDoc} from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";
import jwtDecode from 'jwt-decode'; 
const User = ({navigation, route}:any) => {
    // const createDate = "03-10-2022";
    const [username, setUsername] = useState("");
    const {id} = route.params;
    // Alert.alert(id)
    const listItem = [
        {
            id:1,
            name: "User Setting",
            option: ()=> navigation.navigate("User Setting", {id:id,name: username}),
        },
        {
            id:2,
            name: "Report To Us",
            option: () => Alert.alert("Coming Soon"),
        },
        {
            id:3,
            name: "About Us",
             option: () => Alert.alert("Thanks for your supporting",
                "We are the student in City University of Hong Kong. This is a final year project-emotional based recommender system application called FaceSoMusic. We all are glad to develop the tasks in the system. No matter Frontend, Backend or Machine Learning. It is a good chance to cooperate with the teammates - John and Ken. Thank you. We will develop more function in the future"

             ),
        }
    ]

    const auth = getAuth();
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
                setUsername(data.name);
              }
            } catch (error) {
              console.error(error)
            }
          };
      
          getUserData();

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const testRend = ({item}:any) => {
        return (
            <View style={styles.listContainer}>
                <TouchableOpacity onPress={item.option}> 
                    <Text style={styles.listText}>{item.name}</Text>
                </TouchableOpacity>
                {/* <Text style={{color:"white"}}>dark</Text> */}
                <TouchableOpacity onPress={item.option}>
                    <View style={styles.arrowContainer}>
                        <ImageBtn style={styles.arrow} source={require('../../image/arr.png')} />
                    </View>
                </TouchableOpacity>
                
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <ImageBtn style={styles.icon} source={require('../../image/user.png')}/>
                </View>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.nameText}>{username}</Text>
                    {/* <Text style={styles.createDateText}>Create on {createDate}</Text> */}
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
                <CusButton text="Logout" onPress={()=> logout()} />
            </View>
            <FuncBar navigation={navigation} id={id}/>
        </SafeAreaView>
    )
}


export default User;