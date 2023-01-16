import React from 'react';
import {SafeAreaView, View} from 'react-native';

import styles from '../css/Home.scss';
import FuncBar from '../component/FuncBar';
const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
        <FuncBar/>
    </SafeAreaView>
  )
};

export default HomePage;
