import React from 'react';
import { StyleSheet, View } from 'react-native';
import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import config from './aws-exports';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CommentComponent from './src/components/Comment/CommentComponent';
import LocationDetailComponent from './src/components/LocationDetail/LocationDetailComponent';
import MapsComponent from './src/components/Maps/MapsComponent'

API.configure(config)             // Configure Amplify
PubSub.configure(config)

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Free Food Map"
          component={MapsComponent}
        />
        <Stack.Screen
          name="Detail"
          component={LocationDetailComponent}
        />
        <Stack.Screen
          name="Comments"
          component={CommentComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}