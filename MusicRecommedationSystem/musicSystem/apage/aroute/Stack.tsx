import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Info from './MoodChoice';
import FacialDetection from './FacialDetection';
import Login from './Login';
import Recommend from './Recommend';
import Permission from './Permission';
import Register from './Register';
import MusicLibrary from './MusicLibrary';
import Account from './User';
import AccountSetting from './UserSetting';
import {Text, View} from 'react-native';
import styles from '../css/App.scss';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
const MyStack = () => {
  const [cameraPermission, setCameraPermission] = React.useState<CameraPermissionStatus>();
  const Stack = createNativeStackNavigator();
  React.useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    return null;
  }
  const showPermissionsPage = cameraPermission !== 'authorized';
  return (
    <NavigationContainer>
      {
        // The stack contain the screen page
        // It can call by other screen with function navigate()
      }
      <Stack.Navigator 
        // initialRouteName= {!showPermissionsPage?'Permission': 'Facial Detection'}>
        >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'FaceSoMusic',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Recommendation"
          component={Recommend}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Facial Detection"
          component={FacialDetection}
          options={{
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Permission" component={Permission} 
          options={{
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Register" component={Register} 
          options={{
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
         <Stack.Screen
          name="My Library"
          component={MusicLibrary}
          options={{
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
         <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="User Setting"
          component={AccountSetting}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
