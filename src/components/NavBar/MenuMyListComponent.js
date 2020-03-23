import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class MenuMyListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('MyEvents')}>
          <Image
            style={styles.image}
            source={require('../../res/images/list-64.png')}
          />
          <Text style={styles.text}>My Lists</Text>
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