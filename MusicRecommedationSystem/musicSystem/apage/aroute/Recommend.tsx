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
import styles from '../css/Recommend.scss';
import ImageBtn from '../component/ImageBtn';
import FuncBar from '../component/FuncBar';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {useFocusEffect} from '@react-navigation/native';
import PlayButton from '../component/Playbtn/PlayButton';
import {fetchData} from '../api/usefulFunction'
const Recommend = ({navigation, route}: any) => {
  const {song, testData} = route.params;
  const [selectedImage, setSelectedImage] = useState({
    uri: song.thumbnails.url,
  });
  // const [isPlayerInitialize, setIsPlayerInitialize] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  // fetch api - user's recommendation list(id, songName, singer, imageCover, music Source)

  useEffect(() => {
    const initializePlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: '1',
        url: require('../../music/abc.mp3'),
      });
      await  TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause],
      });
    
      TrackPlayer.play();
    };

    const unsubscribe = navigation.addListener('focus', initializePlayer);

    return unsubscribe;
  }, [navigation]);

  const songPlay = async (item: any) => {
  
    setSelectedImage(item.image);
    //TrackPlayer.reset();
    resetTrack(require('../../music/abc.mp3'))
    playTrack();
    setIsAudioPlaying(!isAudioPlaying);
  
  };

  const sendCallback =()=>{
    setIsAudioPlaying(false);
  }

  const addSongFav = (item: any) => {
    // add items call api
    Alert.alert('Added in your favourite list');
  };
  useFocusEffect(
    React.useCallback(() => {

      //TrackPlayer.play();

      return () => {
        resetFirstTime();
      };
    }, []),
  );

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      TrackPlayer.play();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation]);

  const resetFirstTime = () => {
    TrackPlayer.reset();
    TrackPlayer.add({
          id: '1',
          url: require('../../music/abc.mp3'),
          title: 'Track Title',
          artist: 'Track Artist',
        });
  }

  const resetTrack = (url) =>{
    TrackPlayer.reset();
    TrackPlayer.add({
          id: '1',
          url: url,
          title: 'Track Title',
          artist: 'Track Artist',
        });
  }
  const pauseTrack = () => {
    TrackPlayer.pause();
  };

  const playTrack = () => {
    TrackPlayer.play();
  };

  const optionalList = (item: any) => {
    Alert.alert(
      'Options',
      'Please choose an option',
      [
        {
          text: 'Add to Favourites',
          onPress: () => {
            addSongFav(item);
          },
        },
        {
          text: 'Remove from List',
          onPress: () => {
            // fetch remove api, pass id of list
            Alert.alert('Removed from List');
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const testRend = ({item}: any) => {
    return (
      <View style={styles.listView}>
        <View style={styles.songIconView}>
          {
            <TouchableOpacity onPress={() => songPlay(item)}>
              <ImageBackground source={item.image} style={styles.songIcon} />
            </TouchableOpacity>
          }
        </View>
        <View style={styles.singerView}>
          <Text style={styles.songName}>{item.name}</Text>
          <Text style={styles.singer}>{item.singer}</Text>
        </View>
        <View style={styles.optionView}>
          <ImageBtn
            style={styles.option}
            source={require('../../image/option.png')}
            onPress={() => optionalList(item)}
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
              source={selectedImage}
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
          <PlayButton
            style={{top: 6}}
            onPause={pauseTrack}
            onPlay={playTrack}
            audioIsPlaying={isAudioPlaying}
            sendCallback={sendCallback}
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
      <FuncBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default Recommend;
