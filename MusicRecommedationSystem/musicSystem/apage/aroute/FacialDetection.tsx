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
import { server_host,API_expression, local_host } from '../api/api';
const includeExtra = true;

const FacialDetection = ({navigation,route}:any) => {
  const {id} = route.params
  const [response, setResponse] = React.useState<any>(null);
  const [base64, setBase64] = React.useState("");
  // var base64 = "";
  const [moodRes, setMoodRes] = React.useState("Happy");
  const onButtonPress = React.useCallback((type:any, options:any) => {
    
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
      if(base64&& moodRes){
        navigation.navigate("Home", {id:id});
      }
      else{
        Alert.alert("Please take a photo!");
      }
    }
    else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, [base64]);
  // React.useEffect(() => {
  //   if (base64) {
  //     Alert.alert(base64);
  //   }
  // }, [base64]);
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
  //   fetchData(`${server_host}${API_expression}`, 'POST')
  //   .then(response => response.json())
  //   .then(data => {
  //     setMoodRes(data)
  //     Alert.alert(JSON.stringify(data))
  //   })
  //   .catch(error => Alert.alert(JSON.stringify(error.message)));
  // },[])

  // React.useEffect(()=>{
  //   fetchData("http://127.0.0.0.1:5000/recommend", 'POST', undefined,{emotion:"Happy"})
  //   .then(response => response.json())
  //   .then(data => {Alert.alert(JSON.stringify(data))})
  // })


  return (
    <SafeAreaView style={styles.container}>
        {response?.assets &&
          response?.assets.map(({uri}: {uri: string}) => (
            <View style={styles.imageContainer}>
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
          <Text style={styles.text}>Please Click the Listen Music</Text>
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