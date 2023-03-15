import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Info from './MoodChoice';
import Login from './Login';
import Recommend from './Recommend';
import User from './User';
import UserSetting from './UserSetting';
import {Text, View} from 'react-native';
import styles from '../css/App.scss';
const MyStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {
        // The stack contain the screen page
        // It can call by other screen with function navigate()
      }
      <Stack.Navigator>
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
          name="Account"
          component={User}
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
          component={UserSetting}
          options={{
            headerBackVisible: true,
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
