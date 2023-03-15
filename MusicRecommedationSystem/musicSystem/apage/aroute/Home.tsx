import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';

import styles from '../css/Home.scss';
import FuncBar from '../component/FuncBar';
import ImageBtn from '../component/ImageBtn';
import Region from '../component/Region';
import {API_user} from '../api/api';
import {fetchData} from '../api/usefulFunction';

interface Song {
  songName: string;
}
const HomePage = ({navigation}: any) => {
  //const name = 'Brian';
  const [name, setName] = useState('');
  const data = require('../../music/NCS.json');
  // temp data
  const [tempData, setTempData] = useState([]);
  const regionData = data.slice(0, 5);

  const testData = [
    {
      id: 1,
      name: 'abc',
      singer: 'Your face',
      image: {uri: data[0].thumbnails.url},
    },
    {
      id: 2,
      name: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 3,
      name: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 4,
      name: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 5,
      name: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 6,
      name: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
    {
      id: 7,
      name: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
    },
  ];



  // fetch api
  useEffect(() => {
    fetchData(API_user).then(data => {
      setTempData(data);
      //setName(data[0]['name'])
    });
  }, []);

  const regionComponents = [];
  if (tempData.length > 0 && data) {
    for (let i = 0; i < 5; i++) {
      regionComponents.push(
        <Region
          key={i}
          name={data[i].songName}
          onPress={() => navigation.navigate('Recommendation', {song: data[i], testData:testData})}
        />,
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingView}>
        {tempData.length > 0 && (
          <>
            <Text style={styles.text}>Hi, {tempData[0].name}</Text>

            <ImageBtn
              style={styles.imageBtn}
              source={require('../../image/search.png')}
              onPress={() => navigation.navigate('Facial Detection')}
            />
          </>
        )}
      </View>
      <View style={styles.bannerView}>
        <Image
          style={styles.bannerImage}
          source={{uri: data[0].thumbnails.url}}
        />
      </View>

      <View style={styles.recommendView}>
        <Text style={styles.rdText}>Recommend</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {regionComponents}
        </ScrollView>
      </View>

      <FuncBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomePage;
