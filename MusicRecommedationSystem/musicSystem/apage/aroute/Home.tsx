import React, {useRef, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { Button,Text, View, SafeAreaView, StyleSheet } from 'react-native'
import { Camera, useCameraDevices} from 'react-native-vision-camera';

import styles from '../css/Home.scss'


const HomePage = ({route, navigation}:any) => {

    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    const camera = useRef<Camera>(null);
    const [hasPermission, setHasPermission] = useState<boolean | any>(false);

    const requestCameraPermission = async (): Promise<any> => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
    };

    useEffect(() => {
        requestCameraPermission();
    },[])
    if (device == null) {
        return (
            <>
                <Text style={styles.cc}>The Camera is not ready</Text>
                <Button title="Further emotion info" onPress={()=>navigation.navigate("Info")}></Button>
            </>
        );
    }

    const handleBarCodeScanned = async () => {
        if (camera?.current) {
            const photo = await camera.current.takePhoto({
                   flash: "on",
                   qualityPrioritization: "speed",
                   skipMetadata: true,
                 });
            if (photo?.path) {
            const imagePath =
                Platform.OS === "ios" ? photo?.path : `file://${photo?.path}`;
            }
        }
    }

    return (
        <SafeAreaView>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true} 
                torch={'off'}
                photo={true}
              />
            <Button
                title="Music info"
                onPress={() =>handleBarCodeScanned()}></Button>
         </SafeAreaView>
    )

    
};

export default HomePage;
