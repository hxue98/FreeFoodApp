import React, { useEffect, useReducer, Component } from 'react'
import { View, FlatList, Text } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api'
import { listComments } from '../../graphql/queries';

import CommentInputComponent from './CommentInputComponent';

// TODO
async function getComments() {
    const comments = await API.graphql(graphqlOperation(listComments));
    dispatch({type:'QUERY', comments: comments.data.listComments.items});
}

class CommentComponent extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    id: 123456,
                    text: 1
                },
                {
                    id: 1234562,
                    text: 2
                }
            ]
        };
      }

    render () {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => <Item text={item.text} />}
                />
                <CommentInputComponent />
            </View>
        );
    }
}

function Item({ text }) {
    return (
      <View>
        <Text>{text}</Text>
      </View>
    );
}

export default CommentComponent;
