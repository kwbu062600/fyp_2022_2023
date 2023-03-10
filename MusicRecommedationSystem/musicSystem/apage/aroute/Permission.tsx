
import React, { useCallback, useEffect, useState } from 'react';
import { ImageRequireSource, Linking } from 'react-native';

import { StyleSheet, View, Text, Image } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

const Permission = ({ navigation }: any) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') navigation.replace('Login');
  }, [cameraPermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to FacSoMusic</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Camera needs <Text style={styles.bold}>Camera permission</Text>.        
          </Text>
        )}
        <View style={styles.grantContainer}>
            <Text style={styles.innerText} onPress={requestCameraPermission}>
                Grant
            </Text>
        </View>
       
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    welcomeText: {
        marginTop:20,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    permissionsContainer: {
        marginTop: 20,
        textAlign: 'center',
    },
    permissionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    grantContainer:{
        marginTop: 20,
        marginBottom:20,
        textAlign: 'center',
    },
    innerText: {
        fontSize: 20,
        color: '#007aff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default Permission;