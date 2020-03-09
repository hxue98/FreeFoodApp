import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Menu,
  Text,
  navigator,
  Button,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {TextInput} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import API, {graphqlOperation} from '@aws-amplify/api';
import {listEvents} from '../../graphql/queries';
import CreateEvents from '../Events/CreateEvents';
import LocationDetailComponent from '../LocationDetail/LocationDetailComponent';
import {GOOGLE_API_KEY} from '../../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLocation: null,
      region: null,
      events: [],
      locationFetchCompolete: false,
      queryComplete: false,
      search: '',
    };
  }

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
          initLocation: region,
          region: region,
          locationFetchCompolete: true,
        });
      },
      error => {
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    const events = await API.graphql(graphqlOperation(listEvents));
    console.log('map', events.data.listEvents.items);
    this.setState({events: events.data.listEvents.items, queryComplete: true});
  }
  onRegionChange(region) {
    this.setState({region});
  }
  setRegion(details) {
    this.setState({
      region: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.00822 * 2.5,
        longitudeDelta: 0.00401 * 2.5,
        key: 123456,
      },
    });
  }

  render() {
    const component =
      this.state.locationFetchCompolete && this.state.queryComplete ? (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.initLocation}
            region={this.state.region}
            onRegionChange={this.state.onRegionChange}
            style={styles.map}>
            {this.state.events.map(event => (
              <Marker
                coordinate={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                }}
                key={event.eventId}>
                <Callout
                  onPress={() =>
                    this.props.navigation.navigate('Comments', {
                      eventId: event.eventId,
                    })
                  }>
                  <View>
                    <LocationDetailComponent
                      time={
                        new Date(event.startTime).toLocaleTimeString() +
                        ' - ' +
                        new Date(event.endTime).toLocaleTimeString()
                      }
                      description={event.description}
                      address={event.address}
                      style={styles.detail}
                    />
                  </View>
                </Callout>
              </Marker>
            ))}
            <Marker coordinate={this.state.initLocation} pinColor="blue" />
          </MapView>
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
                this.setRegion(details);
              }}
              ref={c => (this.googlePlacesAutocomplete = c)}
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
              }}
              styles={{
                container: {
                    backgroundColor: '#ffffffd3'
                },
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
            <TouchableOpacity
              onPress={() => this.googlePlacesAutocomplete.setAddressText('')}
              style={styles.cancelSearch}>
              <Image
                style={styles.cancelSearchImage}
                source={require('../../res/images/clear-search-24.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.add}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(CreateEvents)}>
              <Image
                // style={styles.add}
                source={require('../../res/images/add-50.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );

    return <View>{component}</View>;
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: window.height,
    width: window.width,
  },
  loading: {
    height: window.height,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#ffffffcf',
    borderColor: '#a6a6a6',
    borderWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    height: 45,
    width: '90%',
    fontSize: 17,
  },
  btn: {
    height: 30,
    width: 30,
    marginTop: 7,
  },
  detail: {},
  add: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    right: 10,
    position: 'absolute',
    bottom: 90,
  },
  searchContainer: {
    flexDirection: 'row',
    width: window.width
  },
  cancelSearch: {
    marginTop: 9,
    right: 10,
    position: 'absolute'
  },
  cancelSearchImage: {
    width: 25,
    height: 25
  }
});
