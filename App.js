import React from 'react';
import {
  YellowBox,
  TextInput,
  Image,
  StyleSheet,
  View,
  Button,
  Alert,
} from 'react-native';
import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import config from './aws-exports';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CommentComponent from './src/components/Comment/CommentComponent';
import LocationDetailComponent from './src/components/LocationDetail/LocationDetailComponent';
import MapsComponent from './src/components/Maps/MapsComponent';
import RegisterComponent from './src/components/Login/RegisterComponent';
import LoginComponent from './src/components/Login/LoginComponent';
import CreateEvents from './src/components/Events/CreateEvents';
import LocationItem from './src/components/LocationDetail/LocationItem';
import {Provider} from 'react-redux';
import store from './src/redux/store';
API.configure(config); // Configure Amplify
PubSub.configure(config);

const Stack = createStackNavigator();

YellowBox.ignoreWarnings(['Require cycle:']);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Register" component={RegisterComponent} />
          <Stack.Screen
            name="Maps"
            component={MapsComponent}
            options={{title: 'Free Food Map'}}
          />
          <Stack.Screen name="Detail" component={LocationDetailComponent} />
          <Stack.Screen name="Comments" component={CommentComponent} />
          <Stack.Screen name="CreateEvents" component={CreateEvents} />
          <Stack.Screen name="LocationItem" component={LocationItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
