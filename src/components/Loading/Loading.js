import React, {Component} from 'react';
import {
  TextInput,
  Text,
  Image,
  StyleSheet,
  View,
  Button,
  Alert,
  TouchableHighlight,
} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 430, height: 450}}
          source={require('../../res/images/team-logo.png')}
        />
        <Image
          style={{width: 400, height: 100}}
          source={require('../../res/images/team-name.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
});
