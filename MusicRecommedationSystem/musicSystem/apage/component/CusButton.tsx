import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../css/CusBtn.scss';
const CusButton = ({text, ...otherProps}: any) => {
  return (
    <View>
      <TouchableOpacity style={styles.btn} {...otherProps}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CusButton;
