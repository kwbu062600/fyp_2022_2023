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

const HomePage = ({navigation, route}: any) => {
  const {id} = route.params;
  //const name = 'Brian';
  const [name, setName] = useState('Brian');
  const data = require('../../music/NCS.json');
  // temp data
  const [recommendSong, setRecommendSong] = useState(undefined);
  const regionData = data.slice(0, 5);

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

  // useEffect(()=>{
  //   fetchData(`${server_host}${API_user}/${id}`)
  // },[])
  // http://127.0.0.1:5000/recommend
   useEffect(() => {
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
  }, []);

  const regionComponents = [];
  if (recommendSong){
    // Alert.alert("has")
    if (recommendSong.length>0) {
      for (let i = 0; i < 5; i++) {
        regionComponents.push(
          <Region
            key={i}
            name={recommendSong[i]["Song name"]}
            thumbnails={recommendSong[i]["thumbnails"]}
            onPress={() => navigation.navigate('Recommendation', {song: data[i], testData:recommendSong, index:recommendSong[i]})}
          />,
        );
      }
    }
  }else{
    // Alert.alert("next")
    for (let i = 0; i < 5; i++) {
      regionComponents.push(
        <Region
          key={i}
          name={data[i]["songName"]}
          thumbnails={data[i]["thumbnails"]["url"]}
          onPress={() => navigation.navigate('Recommendation', {song: data[i], testData:testData})}
        />,
      );
    }
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
      <FuncBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomePage;
