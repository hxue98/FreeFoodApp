import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import lambda from '../../api';

import CommentInputComponent from './CommentInputComponent';
import CommentLineComponent from './CommentLineComponent';

//TODO replace eventId
export default class CommentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      queryComplete: false,
    };
  }

  getComments = async eventId => {
    const request = {
      operation: 'GETCOMMENTS',
      params: {
        eventId: eventId,
      },
    };

    const response = await lambda(request);
    this.setState({
      data: response.comments,
      queryComplete: true,
    });
  };

  refreshComments = async () => {
    this.setState({queryComplete: false});
    setTimeout(() => {
      this.getComments(this.props.route.params.eventId);
    }, 300);
  };

  componentDidMount() {
    this.getComments(this.props.route.params.eventId);
  }

  render() {
    const component = this.state.queryComplete ? (
      <View>
        <FlatList
          data={this.state.data.sort((a, b) => b.date - a.date)}
          renderItem={({item}) => (
            <View>
              <CommentLineComponent
                id={item.id}
                eventId={item.eventId}
                username={item.userId}
                text={item.text}
                date={
                  new Date(item.date).toLocaleTimeString() +
                  ' ' +
                  new Date(item.date).toLocaleDateString()
                }
                upvote={item.upvote}
                downvote={item.downvote}
              />
            </View>
          )}
          style={styles.list}
          scrollEnabled={true}
        />
        <CommentInputComponent
          eventId={this.props.route.params.eventId}
          refreshComments={this.refreshComments}
          style={styles.input}
        />
      </View>
    ) : (
      <ActivityIndicator size="large" color="#0000ff" />
    );

    return <View style={styles.container}>{component}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 3,
    marginBottom: 3,
  },
  list: {
    flex: 8,
  },
  input: {
    flex: 1,
  },
});
