import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity , Alert} from 'react-native';
import ImageBtn from '../ImageBtn';

const PlayButton = ({audioIsPlaying,onPlay, onPause ,...otherProps}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(()=>{
    if(audioIsPlaying){
        setIsPlaying(true);
    }
  },[audioIsPlaying])

  const playIcon = isPlaying ? require('../../../image/pause.png') : require('../../../image/play.png');
  
  const handlePlayPress = () => {
    if (isPlaying) {
        onPause();
    }
    else{
        onPlay();
    }
    
    setIsPlaying(!isPlaying);
    Alert.alert(`Now action is ${isPlaying}`)
  };

  return (
    <ImageBtn
        {...otherProps}
        source={playIcon}
        onPress={handlePlayPress}
    />
  );
};

export default PlayButton;