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
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import store from '../../redux/store';
import Geocode from 'react-geocode';
import {GOOGLE_API_KEY} from '../../../config';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import LocationItem from '../LocationDetail/LocationItem';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// Geocode.setApiKey(KEY.GOOGLE_API_KEY);
// Geocode.enableDebug();
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

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

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

  setEventLocation(address) {
    // Get latidude & longitude from address.
    Geocode.fromAddress(address).then(
      response => {
        const {lat, lng} = response.results[0].geometry.location;
        this.setState({
          latitude: lat,
          longitude: lng,
        });
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      },
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
        <GoogleAutoComplete
          apiKey={GOOGLE_API_KEY}
          debounce={500}
          minLength={2}>
          {({
            inputValue,
            handleTextChange,
            locationResults,
            fetchDetails,
            isSearching,
            clearSearch,
          }) => (
            <React.Fragment>
              <View>
                <TextInput
                  style={{
                    height: 40,
                    width: 300,
                    borderWidth: 1,
                    paddingHorizontal: 16,
                  }}
                  value={inputValue}
                  onChangeText={handleTextChange}
                  placeholder="Location..."
                />
                {console.log('hello', fetchDetails)}
                <Button title="Clear" onPress={clearSearch} />
                {isSearching && <ActivityIndicator size="large" color="red" />}
                <ScrollView style={{maxHeight: 100}}>
                  {locationResults.map((el, i) => (
                    <LocationItem
                      {...el}
                      fetchDetails={fetchDetails}
                      key={String(i)}>
                      {console.log('detail', {fetchDetails})}
                    </LocationItem>
                  ))}
                </ScrollView>
              </View>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.startTimebutton}
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
          <TouchableOpacity
            style={styles.endTimebutton}
            onPress={this.showEndPicker}>
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
          {/* <TextInput
            style={styles.address}
            placeholder="Address"
            multiline={true}
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            onChangeText={text => this.setState({address: text})}
            value={this.state.address}
          /> */}
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
              this.setEventLocation(this.state.address);
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
    backgroundColor: '#fff',
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
  startTimebutton: {
    width: 50,
    height: 50,
    backgroundColor: '#330066',
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 15,
  },
  endTimebutton: {
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
    marginTop: 5,
    marginLeft: 10,
  },
  address: {
    fontSize: 15,
    height: 45,
    width: 300,
    borderWidth: 3,
    borderColor: '#a6a6a6',
    marginBottom: 20,
  },
});
