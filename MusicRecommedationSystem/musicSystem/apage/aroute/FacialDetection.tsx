import * as React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import CusButton from '../component/CusButton';
import { fetchData } from '../api/usefulFunction';
import FuncBar from '../component/FuncBar';
import { useFocusEffect } from '@react-navigation/native';
const includeExtra = true;

const FacialDetection = ({navigation}) => {
  const [response, setResponse] = React.useState<any>(null);
  const [base64, setBase64] = React.useState("");
  const [moodRes, setMoodRes] = React.useState("");
  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, (res)=>{
        setResponse(res)
        if(res.assets){
          setBase64(JSON.stringify(res.assets[0].base64));
          //Alert.alert(JSON.stringify(base64));
        }
      });
    } 
    else if (type === 'Listen'){
      if(base64){
        navigation.navigate("Home");
      }
      else{
        Alert.alert("Please take a photo!");
      }
    }
    else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, [base64]);
  React.useEffect(() => {
    if (base64) {
      Alert.alert(base64);
    }
  }, [base64]);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () =>{
        setResponse(null);
        setBase64("");
        setMoodRes("");
      };

      return () => unsubscribe();
    }, [])
  );
  // React.useEffect(()=>{
  //   fetchData("http://127.0.0.1:5000/expression", 'POST')
  //   .then(response => response.json())
  //   .then(data => Alert.alert(JSON.stringify(data)))
  //   .catch(error => Alert.alert(JSON.stringify(error.message)));

    
  // },[])


  return (
    <SafeAreaView style={styles.container}>
        {response?.assets &&
          response?.assets.map(({uri}: {uri: string}) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: uri}}
              />
            </View>
          ))}
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options}) => {
            return (
              <CusButton
                text={title}
                onPress={() => onButtonPress(type, options)}
              />
            );
          })}
        </View>
         {base64 && (
          <>
          <Text style={styles.text}>hi</Text>
          </>
         )}
        {moodRes && (
          <>
            <Text>The mood is:</Text>
            <Text>{moodRes}</Text>
          </>
        )}
      {/* <FuncBar navigation={navigation}/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
  
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    bottom:50
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text:{
    color: 'white',
  }
});

interface Action {
  title: string;
  type: 'capture' | 'library' | 'Listen';
  options?: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: false,
      cameraType: 'front',
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Listen Music',
    type: 'Listen'
  }
];

export default FacialDetection;