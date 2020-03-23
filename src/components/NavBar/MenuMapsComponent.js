import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class MenuMapsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.refreshMap()}>
          <Image
            style={styles.image}
            source={require('../../res/images/maps-64.png')}
          />
          <Text style={styles.text}>Maps</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#c4c4c466'
  },
  btn: {
    left: -18,
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