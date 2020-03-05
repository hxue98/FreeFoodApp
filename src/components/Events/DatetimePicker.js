import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, {Component} from 'react';
import moment from 'moment';
import {
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class DatetimePicker extends Component {
  constructor() {
    this.state = {
      isVisible: false,
      isEndVisible: false,
      chosenStartDate: '',
      chosenEndDate: '',
    };
  }

  render() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.showStartPicker}>
            <Text style={styles.text}>Start Time</Text>
            <DateTimePickerModal
              isVisible={this.state.isVisible}
              onConfirm={this.startPicker}
              onCancel={this.hideEndPicker}
              mode="datetime"
              is24Hour={false}
            />
          </TouchableOpacity>
          <Text style={styles.startText}>{this.state.chosenStartDate}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={this.showEndPicker}>
            <Text style={styles.text}>End Time</Text>
            <DateTimePickerModal
              isVisible={this.state.isEndVisible}
              onConfirm={this.endPicker}
              onCancel={this.hideEndPicker}
              mode="datetime"
              is24Hour={false}
            />
          </TouchableOpacity>
          <Text style={styles.endText}>{this.state.chosenEndDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    marginTop: 30,
    height: 50,
    width: 60,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#330066',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  startText: {
    fontSize: 20,
    color: 'red',
    marginTop: 30,
    marginLeft: 10,
  },
  endText: {
    fontSize: 20,
    color: 'red',
    marginTop: 30,
    marginLeft: 10,
  },
});
