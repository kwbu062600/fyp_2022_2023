import React, {useEffect,useState} from 'react';
import {View,Text, StyleSheet, Alert, ScrollView} from 'react-native';
import Region from '../component/Region';
import { auth, firestore } from '../../service/firebase';
import {doc,getDocs, collection,getDoc} from 'firebase/firestore';
import jwtDecode from 'jwt-decode'; 
import FuncBar from '../component/FuncBar';
const MusicLibrary = ({navigation, route}:any) =>{
    const {id} = route.params;
    const [myFavor, SetMyFavor] = useState(undefined);
    // Alert.alert(id)
    useEffect(() => {
        const getUserData = async () => {
            try{
            //   Alert.alert(id)
              const decodedToken = jwtDecode(id);
      
              const userId = decodedToken["user_id"];
              // Alert.alert(JSON.stringify(userId))
              const userRef = doc(firestore, "users", userId);
        
              const userSnap = await getDoc(userRef);
      
              const data = userSnap.data();
            //   Alert.alert(JSON.stringify(data.myFavorSong))
              const myFavorSong = data.myFavorSong.map((item:any, index:any) => {
                return {
                    ...item,
                    id: index+1,
                }
              })
              SetMyFavor(myFavorSong)
                // Alert.alert(JSON.stringify(myFavorSong))
            } catch (error) {
              console.error(error)
            }
          };
      
          getUserData();
    },[])
    const favorLista = [];
    
    if(myFavor){
        // Alert.alert(JSON.stringify(myFavor[3]))
        let fixLen = 5;
        if (myFavor.length < fixLen){
            fixLen = myFavor.length
        }
        if (myFavor.length>0) {
            for (let i = 0; i < fixLen; i++) {
                favorLista.push(
                <Region
                    key={i}
                    name={myFavor[i]["Song name"]}
                    thumbnails={myFavor[i]["thumbnails"]}
                    onPress={() => navigation.navigate('Recommendation', {testData:myFavor, id:id, index:myFavor[i],method:"favor"})}
                />,
                );
            }
            }
    }

    return (
        <View style={styles.container}>
            {myFavor&&(
            <View style={styles.contentFavorView}>
                <Text style={styles.rdText}>Favor List</Text>
                <ScrollView>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {favorLista}
                    </ScrollView>
                </ScrollView>
            </View>
        )
        }
        <FuncBar navigation={navigation} id={id} />
        </View>
        
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    rdText:{
        fontSize:27,
        color:"white",
        fontWeight:"bold"
    },
    contentFavorView:{
        padding: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop:15,
        height: 220,
    }
})

export default MusicLibrary;