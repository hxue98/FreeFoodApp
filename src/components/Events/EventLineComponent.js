import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export default class EventLineComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.navigate('EventDetail', {
            address: this.props.address,
            description: this.props.description,
            eventId: this.props.eventId,
            time: this.props.time,
            refresh: this.props.refresh,
          })
        }>
        <View style={styles.timeView}>
          <Text style={styles.date}>{this.props.date}</Text>
          <Text style={styles.month}>{this.props.month.substring(0, 3)}</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#a6a6a6',
  },
  timeView: {
    width: '13%',
    height: 55,
    marginLeft: 2,
    flexDirection: 'row',
  },
  date: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  month: {
    fontSize: 16,
    marginTop: 8,
    marginLeft: 10,
  },
  descriptionView: {
    marginLeft: 40,
    marginTop: 5,
    backgroundColor: '#e6e6e655',
    height: 25,
    width: '75%',
  },
  description: {
    fontSize: 17,
  },
});
