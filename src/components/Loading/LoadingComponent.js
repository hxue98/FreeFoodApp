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

class LoadingComponent extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        this.checkToken(token);
      } catch (e) {
        console.error(e);
      }
    }, 3000);
  }

  checkToken = async function(token) {
    const request = {
      operation: 'CHECKTOKEN',
      params: {
        token: token,
      },
    };

    const response = await lambda(request);
    if (response.success) {
      this.props.storeUserId(response.userId);
      this.props.navigation.replace('Maps');
    } else {
      this.props.navigation.replace('Login');
    }
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
            marginTop: 250,
          }}
          source={require('../../res/images/team-logo.png')}
        />
        <Image
          style={{
            width: 200,
            height: 50,
            alignSelf: 'center',
            position: 'absolute',
            bottom: '10%',
          }}
          source={require('../../res/images/team-name.png')}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent);
