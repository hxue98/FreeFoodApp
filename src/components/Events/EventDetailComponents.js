import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import store from '../../redux/store';
import lambda from '../../api';

export default class EventDetailComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryComplete: false,
    };
  }

  deleteEvent = async () => {
    this.setState({queryComplete: false});
    const request = {
      operation: 'DELETEEVENT',
      params: {
        eventId: this.props.route.params.eventId,
      },
    };
    await lambda(request);
    this.setState({
      queryComplete: true,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.userImage}
            source={require('../../res/images/user-64.png')}
          />
        </View>
        <View style={styles.detailView}>
          <Text style={styles.userNameText}>{store.getState().userId}</Text>
          <Text style={styles.addressText}>
            {this.props.route.params.address}
          </Text>
          <Text style={styles.description}>
            {this.props.route.params.description}
          </Text>
          <View style={styles.timeView}>
            <Text style={styles.date}>{this.props.route.params.time}</Text>
            <TouchableOpacity
              onPress={async () => {
                Alert.alert('action', 'Confirm deletion?', [
                  {text: 'Cancel'},
                  {
                    text: 'Delete',
                    onPress: async () => {
                      this.deleteEvent();
                      this.props.navigation.goBack();
                      this.props.route.params.refresh();
                    },
                  },
                ]);
              }}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#a6a6a6',
  },
  userImage: {
    marginLeft: 5,
  },
  userNameText: {
    color: 'blue',
    fontWeight: '400',
    fontSize: 18,
  },
  detailView: {
    height: 200,
    marginTop: 7,
    marginLeft: 10,
  },
  addressText: {
    marginTop: 5,
    width: 350,
    fontSize: 15,
    fontWeight: '300',
  },
  timeView: {
    width: '100%',
    height: 55,
    marginLeft: 2,
    flexDirection: 'row',
  },
  date: {
    marginTop: 8,
    color: '#b3b3b3',
  },
  delete: {
    marginTop: 8,
    marginLeft: 50,
    color: 'blue',
  },
  description: {
    fontSize: 17,
    marginTop: 5,
  },
});
