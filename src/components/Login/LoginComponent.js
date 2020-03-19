import React, {Component} from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight,
} from 'react-native';

import Hashes from 'jshashes';
import lambda from '../../api';
import {connect} from 'react-redux';
import {storeUserId} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

async function login(userId, password) {
  const request = {
    operation: 'LOGIN',
    params: {
      userId: userId,
      password: new Hashes.MD5().b64(password),
    },
  };

  const response = await lambda(request);
  try {
    AsyncStorage.setItem('@token', response.token);
  } catch (e) {
    console.error(e);
  }
  return response;
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  checkUserName = function(userId, password) {
    if (userId === '' || password === '') {
      Alert.alert('Error', 'Fields cannot be empty');
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
        <Image
          style={styles.logo}
          source={require('../../res/images/logo.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => this.setState({userId: text})}
          value={this.state.userId}
        />

        <TextInput
          secureTextEntry={true}
          style={{...styles.input, marginBottom: 50}}
          placeholder="Password"
          onChangeText={text => this.setState({password: text})}
          value={this.props.password}
        />

        <View style={styles.btns}>
          <TouchableHighlight style={styles.btn}>
            <Button
              title="Login"
              onPress={() => {
                this.signin();
                this.props.storeUserId(this.state.userId);
              }}
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Button
              title="Register"
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>APP by Team TRIANGLE</Text>
        </View>
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
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  logo: {
    height: 180,
    width: 180,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#a6a6a6',
    width: '75%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
  },
  btns: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 20,
  },
  btn: {
    width: '35%',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 35,
  },
  footer: {
    flex: 0.1,
    alignSelf: 'center',
  },
  footerText: {
    color: '#a6a6a699',
  },
});
