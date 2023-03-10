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

const Recommend = ({navigation, route}: any) => {
  const {song} = route.params;
  const [selectedImage, setSelectedImage] = useState({
    uri: song.thumbnails.url,
  });
  // const [sound, setSound] = useState<Sound | null>(null);
  // //Sound.setCategory('Playback');
  // useEffect(() => {
  //   const sound = new Sound(mp33, Sound.MAIN_BUNDLE, (error: any) => {
  //     if (error) {
  //       Alert.alert('Failed to load sound', error);
  //       return;
  //     }
  //     setSound(sound);
  //   });
  //   return () => {
  //     // cleanup function
  //     if (sound) {
  //       sound.release();
  //     }
  //   };
  // }, []);

  // fetch api - user's recommendation list(id, songName, singer, imageCover, music Source)
  const testData = [
    {
      id: 1,
      name: 'Your face Your name',
      singer: 'Your face',
      image: {uri: song.thumbnails.url},
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

  TrackPlayer.updateOptions({
    capabilities: [Capability.Play, Capability.Pause],
  });
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();

      // Add a track to the queue
      await TrackPlayer.add({
        id: '1',
        url: require('../../music/abc.mp3'),
        title: 'Track Title',
        artist: 'Track Artist',
      });
    } catch (error) {}
  };

  const songPlay = async (item: any) => {
    setSelectedImage(item.image);
    //TrackPlayer.reset();
    TrackPlayer.play();
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // 
      Alert.alert('leave');
      //await TrackPlayer.destroy();
    });

    return unsubscribe;
  }, [navigation]);

  const addSongFav = (item: any) => {
    Alert.alert('Added in your favourite list');
    setSelectedImage(item.image);
  };
  useFocusEffect(
    React.useCallback(() => {
      // Start playing the track when the screen is focused
      //TrackPlayer.play();

      return () => {
        // Stop the player and destroy the track when leaving the screen
        TrackPlayer.reset();
        TrackPlayer.add({
          id: '1',
          url: require('../../music/abc.mp3'),
          title: 'Track Title',
          artist: 'Track Artist',
        });
        //Alert.alert('AAAA');
      };
    }, []),
  );
  const controlSong = () => {
    try {
      TrackPlayer.pause();
    } catch (error) {}
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
      <FuncBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default Recommend;
