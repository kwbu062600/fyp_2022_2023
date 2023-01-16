import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
const ImageBtn = ({source, ...action}: any) => {
  return (
    <View>
      <TouchableOpacity {...action}>
        <Image source={source} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageBtn;
