import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  Alert
} from 'react-native';

import styles from '../css/Home.scss';
import FuncBar from '../component/FuncBar';
import ImageBtn from '../component/ImageBtn';
import Region from '../component/Region';
import {server_host,API_user,API_user_song, music_host, local_host } from '../api/api';
import {fetchData} from '../api/usefulFunction';
import { auth, firestore } from '../../service/firebase';
import {doc,getDocs, collection,getDoc} from 'firebase/firestore';
import jwtDecode from 'jwt-decode'; 
const HomePage = ({navigation, route}: any) => {
  const {id} = route.params;
  //const name = 'Brian';
  const [name, setName] = useState('Brian');
  const data = require('../../music/NCS.json');
  // temp data
  const [recommendSong, setRecommendSong] = useState(undefined);
  const regionData = data.slice(0, 5);
  const [pastListenSong, setPastListenSong] = useState(undefined);
  const [contentbaseSong, setContentbaseSong] = useState(undefined);
  const testData = [
    {
      id: 1,
      SongName: 'abc',
      singer: 'Your face',
      image: {uri: data[0].thumbnails.url},
    },
    {
      id: 2,
      SongName: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 3,
      SongName: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 4,
      SongName: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 5,
      SongName: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 6,
      SongName: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 7,
      SongName: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
  ];

  const sendData = {
    emotion: "Happy"
  }

  // useEffect(() => {
    
  // }, []);

  // http://127.0.0.1:5000/recommend
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
            setPastListenSong(data.pastListenSongs);
            // Alert.alert(JSON.stringify({pastListenSongs:data.pastListenSongs}))
            if(data.pastListenSongs){

              fetch("http://192.168.0.102:5000/contentbase",{
              method: "POST",
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                pastListenSongs: data.pastListenSongs
              }),
            }).then(response => response.json())
                .then(json => {
                  //  Alert.alert(JSON.stringify(json))
                  setContentbaseSong(json)
                }).catch(error => {
                  console.error(error);
                });
            }
            setName(data.name);
          }
  
        } catch (error) {
          console.error(error)
        }
      };
  
      getUserData();

      fetch("http://192.168.0.102:5000/recommend",{
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emotion: 'Happy'
      }),
    }).then(response => response.json())
        .then(json => {
          setRecommendSong(json)
          // Alert.alert(JSON.stringify(json))
        }).catch(error => {
          console.error(error);
        });
    
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const regionComponents = [];
  if (recommendSong){
    if (recommendSong.length>0) {
      for (let i = 0; i < 5; i++) {
        regionComponents.push(
          <Region
            key={i}
            name={recommendSong[i]["Song name"]}
            thumbnails={recommendSong[i]["thumbnails"]}
            onPress={() => navigation.navigate('Recommendation', {song: data[i], testData:recommendSong, index:recommendSong[i], id:id})}
          />,
        );
      }
    }
  }else{
    for (let i = 0; i < 5; i++) {
      regionComponents.push(
        <Region
          key={i}
          name={data[i]["songName"]}
          thumbnails={data[i]["thumbnails"]["url"]}
          onPress={() => navigation.navigate('Recommendation', {song: data[i], testData:testData, id:id})}
        />,
      );
    }
  }

  const contentbaseList = [];
  if (contentbaseSong){
    const tempData = Object.values(contentbaseSong)
   
    if (contentbaseSong.length>0) {
      for (let i = 0; i < 5; i++) {
        contentbaseList.push(
          <Region
            key={i}
            name={contentbaseSong[i]["Song name"]}
            thumbnails={contentbaseSong[i]["thumbnails"]}
            onPress={() => navigation.navigate('Recommendation', {song: data[i], testData:contentbaseSong, id:id, index:contentbaseSong[i]})}
          />,
        );
      }
    }
  }else{
    contentbaseList.push(<></>)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingView}>
        {testData && (
          <>
            <Text style={styles.text}>Hi, {name}</Text>

            <ImageBtn
              style={styles.imageBtn}
              source={require('../../image/search.png')}
              onPress={() => navigation.navigate('Facial Detection')}
            />
          </>
        )}
      </View>
      {recommendSong && recommendSong.length > 0 ? (
        <View style={styles.bannerView}>
          <Image
            style={styles.bannerImage}
            source={{ uri: recommendSong[0]["thumbnails"] }}
          />
        </View>
      ) : (
        <View style={styles.bannerView}>
          <Image
            style={styles.bannerImage}
            source={ testData[0]["image"]}
          />
        </View>
      )}
      {recommendSong && recommendSong.length > 0 ? (
       
          <View style={styles.recommendView}>
            <Text style={styles.rdText}>Recommend</Text>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {regionComponents}
              </ScrollView>
            </View>
      ): (
        <View style={styles.recommendView}>
          <Text style={styles.rdText}>Recommend</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {regionComponents}
          </ScrollView>
        </View>
      )
      }
       {contentbaseList&&(
          <View style={styles.contentRecommendView}>
            <Text style={styles.rdText}>Similar Song</Text>
              <ScrollView>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {contentbaseList}
                </ScrollView>
              </ScrollView>
          </View>
        )
        }

      <FuncBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomePage;
