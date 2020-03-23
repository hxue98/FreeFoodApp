import React, {Component} from 'react';
import {Image, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class MenuLogoutComponent extends Component {
  constructor(props) {
    super(props);
  }

  logout = async () => {
    Alert.alert('Log out', 'Are you sure to log out?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem('@token');
          this.props.navigation.replace('Login');
        },
      },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.btn}
          onPress={() => this.logout()}>
          <Image
            style={styles.image}
            source={require('../../res/images/logout.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  btn: {
    alignSelf: 'center'
  },
  image: {
    width: 50,
    height: 50
  },
});