import React, {Component} from 'react';
import {Image, StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';
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
            source={require('../../res/images/logout-64.png')}
          />
          <Text style={styles.text}>Logout</Text>
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
    left: -10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  image: {
    width: 50,
    height: 50
  },
  text: {
    marginLeft: 5,
    marginTop: 15,
    fontSize: 15,
  }
});