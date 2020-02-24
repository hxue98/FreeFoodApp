import React, { Component } from 'react';
import { TextInput, Dimensions, StyleSheet, View, Button } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api';
import { createComment } from '../../graphql/mutations';

//TODO - replace hardcoded eventId/userId
async function createNewComment(userId, eventId, text, date) {
    if (text == "") {
        return;
    }
    const comment = {
        eventId: '123',
        userId: '123',
        text: text,
        date: date,
        upvote: 0,
        downvote: 0
    };
    await API.graphql(graphqlOperation(createComment, { input: comment }));
}

export default class CommentInputComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commentText: ""
        };
    }

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
                    onPress={() => { createNewComment(null, null, this.state.commentText, Date.now()); this.setState({commentText: ""}); this.props.refreshComments();}} />
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
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#a6a6a6',
        marginRight: 3
    }
});