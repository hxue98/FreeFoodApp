import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listComments } from '../../graphql/queries';

import CommentInputComponent from './CommentInputComponent';
import CommentLineComponent from './CommentLineComponent';

//TODO replace eventId
export default class CommentComponent extends Component {
    constructor(props) {

        super(props);

        this.state = {
            data: [],
            queryComplete: false
        };
    }

    getComments = async () => {
        const comments = await API.graphql(graphqlOperation(listComments));
        this.setState({ data: comments.data.listComments.items, queryComplete: true });
    }

    refreshComments = async () => {
        this.setState({ queryComplete: false });
        setTimeout( () => {
            this.getComments();
        }, 300);
    }

    componentDidMount() {
        this.getComments();
    }

    render () {
        const component = this.state.queryComplete ?
            <View>
                <FlatList
                    data={this.state.data.sort((a, b) => b.date - a.date)}
                    //TODO replace userId with username
                    renderItem={({item}) => (
                        <View>
                            <CommentLineComponent
                                id = {item.id}
                                eventId = {item.eventId}
                                username={item.userId}
                                text={item.text}
                                date={new Date(item.date).toLocaleTimeString() + ' ' + new Date(item.date).toLocaleDateString()}
                                upvote={item.upvote}
                                downvote={item.downvote}
                                refreshComments={this.refreshComments}
                            />
                        </View>
                    )}
                    style={styles.list}
                    scrollEnabled={true}
                />
                <CommentInputComponent refreshComments={this.refreshComments} style={styles.input}/>
            </View>
            : <ActivityIndicator size="large" color="#0000ff" />

        return (
            <View style={styles.container}>
                {component}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 3,
        marginBottom: 3
    },
    list: {
        flex: 8
    },
    input: {
        flex: 1
    }
});