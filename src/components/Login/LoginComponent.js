import React, { Component } from 'react';
import { TextInput, Image, Dimensions, StyleSheet, View, Button, Alert} from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api';
import {getAccount} from '../../graphql/queries'

export default class LoginComponent extends Component {
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
                'Error',
                'User name cannot be empty'
            )
            return false;
        }
        else if(password === ''){
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
                    source={require('../../res/images/logo.png')}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => this.setState({user: text})}
                    value={this.state.user}/>
            
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}/>

                <Button title='Login' onPress={ async () => {
                if(this.checkUserName(this.state.user, this.state.password)){
                    const acc = await API.graphql(graphqlOperation(getAccount, { userId: this.state.user }));
                    if (acc.data.getAccount.password === this.state.password) {
                        this.props.navigation.navigate('Maps');
                    } else {Alert.alert('Error', 'Wrong password')}
                }
            }}/>
                <Button title='Register' onPress={() => this.props.navigation.navigate('Register')}/>
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
    image: {
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#a6a6a6'
    }
  });