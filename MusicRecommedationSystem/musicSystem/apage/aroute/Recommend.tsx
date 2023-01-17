import React from 'react';
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
import styles from '../css/Recommend.scss';
import ImageBtn from '../component/ImageBtn';
import FuncBar from '../component/FuncBar';
const Recommend = () => {
  const testData = [
    {
      id: 1,
      name: 'Your face Your name',
      singer: 'Your face',
      image: require('../../image/home.png'),
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

  const songPlay = () => {
    Alert.alert('Play song');
  };

  const addSongFav = () => {
    Alert.alert('Added in your favourite list');
  };

  const controlSong = () => {
    Alert.alert('Playing song');
  };
  const testRend = ({item}: any) => {
    return (
      <View style={styles.listView}>
        <View style={styles.songIconView}>
          <TouchableOpacity onPress={songPlay}>
            <ImageBackground
              resizeMode="cover"
              source={item.image}
              style={styles.songIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.singerView}>
          <Text style={styles.songName}>{item.name}</Text>
          <Text style={styles.singer}>{item.singer}</Text>
        </View>
        <View style={styles.optionView}>
          <ImageBtn
            style={styles.option}
            source={require('../../image/option.png')}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innercontainer}>
        <View style={styles.coverView}>
          <View style={styles.imageHoder}>
            <ImageBackground
              style={styles.cover}
              source={require('../../image/music.png')}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.btnView}>
          <ImageBtn
            style={{top: 15}}
            source={require('../../image/add.png')}
            onPress={addSongFav}
          />
          <ImageBtn
            style={{top: 6}}
            source={require('../../image/play.png')}
            onPress={controlSong}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={testData}
            renderItem={testRend}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <FuncBar />
    </SafeAreaView>
  );
};

export default Recommend;
