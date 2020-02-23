import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';

export default class LocationDetailComponent extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.address}>Address: {this.props.address}</Text> */}
                <Text style={styles.time}>Time: {this.props.time}</Text>
                <Text style={styles.notes}>Description: {this.props.description}</Text>
                <Button title="Comment" style={styles.btn}/>
            </View>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: 250,
        width: window.width,
        backgroundColor: '#FFFFFF3F',
        bottom: 0
    },
    address: {
        flex: 2,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#a6a6a6'
    },
    time: {
        flex: 0.9,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#a6a6a6'
    },
    notes: {
        flex: 5,
        fontSize: 16
    },
    btn: {
        flex: 1,
        borderRadius: 10,
        maxWidth: 1
    }
});