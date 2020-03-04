import React, {Component} from 'react';
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
import API, {graphqlOperation} from '@aws-amplify/api';
import {createEvent} from '../../graphql/mutations';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import store from '../../redux/store';
async function createNewEvents(
  posterId,
  text,
  latitude,
  longitude,
  startTime,
  endTime,
) {
  if (text == '') {
    return;
  }
  const event = {
    eventId: 0,
    posterId: posterId,
    description: text,
    startTime: startTime,
    endTime: endTime,
    latitude: latitude,
    longitude: longitude,
    upvote: 0,
    downvote: 0,
  };
  await API.graphql(graphqlOperation(createEvent, {input: event}));
}

export default class CreateEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventText: '',
      latitude: 0,
      longitude: 0,
      startTime: 0,
      endTime: 0,
      isVisible: false,
      isEndVisible: false,
      chosenStartDate: '',
      chosenEndDate: '',
    };
  }

  async componentDidMount() {
    console.log('from create events', store.getState());
    Geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00822 * 2.5,
          longitudeDelta: 0.00401 * 2.5,
          key: 123456,
        };
        this.setState({
          latitude: region.latitude,
          longitude: region.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  startPicker = datetime => {
    this.setState({
      isVisible: false,
      chosenStartDate: moment(datetime).format('MMMM, Do YYYY HH:mm'),
      startTime: datetime.getTime(),
    });
  };

  showStartPicker = () => {
    this.setState({
      isVisible: true,
    });
  };

  hideStartPicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  endPicker = datetime => {
    this.setState({
      isEndVisible: false,
      chosenEndDate: moment(datetime).format('MMMM, Do YYYY HH:mm'),
      endTime: datetime.getTime(),
    });
  };

  showEndPicker = () => {
    this.setState({
      isEndVisible: true,
    });
  };

  hideEndPicker = () => {
    this.setState({
      isEndVisible: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
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
        <View style={{marginTop: 80}}>
          <TextInput
            style={styles.description}
            placeholder="Description"
            multiline={true}
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            onChangeText={text => this.setState({eventText: text})}
            value={this.state.eventText}
          />
          <TouchableOpacity
            onPress={() => {
              createNewEvents(
                store.getState().userId,
                this.state.eventText,
                this.state.latitude,
                this.state.longitude,
                this.state.startTime,
                this.state.endTime,
              );
              setTimeout(() => {
                this.props.navigation.replace('Maps');
              }, 300);
            }}>
            <Image
              style={styles.image}
              source={require('../../res/images/deliver-food-40.png')}
            />
          </TouchableOpacity>
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
  description: {
    height: 200,
    width: 300,
    borderWidth: 3,
    borderColor: '#a6a6a6',
    fontSize: 20,
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
