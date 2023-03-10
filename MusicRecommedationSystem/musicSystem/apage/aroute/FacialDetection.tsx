import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import styles from '../css/FacialDetection.scss';
import FuncBar from '../component/FuncBar';
//import { runOnJS } from 'react-native-reanimated';
import {
    Camera,
    useCameraDevices,
    useFrameProcessor,
  } from 'react-native-vision-camera';
import CusButton from '../component/CusButton';
const FacialDetection = ({navigation, route}: any) => {
    const devices = useCameraDevices();
    const device = devices.front;
    const camera = useRef(null);
    const takePhotoOptions = {
        qualityPrioritization: 'speed',
        flash: 'off'
      };
    const takePhoto = async () => {
        try {
          //Error Handle better
          if (camera.current == null) throw new Error('Camera Ref is Null');
          console.log('Photo taking ....');
          const photo = await camera.current.takePhoto(takePhotoOptions);
          Alert.alert(photo.path)
        } catch (error) {
          Alert.alert(error.message);
        }
      };
    return (
        <SafeAreaView style={styles.container}>
           {device != null? (
            <>
            <Camera
                ref={camera}
                device={device}
                isActive={true}
                photo={true}
            />
            <View style={styles.btnContainer}>
                <CusButton text="Capture" onPress={takePhoto} />
            </View>
            </>
           ):  (
            <View style={styles.innerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.notReady}>Your Device is unavailable</Text>
                </View>
                
                {/* <View style={styles.btnContainer}>
                        <CusButton text="Capture" onPress={takePhoto} />
                </View> */}
            </View>
           )
           }
        <FuncBar navigation={navigation} />
        </SafeAreaView>
    );
};

export default FacialDetection;
