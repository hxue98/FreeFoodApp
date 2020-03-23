import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import lambda from '../../api';
import LocationDetailComponent from '../LocationDetail/LocationDetailComponent';
import SidePaneComponent from '../NavBar/SidePaneComponent';
import FilterButtonComponent from './FilterButtonComponent';
import FilterComponent from './FilterComponent';
import {GOOGLE_API_KEY} from '../../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as Animatable from 'react-native-animatable';
import {request, PERMISSIONS} from 'react-native-permissions';

export default class MapComponent extends Component {
  constructor(props) {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            if (this.state.showNav) {
              this.refs.navBar.hide();
            } else {
              this.toggleNav();
            }
          }}>
          <Image
            style={styles.menuImage}
            source={require('../../res/images/menu-64.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <FilterButtonComponent toggle={this.toggleFilter}/>
          <TouchableOpacity
            style={styles.add}
            onPress={() => {
              this.props.navigation.navigate('CreateEvents');
              this.hideAll();
            }}>
            <Image
              style={styles.addImage}
              source={require('../../res/images/add-64.png')}
            />
          </TouchableOpacity>
        </View>

      ),
    });
    super(props);
    this.state = {
      initLocation: null,
      region: null,
      events: [],
      locationFetchCompolete: false,
      queryComplete: false,
      search: '',
      eventDetail: null,
      showNav: false,
      showFilter: false,
      filter: {
        distanceRange: 1,
        startTIme: Date.now(),
        endTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
        keyword: ''
      }
    };
  }

  toggleFilter = () => {
    this.setState({showFilter: !this.state.showFilter});
  }

  applyFilter = (filter) => {
    this.setState({filter: filter});
    this.refresh();
  }

  toggleNav = () => {
    this.setState({showNav: !this.state.showNav});
  };

  hideAll = () => {
    this.setState({showNav: false});
    this.setState({showFilter: false});
    this.setState({eventDetail: null});
  }

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
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === 'granted') {
        this.getCurrentLocation();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        this.getCurrentLocation();
      }
    }
  };

  refresh = async () => {
    this.setState({queryComplete: false});
    const request = {
      operation: 'GETEVENTS',
    };
    const response = await lambda(request);
    this.setState({events: response.events, queryComplete: true});
  };

  async componentDidMount() {
    this.requestLocationPermission();
    this.refresh();
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

  showDetail(event) {
    if (this.state.eventDetail) {
      this.setState({
        eventDetail: null,
      });
    }
    this.setState({
      eventDetail: {...event},
    });
  }

  navigateToComment = eventId => {
    this.props.navigation.navigate('Comments', {eventId: eventId});
  };

  render() {
    const component =
      this.state.locationFetchCompolete && this.state.queryComplete ? (
        <View style={styles.container}>
          <MapView
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
            initialRegion={this.state.initLocation}
            region={this.state.region}
            onRegionChangeComplete={region => this.setState({region: region})}
            style={styles.map}
            onPress={() => this.hideAll()}>
            {Platform.OS === 'ios'
              ? this.state.events.map(event => (
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
                          eventId={event.eventId}
                          time={
                            new Date(event.startTime).toLocaleDateString() +
                            '                 ' +
                            new Date(event.startTime)
                              .toLocaleTimeString()
                              .substring(0, 5) +
                            ' - ' +
                            new Date(event.endTime)
                              .toLocaleTimeString()
                              .substring(0, 5)
                          }
                          description={event.description}
                          address={event.address}
                          navigateToComment={this.navigateToComment}
                        />
                      </View>
                    </Callout>
                  </Marker>
                ))
              : this.state.events.map(event => (
                  <Marker
                    coordinate={{
                      latitude: event.latitude,
                      longitude: event.longitude,
                    }}
                    key={event.eventId}
                    onPress={() => this.showDetail(event)}
                  />
                ))}
            <Marker
              coordinate={this.state.initLocation}
              pinColor="#1495e0"
              onPress={() => this.hideAll()}
            />
          </MapView>
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
                this.setRegion(details);
              }}
              ref={c => (this.googlePlacesAutocomplete = c)}
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
              }}
              styles={{
                container: {
                  backgroundColor: '#ffffffd3',
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
          {this.state.eventDetail !== null && (
            <Animatable.View
              style={styles.detail}
              animation="fadeInUp"
              duration={500}>
              <LocationDetailComponent
                eventId={this.state.eventDetail.eventId}
                time={
                  new Date(
                    this.state.eventDetail.startTime,
                  ).toLocaleDateString() +
                  '                 ' +
                  new Date(this.state.eventDetail.startTime)
                    .toLocaleTimeString()
                    .substring(0, 5) +
                  ' - ' +
                  new Date(this.state.eventDetail.endTime)
                    .toLocaleTimeString()
                    .substring(0, 5)
                }
                description={this.state.eventDetail.description}
                address={this.state.eventDetail.address}
                navigateToComment={this.navigateToComment}
              />
            </Animatable.View>
          )}


        {
          this.state.showFilter && (
            <FilterComponent filter={this.state.filter} onApplyFilter={this.applyFilter} toggle={this.toggleFilter}/>
          )
        }
        </View>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );

    return (
      <View>
        {component}
        <SidePaneComponent
          ref="navBar"
          navigation={this.props.navigation}
          show={this.state.showNav}
          hideNav={() => {
            setTimeout(() => this.toggleNav(), 300);
          }}
          refreshMap={this.refresh}
        />
      </View>
    );
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row'
  },
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
  detail: {
    width: '90%',
    backgroundColor: '#dbd9cedf',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '15%',
    borderRadius: 11,
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
  menu: {
    left: 5,
  },
  menuImage: {
    width: 50,
    height: 50,
  },
  add: {
    alignSelf: 'center',
    right: 5
  },
  addImage: {
    width: 45,
    height: 45,
  },
});