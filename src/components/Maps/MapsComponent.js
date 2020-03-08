import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {TextInput} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import API, {graphqlOperation} from '@aws-amplify/api';
import {listEvents} from '../../graphql/queries';
import CreateEvents from '../Events/CreateEvents';
import store from '../../redux/store';

import LocationDetailComponent from '../LocationDetail/LocationDetailComponent';

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
    for (let i = 0; i < events.length; i++) {
      event[i].key = event[i].eventId;
    }
    this.setState({events: events.data.listEvents.items, queryComplete: true});
  }

  render() {
    const component =
      this.state.locationFetchCompolete && this.state.queryComplete ? (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.initLocation}
            region={this.state.region}
            // onRegionChangeComplete={(region) => this.setState({region: region})}
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
                      style={styles.detail}
                    />
                  </View>
                </Callout>
              </Marker>
            ))}
            <Marker coordinate={this.state.initLocation} pinColor="blue" />
          </MapView>
          <View style={styles.search}>
            <TextInput
              style={styles.input}
              placeholder="Search for address"
              value={this.state.search}
              onChangeText={text => {
                this.setState({search: text});
              }}
              onSubmitEditing={text => {
                this.setState({search: ''});
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({search: ''});
              }}>
              <Image
                style={styles.btn}
                source={require('../../res/images/search.png')}
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
});
