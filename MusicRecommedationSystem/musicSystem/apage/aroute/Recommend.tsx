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
import { auth , firestore} from '../../service/firebase';
import {doc,getDocs, collection,getDoc, updateDoc, FieldValue, arrayUnion} from 'firebase/firestore';
import jwtDecode from 'jwt-decode'; 

const Recommend = ({navigation, route}: any) => {
    const {testData, index, id, method} = route.params;
    const [selectedImage, setSelectedImage] = useState({
      uri: index.thumbnails,
    });
    // const [isPlayerInitialize, setIsPlayerInitialize] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isInitial, setIsInitial] = useState(false);
    const [trackName, setTrackName] = useState(index["Song name"].split('-')[1]?.trim().replace('[NCS Release]',''));
    // const mus = music_host + "/" + testData[4]["Song name"]+ ".mp3";
    // Alert.alert(mus.replaceAll(" ","%20").replaceAll("[","%5B").replaceAll("]","%5D").replaceAll("&","%26").replaceAll("(","%28").replaceAll(")","%29").replaceAll("||",""))
    const tracks = testData.map(track => ({
      id:track.id,
      url: music_host + "/" + track["Song name"]+ ".mp3".replaceAll(" ","%20").replaceAll("[","%5B").replaceAll("]","%5D").replaceAll("&","%26").replaceAll("(","%28").replaceAll(")","%29").replaceAll("||",""),
      title: track["Song name"],
      artist: track.Singer,
      artwork: track.thumbnails
    }));
    const [currentSong, setCurrentSong] = useState(undefined);

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
        console.error(e);
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
        try{
          TrackPlayer.skip(index.id-1);
          TrackPlayer.play();
          updateMethod(index);
          setCurrentSong(index);
        }catch(e){
          console.error(e)
        }
        // Alert.alert(JSON.stringify(tracks[index.id-1]))
      };
      
      const unsubscribe = navigation.addListener('focus', initializePlayer);
    
      return unsubscribe;
    }, [navigation]);

    const updateMethod = async (song:any) => {
      try{
        const decodedToken = jwtDecode(id);
        // Alert.alert(JSON.stringify(decodedToken["user_id"]))
        const userId = decodedToken["user_id"];
        // Alert.alert(userId)
        
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists() && userSnap.data().pastListenSongs){
          await updateDoc(userRef, {
            pastListenSongs: arrayUnion(song),
          })
        }
        else{
          await updateDoc(userRef, {
            pastListenSongs: [],
          })
          await updateDoc(userRef, {
            pastListenSongs: arrayUnion(song),
          })
        }
      } catch (error) {
        console.error(error)
      }
    };
    // Alert.alert(`Current position: ${position}, duration: ${duration}`);
    const songPlay = async (item: any) => {
      const filteredName = item["Song name"].split('-')[1]?.trim().replace('[NCS Release]','');
      setSelectedImage({uri:item["thumbnails"]});
      TrackPlayer.skip(item.id-1);
      setTrackName(filteredName);
      playTrack();
      setIsAudioPlaying(!isAudioPlaying);
      updateMethod(item)
      setCurrentSong(item);
    };
    
    useEffect(() => {
      if (isInitial) {
        // Alert.alert("come in")
        const storeData = async (value:any) => {
          try {
            await AsyncStorage.setItem('@trackplayer', value)
          } catch (e) {
            // saving error
            console.error(e)
          }
        }
        storeData(isInitial.toString())
      } 
    }, [isInitial]);

    const sendCallback =()=>{
      setIsAudioPlaying(false);
    }


    const updateFavor = async (song:any) => {
      try{
        const decodedToken = jwtDecode(id);
        // Alert.alert(JSON.stringify(decodedToken["user_id"]))
        const userId = decodedToken["user_id"];
        // Alert.alert(userId)
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists() && userSnap.data().myFavorSong){
          await updateDoc(userRef, {
            myFavorSong: arrayUnion(song),
          })
        }
        else{
          await updateDoc(userRef, {
            myFavorSong: [],
          })
          await updateDoc(userRef, {
            myFavorSong: arrayUnion(song),
          })
        }
      } catch (error) {
        console.error(error)
      }
    };
    const addSongFav = async(item: any) => {
      // add items call api
      Alert.alert('Added in your favourite list');
      updateFavor(item)
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
      
      const unsubscribe = navigation.addListener('focus', async() => {
        await TrackPlayer.add(tracks);
        TrackPlayer.play();
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    },[navigation]);

    // useEffect(() => {
      
    //   getUserData();
    // }, []);
    const resetFirstTime = () => {
      TrackPlayer.reset();
      // TrackPlayer.add(tracks);
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
          
          {method=="recommend"&&
            <View style={styles.optionView}>
              <ImageBtn
                source={require('../../image/option.png')}
                onPress={() => optionalList(item)}
              />
            </View>
          }
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
          {currentSong&&method=="recommend"&&
          <View style={{paddingLeft:27}}>
            <ImageBtn
              style={{margin:6}}
              source={require('../../image/add.png')}
              onPress={()=>addSongFav(currentSong)}
            />
            </View>
          }
          <View style={styles.playBtn}>
            <PlayButton
              style={{margin: 6}}
              onPause={pauseTrack}
              onPlay={playTrack}
              audioIsPlaying={isAudioPlaying}
              sendCallback={sendCallback}
            />
          </View>
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
      <FuncBar navigation={navigation} id={id}/>
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    // paddingLeft: 36,
    // paddingRight: 36,
    backgroundColor: 'rgba(5, 0, 38,1)',
    borderStyle: 'solid',
    borderBottomColor: 'white',
    borderWidth: 0.5,
  },
  playBtn:{
    flex:1,
    flexDirection: 'row',
    // backgroundColor: 'blue',
    width:'100%',
    justifyContent: 'flex-end',
    paddingRight:27
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
    top:3
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