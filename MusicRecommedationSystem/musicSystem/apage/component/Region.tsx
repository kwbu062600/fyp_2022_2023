import React from 'react';
import {View, Text} from 'react-native';
import styles from '../css/Region.scss';
import ImageBtn from './ImageBtn';
const Region = (prop: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <ImageBtn
          style={styles.image}
          source={require('../../image/home.png')}
        />
      </View>
      <View style={styles.caption}>
        <Text style={styles.text}>{prop.name}</Text>
      </View>
    </View>
  );
};

export default Region;
