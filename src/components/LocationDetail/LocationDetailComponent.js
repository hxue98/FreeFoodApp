import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableHighlight, Button, Linking} from 'react-native';

export default class LocationDetailComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.address} onPress={() => Linking.openURL('http://maps.google.com/maps?daddr=' + this.props.address)}>{this.props.address}</Text>
        <Text style={styles.time}>Time: {this.props.time}</Text>
        <Text style={styles.notes}>Description: {this.props.description}</Text>
        <TouchableHighlight style={styles.btn}>
            <Button title="Comment" onPress={() => {this.props.navigateToComment(this.props.eventId)}}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#FFFFFF3F',
    bottom: 0,
    borderRadius: 11,
    margin: 3
  },
  address: {
    flex: 2,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  time: {
    flex: 1.1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#a6a6a6',
  },
  notes: {
    flex: 5,
    fontSize: 16,
  },
  btn: {
    width: 150,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 3
  }
});
