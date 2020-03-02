import React, { Component } from 'react';
import { TextInput, Image, StyleSheet, View, Button, Alert } from 'react-native';
import Hashes from 'jshashes';
import lambda from '../../api';

async function register(userId, password) {
    const request = {
        operation: 'REGISTER',
        params: {
            userId: userId,
            password: new Hashes.MD5().b64(password)
        }
    };

    const response = await lambda(request);
    return response;
}

export default class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: ''
        };
    }

    checkUserName = function (userId, password) {
        if (userId === ''){
            Alert.alert(
                'Error',
                'userId name cannot be empty'
            )
            return false;
        }
        else if (password === ''){
            Alert.alert(
                'Error',
                'Password name cannot be empty'
            )
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={styles.container}>

            <Image
                source={require('../../res/images/logo.png')}/>

            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => this.setState({userId: text})}
                value={this.state.userId}/>

            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}/>

            <Button title='Register' onPress={ async () => {
                if (this.checkUserName(this.state.userId, this.state.password)){
                    const res = await register(this.state.userId, this.state.password);
                    if (res.success) {
                        this.props.navigation.replace('Maps');
                    } else {
                        Alert.alert(
                            'Error',
                            'Username is taken'
                        );
                    }
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