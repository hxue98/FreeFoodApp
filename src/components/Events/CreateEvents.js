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
    };
  }

  setLocation(details, data) {
    this.setState({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: data.description,
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

  getCurrentLocation() {
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
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

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
        this.state.address,
      ).catch(err => console.log(err));
      if (res) {
        this.props.navigation.replace('Maps');
      } else {
        Alert.alert('Error', 'Invalid Start time or End time or Description');
      }
    }
  }

  async componentDidMount() {
    this.getCurrentLocation();
  }

  render() {
    const currentLocation = {
      description: 'Current location',
      geometry: {
        location: {lat: this.state.latitude, lng: this.state.longitude},
      },
    };
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search Location"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed="true" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details) => {
              // console.log('detail', details);
              // console.log('data', data);
              this.setLocation(details, data);
            }}
            ref={c => (this.googlePlacesAutocomplete = c)}
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
            // currentLocation // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            predefinedPlaces={[currentLocation]}
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

        <View>
          <TouchableOpacity
            style={{borderWidth: 1, marginTop: 15}}
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
            style={{borderWidth: 1, marginTop: 15}}
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
            style={{fontSize: 18, marginTop: 35}}
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
    // alignSelf: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
  description: {
    height: 100,
    width: '100%',
    borderWidth: 3,
    borderColor: '#a6a6a6',
    fontSize: 18,
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    width: window.width,
  },
  cancelSearch: {
    marginTop: 9,
    right: 10,
    position: 'absolute',
  },
  cancelSearchImage: {
    width: 25,
    height: 25,
  },
});
