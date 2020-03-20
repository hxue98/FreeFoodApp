import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Divider} from 'react-native-elements';
import store from '../../redux/store';

export default class MyAccountComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageAndUserNameView}>
          <Image
            style={styles.userImage}
            source={require('../../res/images/user-64.png')}
          />
          <Text style={styles.userNameText}>{store.getState().userId}</Text>
        </View>
        <Divider style={styles.divider} />

        <TouchableOpacity
          style={styles.imageAndUserNameView}
          onPress={() => this.props.navigation.navigate('MyEvents')}>
          <Image
            style={styles.iconImage}
            source={require('../../res/images/list-64.png')}
          />
          <Text style={styles.iconText}>My Lists</Text>
          <Image
            style={styles.iconArrow}
            source={require('../../res/images/circled-right-64.png')}
          />
        </TouchableOpacity>

        <Divider style={styles.divider} />

        <TouchableOpacity
          style={styles.imageAndUserNameView}
          onPress={() => this.props.navigation.navigate('Settings')}>
          <Image
            style={styles.iconImage}
            source={require('../../res/images/settings-64.png')}
          />
          <Text style={styles.iconText}>Settings</Text>
          <Image
            style={styles.iconArrow}
            source={require('../../res/images/circled-right-64.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: window.height,
    width: window.width,
  },
  imageAndUserNameView: {
    flexDirection: 'row',
  },
  userImage: {
    marginLeft: 20,
    marginTop: 50,
    marginRight: 20,
  },
  userNameText: {
    marginTop: 55,
    marginRight: 20,
    fontSize: 20,
  },

  iconImage: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },
  iconText: {
    marginTop: 25,
    marginRight: 20,
    fontSize: 15,
  },
  iconArrow: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginLeft: 230,
  },
  divider: {
    height: 2,
    backgroundColor: '#d8d8d8',
    marginTop: 20,
  },
});
