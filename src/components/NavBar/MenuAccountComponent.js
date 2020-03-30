import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import store from '../../redux/store';

export default class MenuAccountComponent extends Component {
  constructor(props) {
    super(props);

    var userId = store.getState().userId;
    if (userId.length > 7) {
      userId = userId.substring(0, 7) + '...';
    }
    this.state = {
      userId: userId,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageAndUserNameView}
          onPress={() => {this.props.navigation.navigate('MyAccount'); this.props.onNavigate();}}>
          <Image
            style={styles.userImage}
            source={require('../../res/images/user-64.png')}
          />
          <Text style={styles.userNameText}>{this.state.userId}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  imageAndUserNameView: {
    flexDirection: 'row',
  },
  userImage: {
    marginLeft: 10,
  },
  userNameText: {
    marginLeft: 10,
    alignSelf: 'center',
    fontSize: 18,
  },
});
