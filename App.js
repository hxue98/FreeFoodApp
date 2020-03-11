import React from 'react';
import {
  YellowBox,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import config from './aws-exports';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import CommentComponent from './src/components/Comment/CommentComponent';
import LocationDetailComponent from './src/components/LocationDetail/LocationDetailComponent';
import MapsComponent from './src/components/Maps/MapsComponent';
import RegisterComponent from './src/components/Login/RegisterComponent';
import LoginComponent from './src/components/Login/LoginComponent';
import CreateEvents from './src/components/Events/CreateEvents';
import store from './src/redux/store';
API.configure(config);
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}