import React, {Component} from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  View,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Hashes from 'jshashes';
import lambda from '../../api';
import {connect} from 'react-redux';
import {storeUserId} from '../../redux/actions';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'FreeFood App',
        message: 'FreeFood App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      alert('You can use the location');
    } else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

async function login(userId, password) {
  const request = {
    operation: 'LOGIN',
    params: {
      userId: userId,
      password: new Hashes.MD5().b64(password),
    },
  };

  const response = await lambda(request);
  return response;
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  async componentWillMount() {
    await requestLocationPermission();
  }

  checkUserName = function(userId, password) {
    if (userId === '') {
      Alert.alert('Error', 'Username cannot be empty');
      return false;
    } else if (password === '') {
      Alert.alert('Error', 'Password cannot be empty');
      return false;
    }
    return true;
  };

  signin = async function() {
    if (this.checkUserName(this.state.userId, this.state.password)) {
      const res = await login(this.state.userId, this.state.password);
      if (res.success) {
        this.props.navigation.replace('Maps');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../res/images/logo.png')} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => this.setState({userId: text})}
          value={this.props.userId}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          onChangeText={text => this.setState({password: text})}
          value={this.props.password}
        />

        <Button
          title="Login"
          onPress={() => {
            this.signin();
            this.props.storeUserId(this.state.userId);
          }}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    storeUserId: userId => dispatch(storeUserId(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {},
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#a6a6a6',
  },
});
