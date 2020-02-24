import React, { Component } from 'react';
import { TextInput, Dimensions, StyleSheet, View, Button, Alert } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api';
import {createAccount} from '../../graphql/mutations'

export default class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
    }

    checkUserName = function (user, password) {
        if(user === ''){
            Alert.alert(
                'Title',
                'Descibtion'
            )
            return false;
        }
        else if(password === ''){
            Alert.alert(
                'Title',
                'Descibtion'
            )
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => this.setState({user: text})}
                value={this.state.user}/>
        
            <TextInput 
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}/>

            <Button title='Register' onPress={ () => {
                if(this.checkUserName(this.state.user, this.state.password)){
                    API.graphql(graphqlOperation(createAccount, { input: {userId: this.state.user, password: this.state.password} }));
                    this.props.navigation.navigate('Maps');
                }
            }}/>
            <Button title='Return to Login' onPress={() => this.props.navigation.navigate('Login')}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#a6a6a6'
    }
  });