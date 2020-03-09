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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import API, {graphqlOperation} from '@aws-amplify/api';
import {createEvent} from '../../graphql/mutations';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import store from '../../redux/store';
import {GOOGLE_API_KEY} from '../../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

async function createNewEvents(
  posterId,
  text,
  startTime,
  endTime,
  latitude,
  longitude,
) {
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
  return true;
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

  setLocation(details) {
    this.setState({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
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

  checkInput(startTime, endTime, description) {
    if (startTime === '') {
      Alert.alert('Error', 'Start Time cannot be empty');
      return false;
    } else if (endTime === '') {
      Alert.alert('Error', 'End Time cannot be empty');
      return false;
    } else if (description === '') {
      Alert.alert('Error', 'Description cannot be empty');
      return false;
    }
    return true;
  }

  async confirmed() {
    if (
      this.checkInput(
        this.state.chosenStartDate,
        this.state.chosenEndDate,
        this.state.eventText,
      )
    ) {
      const res = await createNewEvents(
        store.getState().userId,
        this.state.eventText,
        this.state.startTime,
        this.state.endTime,
        this.state.latitude,
        this.state.longitude,
      ).catch(err => console.log(err));
      if (res) {
        this.props.navigation.replace('Maps');
      } else {
        Alert.alert('Error', 'Invalid Start time or End time or Description');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed="true" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details) => {
            this.setLocation(details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en', // language of the results
            // types: '(cities)', // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
        <View>
          <TouchableOpacity
            style={{borderWidth: 3}}
            onPress={this.showStartPicker}>
            <DateTimePickerModal
              isVisible={this.state.isVisible}
              onConfirm={this.startPicker}
              onCancel={this.hideEndPicker}
              mode="datetime"
              is24Hour={false}
            />
            <Text>{'Start Time: ' + this.state.chosenStartDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{borderWidth: 3}}
            onPress={this.showEndPicker}>
            <DateTimePickerModal
              isVisible={this.state.isEndVisible}
              onConfirm={this.endPicker}
              onCancel={this.hideEndPicker}
              mode="datetime"
              is24Hour={false}
            />
            <Text>{'End Time: ' + this.state.chosenEndDate}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.description}
            placeholder="Description"
            multiline={true}
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            onChangeText={text => this.setState({eventText: text})}
            value={this.state.eventText}
          />

          <Button
            style={{alignSelf: 'center', fontSize: 20}}
            onPress={() => {
              this.confirmed();
            }}
            title="Confirm"
          />
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
    width: '100%',
  },
  description: {
    height: 100,
    width: '100%',
    borderWidth: 3,
    borderColor: '#a6a6a6',
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
