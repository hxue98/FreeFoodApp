import React, { Component } from 'react';
import { Alert, TextInput, Dimensions, StyleSheet, View, Button } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api'
import { createComment } from '../../graphql/mutations'

async function createNewComment(userId, text, date) {
    const comment = {
        userId: '123',
        text: text,
        date: date,
        upvote: 0,
        downvote: 0
    };
    await API.graphql(graphqlOperation(createComment, { input: comment }));
}

export default class CommentInputComponent extends Component {

    state = {
        commentText: ""
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({commentText: text})}
                    value={this.state.commentText}
                    placeholder="Enter Comment"/>
                <Button
                    title="Submit"
                    style={styles.btn}
                    onPress={() => { createNewComment(null, this.state.commentText, Date.now()); this.setState({commentText: ""})}} />
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
        marginBottom: 10,
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