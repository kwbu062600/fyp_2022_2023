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
  StyleSheet,
  
} from 'react-native';

import ImageBtn from '../component/ImageBtn';
import FuncBar from '../component/FuncBar';
import TrackPlayer, {Capability,Event,useTrackPlayerEvents} from 'react-native-track-player';
import {useFocusEffect} from '@react-navigation/native';
import PlayButton from '../component/Playbtn/PlayButton';
import { music_host } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Recommend = ({navigation, route}: any) => {
  const {song, testData, index} = route.params;
  const [selectedImage, setSelectedImage] = useState({
    uri: index.thumbnails,
  });
  // const [isPlayerInitialize, setIsPlayerInitialize] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isInitial, setIsInitial] = useState(false);
  const [trackName, setTrackName] = useState(index["Song name"].split('-')[1]?.trim().replace('[NCS Release]',''));
  const tracks = testData.map(track => ({
    id:track.id,
    url: music_host + "/" + track["Song name"]+ ".mp3".replaceAll(" ","%20"),
    title: track["Song name"],
    artist: track.Singer,
    artwork: track.thumbnails
  }));

  // Alert.alert(isInitial.toString());
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@trackplayer')
      if(value !== null) {
        setIsInitial(true);
      }
      else{
        setIsInitial(false);
      }
    } catch(e) {
      // error reading value
    }
  }
  getData()
  useEffect(() => {
    const initializePlayer = async () => {
      try {
        if(!isInitial){
          // Alert.alert("initilize")
          await TrackPlayer.setupPlayer();
          await TrackPlayer.add(tracks);
          await TrackPlayer.updateOptions({
            capabilities: [Capability.Play, Capability.Pause, Capability.Skip, Capability.SkipToNext],
          });
          setIsInitial(true);
          
        }
      } catch (error) {
        console.log('Failed to initialize or play track', error);
        // handle error, e.g. show an error message
        setIsInitial(true);
      }
      TrackPlayer.skip(index.id-1);
          TrackPlayer.play();
    };
    
    const unsubscribe = navigation.addListener('focus', initializePlayer);
  
    return unsubscribe;
  }, [navigation]);
  
  // Alert.alert(`Current position: ${position}, duration: ${duration}`);
  const songPlay = async (item: any) => {
    const filteredName = item["Song name"].split('-')[1]?.trim().replace('[NCS Release]','');
    setSelectedImage({uri:item["thumbnails"]});
    TrackPlayer.skip(item.id-1);
    setTrackName(filteredName);
    playTrack();
    setIsAudioPlaying(!isAudioPlaying);
  
  };
  
  useEffect(() => {
    if (isInitial) {
      // Alert.alert("come in")
      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@trackplayer', value)
        } catch (e) {
          // saving error
        }
      }
      storeData(isInitial.toString())
    } 
  }, [isInitial]);

  const sendCallback =()=>{
    setIsAudioPlaying(false);
  }

  const addSongFav = async(item: any) => {
    // add items call api
    Alert.alert('Added in your favourite list');
    // await TrackPlayer.skipToNext(3)
    
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
    TrackPlayer.add(tracks);
  }

  const resetTrack = () =>{
    TrackPlayer.reset();
    TrackPlayer.add(tracks);
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
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const testRend = ({item}: any) => {
    const filteredName = item["Song name"].split('-')[1]?.trim().replace('[NCS Release]','');
    // const filteredName = item["SongName"].split('-')[1]?.trim().replace('[NCS Release]','');
    return (
      <View style={styles.listView}>
        <View style={styles.songIconView}>
          {
            <TouchableOpacity onPress={() => songPlay(item)}>
              <ImageBackground source={{uri:item["thumbnails"]}} style={styles.songIcon} />
            </TouchableOpacity>
          }
        </View>
        <View style={styles.singerView}>
          <Text style={styles.songName} ellipsizeMode="tail" numberOfLines={2}>{filteredName.substring(0,20)}</Text>
          <Text style={styles.singer}  ellipsizeMode="tail" numberOfLines={2}>{item["Singer"].substring(0,20)}</Text>
        </View>
        <View style={styles.optionView}>
          <ImageBtn
            source={require('../../image/option.png')}
            onPress={() => optionalList(item)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nowPlayingHeadingContainer}>
        <Text style={styles.nowPlayingText}>Now Playing: {trackName}</Text>
      </View>
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
            style={{margin:6}}
            source={require('../../image/add.png')}
            onPress={addSongFav}
          />
          <PlayButton
            style={{margin: 6,left:12}}
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
            keyExtractor={item => item["id"]}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <FuncBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default Recommend;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: 'black',
  },
  innercontainer:{
    backgroundColor: 'gray',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coverView:{
    height: 230,
    // backgroundColor: "blue"
  },
  imageHoder: {
    flex:1,
    backgroundColor: 'black',
  },
  cover: {
    flex:1,
    justifyContent: 'center',
  },
  btnView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: 'rgba(5, 0, 38,1)',
    borderStyle: 'solid',
    borderBottomColor: 'white',
    borderWidth: 0.5,
  },
  listContainer:{
    height: 250,
    backgroundColor: 'black',
  },
  listView: {
    flex:1,
    flexDirection: 'row',
    margin: 5,
    height: 100,
  },
  songIconView:{  
    margin: 5,
    padding: 15,
    height:100
  },
  songIcon:{
   width: 100,
   height: 50,
  },
  singerView:{
    margin: 15,
    width: '100%',
    
  },
  songName:{
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  singer:{
    fontSize: 16,
    color: 'white',
    fontWeight: '600',

  },
  optionView:{
    position: "absolute",
    right: 15,
  },
  nowPlayingText:{
    color: 'white',
    fontSize:20,
    fontWeight: '800',
    textAlign: 'center',
  },
  nowPlayingHeadingContainer:{
    // backgroundColor: 'grey',
    padding:10,
  }
})