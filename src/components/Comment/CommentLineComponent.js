import React, { Component } from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';

export default class CommentLineComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            upvote: props.upvote,
            downvote: props.downvote
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.username}>{this.props.username}</Text>
                <Text style={styles.comment}>{this.props.text}</Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.date}>{this.props.date}</Text>
                    <Text style={styles.vote}>{this.state.upvote} : {this.state.downvote}</Text>
                </View>
            </View>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: 180,
        width: window.width,
        borderBottomWidth: 1,
        borderColor: '#a6a6a6'
    },
    username: {
        flex: 0.5,
        fontWeight: 'bold',
        fontSize: 15
    },
    comment: {
        flex: 3,
        fontSize: 13
    },
    bottomRow: {
        flex: 0.5,
        flexDirection: 'row'
    },
    date: {
        fontSize: 13,
        color: '#808080'
    },
    vote: {
        marginLeft: 'auto'
    }
});