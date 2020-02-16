import React, { Component } from 'react';
import { Alert, TextInput, Dimensions, StyleSheet, View, Button } from 'react-native';

export default class CommentInputComponent extends Component {

    state = {
        commentText: ""
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} onChangeText={text => this.state.commentText = text}/>
                <Button title="Submit" style={styles.btn} onPress={() => Alert.alert(null, this.state.commentText)} />
            </View>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 35,
        alignSelf: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5
    },
    btn: {
        borderRadius: 10,
    },
    input: {
        width: window.width - 80,
        height: 35,
        borderColor: 'black',
        borderBottomWidth: 1,
        marginRight: 3
    }
});