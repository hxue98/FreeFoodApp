import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Divider} from 'react-native-elements';
import store from '../../redux/store';
import lambda from '../../api';
import EventLineComponent from './EventLineComponent';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export default class MyAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      queryComplete: false,
      eventDetail: null,
    };
  }

  getUserEvents = async () => {
    this.setState({queryComplete: false});
    const request = {
      operation: 'GETUSEREVENTS',
      params: {
        userId: store.getState().userId,
      },
    };
    const response = await lambda(request);

    this.setState({
      events: response.events,
      queryComplete: true,
    });
  };

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

  async componentDidMount() {
    this.getUserEvents();
  }

  render() {
    const component = this.state.queryComplete ? (
      <View>
        <FlatList
          data={this.state.events.sort((a, b) => b.date - a.date)}
          renderItem={({item}) => (
            <EventLineComponent
              address={item.address}
              navigate={this.props.navigation.navigate}
              id={item.eventId}
              eventId={item.eventId}
              description={item.description}
              time={
                new Date(item.startTime).toLocaleTimeString() +
                new Date(item.startTime).toLocaleDateString()
              }
              date={new Date(item.startTime).getDate()}
              month={monthNames[new Date(item.startTime).getMonth()]}
              refresh={this.getUserEvents}
            />
          )}
          style={styles.list}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    ) : (
      <ActivityIndicator size="large" color="#0000ff" />
    );

    return <View style={styles.container}>{component}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 3,
    marginBottom: 3,
  },
  list: {
    flex: 8,
  },
  input: {
    flex: 1,
  },
});
