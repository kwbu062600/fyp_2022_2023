import React from 'react';
import {SafeAreaView, View, Text, FlatList, ScrollView} from 'react-native';

import styles from '../css/Home.scss';
import FuncBar from '../component/FuncBar';
import ImageBtn from '../component/ImageBtn';
import Region from '../component/Region';
const HomePage = () => {
  const name = 'Brian';
  const region = [
    {
      id: 1,
      name: 'Local',
    },
    {
      id: 2,
      name: 'America',
    },
    {
      id: 3,
      name: 'Asia',
    },
  ];
  const RecommendComponent = () => {
    return <Text style={styles.rdText}>Recommend</Text>;
  };

  const listItem = ({item}: any) => {
    return (
      <View style={styles.listView}>
        <Text style={styles.rdText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingView}>
        <Text style={styles.text}>Hi, {name}</Text>
        <ImageBtn
          style={styles.imageBtn}
          source={require('../../image/search.png')}
        />
      </View>
      <View style={styles.bannerView} />

      <View style={styles.recommendView}>
        <Text style={styles.rdText}>Recommend</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Region name={region[0].name} />
          <Region name="America" />
          <Region name="Hong Kong" />
          <Region name="China" />
          <Region name="Japan" />
          <Region name="England" />
        </ScrollView>
      </View>

      <FuncBar />
    </SafeAreaView>
  );
};

export default HomePage;
