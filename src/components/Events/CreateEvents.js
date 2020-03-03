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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

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
      isVisible: false,
      isEndVisible: false,
      chosenStartDate: '',
      chosenEndDate: '',
      startTime: 0,
      endTime: 0,
    };
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

  async componentDidMount() {
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
          <Text
            style={{fontSize: 20, color: 'red', marginTop: 30, marginLeft: 10}}>
            {this.state.chosenStartDate}
          </Text>
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
          <Text
            style={{
              fontSize: 20,
              color: 'red',
              marginTop: 30,
              marginLeft: 10,
            }}>
            {this.state.chosenEndDate}
          </Text>
        </View>

        {/* <TextInput
          style={styles.input}
          placeholder="startTime"
          underlineColorAndroid={'transparent'}
          //   onChangeText={text => this.setState({user: text})}
          //   value={this.state.user}
        /> */}
        <View style={{marginTop: 80}}>
          <TextInput
            style={{
              height: 200,
              width: 300,
              borderWidth: 3,
              borderColor: '#a6a6a6',
              fontSize: 20,
            }}
            placeholder="Description"
            multiline={true}
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            onChangeText={text => this.setState({eventText: text})}
            value={this.state.eventText}
            //   onChangeText={text => this.setState({password: text})}
            //   value={this.state.password}
          />
          <TouchableOpacity
            onPress={() => {
              createNewEvents(
                this.props.route.params.userId,
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
              style={{
                alignSelf: 'center',
                marginTop: 30,
                height: 50,
                width: 60,
              }}
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
  image: {},
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
  //   input: {
  //     height: 40,
  //     width: 300,
  //     marginBottom: 4,
  //     marginTop: 4,
  //     borderWidth: 1,
  //     borderColor: '#a6a6a6',
  //   },
});
