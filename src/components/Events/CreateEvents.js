import React, {Component} from 'react';
import {
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import API, {graphqlOperation} from '@aws-amplify/api';
import {createEvent} from '../../graphql/mutations';
import Geolocation from 'react-native-geolocation-service';

async function createNewEvents(posterId, text, latitude, longitude) {
  if (text == '') {
    return;
  }
  const event = {
    eventId: 0,
    posterId: posterId,
    description: text,
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 1,
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
        {/* <TextInput
          style={styles.input}
          placeholder="Food"
          underlineColorAndroid={'transparent'}
          //   onChangeText={text => this.setState({user: text})}
          //   value={this.state.user}
        /> */}

        <TextInput
          style={{
            height: 200,
            width: 300,
            marginTop: 4,
            borderWidth: 1,
            borderColor: '#a6a6a6',
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

              setTimeout(() => {
                this.props.navigation.replace('Maps');
              }, 300),
            );
          }}>
          <Image
            style={{alignSelf: 'center', marginTop: 80, height: 50, width: 60}}
            source={require('../../res/images/deliver-food-40.png')}
          />
        </TouchableOpacity>
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
  //   input: {
  //     height: 40,
  //     width: 300,
  //     marginBottom: 4,
  //     marginTop: 4,
  //     borderWidth: 1,
  //     borderColor: '#a6a6a6',
  //   },
});
