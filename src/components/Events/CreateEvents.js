import React, {Component} from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import API, {graphqlOperation} from '@aws-amplify/api';
import {createEvent} from '../../graphql/mutations';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import store from '../../redux/store';
import {GOOGLE_API_KEY} from '../../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';

async function createNewEvents(
  posterId,
  text,
  startTime,
  endTime,
  latitude,
  longitude,
  address,
) {
  const event = {
    eventId: 0,
    posterId: posterId,
    description: text,
    startTime: startTime,
    endTime: endTime,
    latitude: latitude,
    longitude: longitude,
    address: address,
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
      address: '',
      currentLocation: null,
    };
  }

  setLocation(details, data) {
    this.setState({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address:
        data.description === 'Current location'
          ? this.state.currentAddress
          : data.description,
    });
  }

  startPicker = datetime => {
    this.setState({
      isVisible: false,
      chosenStartDate: moment(datetime).format('MM/DD HH:mm'),
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
      chosenEndDate: moment(datetime).format('MM/DD HH:mm'),
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

  async getCurrentLocation() {
    Geolocation.getCurrentPosition(
      async position => {
        const url =
          'https://maps.googleapis.com/maps/api/geocode/json?key=' +
          GOOGLE_API_KEY +
          '&latlng=' +
          position.coords.latitude +
          ',' +
          position.coords.longitude +
          '&sensor=true';
        const response = await fetch(url);
        const address = await response.json();
        this.setState({
          currentAddress: address.results[0].formatted_address,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          currentLocation: {
            description: 'Current location',
            geometry: {
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
          },
        });
      },
      error => {
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  checkInput(address, startTime, endTime, description) {
    if (address === '') {
      Alert.alert('Error', 'Address cannot be empty');
      return false;
    } else if (startTime === '') {
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
        this.state.address,
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
        this.state.address,
      ).catch(err => console.error(err));
      if (res) {
        this.props.navigation.replace('Maps');
      } else {
        Alert.alert('Error', 'Invalid Start time or End time or Description');
      }
    }
  }

  async componentDidMount() {
    await this.getCurrentLocation();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search Location"
            minLength={3}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed="true"
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details) => {
              this.setLocation(details, data);
            }}
            ref={c => (this.googlePlacesAutocomplete = c)}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
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
            predefinedPlaces={[this.state.currentLocation]}
            predefinedPlacesAlwaysVisible={true}
          />
          <TouchableOpacity
            onPress={() => this.googlePlacesAutocomplete.setAddressText('')}
            style={styles.cancelSearch}>
            <Image
              style={styles.cancelSearchImage}
              source={require('../../res/images/clear-search-24.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={this.showStartPicker}>
            <DateTimePickerModal
              isVisible={this.state.isVisible}
              onConfirm={this.startPicker}
              onCancel={this.hideStartPicker}
              mode="datetime"
              is24Hour={false}
            />
            <Text style={styles.text}>
              {'Start Time: ' + this.state.chosenStartDate}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={this.showEndPicker}>
            <DateTimePickerModal
              isVisible={this.state.isEndVisible}
              onConfirm={this.endPicker}
              onCancel={this.hideEndPicker}
              mode="datetime"
              is24Hour={false}
            />
            <Text style={styles.text}>
              {'End Time: ' + this.state.chosenEndDate}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.description}
          placeholder="Description"
          multiline={true}
          textAlignVertical={'top'}
          underlineColorAndroid={'transparent'}
          onChangeText={text => this.setState({eventText: text})}
          value={this.state.eventText}
        />

        <TouchableOpacity style={styles.btn}>
          <Button
            onPress={() => {
              this.confirmed();
            }}
            title="Confirm"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  description: {
    height: 200,
    width: '95%',
    borderWidth: 1,
    borderColor: '#5e9cff',
    fontSize: 18,
    marginTop: 30,
    alignSelf: 'center',
  },
  text: {
    fontSize: 15,
    color: 'white',
  },
  datePicker: {
    height: 25,
    marginTop: 30,
    marginHorizontal: '3%',
    backgroundColor: '#139af2',
    width: '44%',
    paddingLeft: 3,
  },
  btn: {
    width: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    width: window.width,
  },
  cancelSearch: {
    marginTop: 9,
    right: 10,
    position: 'absolute',
    backgroundColor: 'white',
  },
  cancelSearchImage: {
    width: 25,
    height: 25,
    opacity: 0.2,
  },
});
