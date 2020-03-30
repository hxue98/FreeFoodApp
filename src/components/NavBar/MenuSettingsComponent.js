import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class MenuSettingsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {this.props.navigation.navigate('Settings'); this.props.onNavigate();}}>
          <Image
            style={styles.image}
            source={require('../../res/images/settings-64.png')}
          />
          <Text style={styles.text}>Settings</Text>
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