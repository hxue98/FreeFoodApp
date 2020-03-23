import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.toggle()}>
          <Image
            style={styles.image}
            source={require('../../res/images/filter-64.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  btn: {
    alignSelf: 'center'
  },
  image: {
    width: 50,
    height: 50
  }
});