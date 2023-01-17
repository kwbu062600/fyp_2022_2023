import React from 'react';
import {View, Text} from 'react-native';
import styles from '../css/Region.scss';
import ImageBtn from './ImageBtn';
const Region = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <ImageBtn
          style={styles.image}
          source={require('../../image/home.png')}
          onPress={props.onPress}
        />
      </View>
      <View style={styles.caption}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </View>
  );
};

export default Region;
