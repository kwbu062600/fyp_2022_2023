import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Info from './MoodChoice';
import Login from './Login';
import {Text, View} from 'react-native';

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
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen name="Facial Detection" component={Home} />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{headerBackVisible: false, headerBackTitleVisible: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
