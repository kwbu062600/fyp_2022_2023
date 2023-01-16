import React from 'react';
import {View, Text, Alert} from 'react-native';

import styles from '../css/FuncBar.scss';
import ImageBtn from './ImageBtn';
const FuncBar = () => {
  const test = () => {
    Alert.alert('Hi');
  };
  return (
    <View style={styles.fixBar}>
      <View>
        <ImageBtn source={require('../../image/home.png')} onPress={test} />
        <Text style={styles.fixText}>Home</Text>
      </View>
      <View>
        <ImageBtn source={require('../../image/media.png')} onPress={test} />
        <Text style={styles.fixText}>Music</Text>
      </View>
      <View>
        <ImageBtn source={require('../../image/user.png')} onPress={test} />
        <Text style={styles.fixText}>User</Text>
      </View>
    </View>
  );
};

export default FuncBar;
