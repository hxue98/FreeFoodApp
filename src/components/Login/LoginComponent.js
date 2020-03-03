import React, {Component} from 'react';
import {TextInput, Image, StyleSheet, View, Button, Alert} from 'react-native';
import Hashes from 'jshashes';
import lambda from '../../api';

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

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
    };
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

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../res/images/logo.png')} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => this.setState({userId: text})}
          value={this.state.userId}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          onChangeText={text => this.setState({password: text})}
          value={this.state.password}
        />

        <Button
          title="Login"
          onPress={async () => {
            if (this.checkUserName(this.state.userId, this.state.password)) {
              const res = await login(this.state.userId, this.state.password);
              if (res.success) {
                this.props.navigation.replace('Maps', {
                  userId: this.state.userId,
                });
              } else {
                Alert.alert('Error', 'Invalid username or password');
              }
            }
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
