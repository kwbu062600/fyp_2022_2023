import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
const ImageBtn = ({source, onPress, ...action}: any) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image {...action} source={source} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageBtn;
