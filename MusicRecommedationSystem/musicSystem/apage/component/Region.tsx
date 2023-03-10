import React from 'react';
import {View, Text} from 'react-native';
import styles from '../css/Region.scss';
import ImageBtn from './ImageBtn';
const Region = (props: any) => {
  const data = require('../../music/NCS.json');
  const filteredName = props.name.split('-')[1]?.trim().replace('[NCS Release]','');
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <ImageBtn
          style={styles.image}
          source={{uri: data[0]["thumbnails"]["url"]}}
          onPress={props.onPress}
        />
      </View>
      <View style={styles.caption}>
        <Text key={props.index} style={styles.text}>{filteredName}</Text>
      </View>
    </View>
  );
};

export default Region;
