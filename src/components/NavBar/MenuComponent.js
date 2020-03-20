import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class MenuComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.textBtn}
          onPress={() => this.props.refreshMap()}>
          <Text style={styles.text}>Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => this.props.navigate('CreateEvents')}>
          <Image
            style={styles.addImage}
            source={require('../../res/images/add-50.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textBtn}
          onPress={() => this.props.navigateToMyAccount()}>
          <Text style={styles.text}>My Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5e9cff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textBtn: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  },
  addBtn: {
    alignSelf: 'center',
  },
  addImage: {
    height: 50,
    width: 50,
  },
});
