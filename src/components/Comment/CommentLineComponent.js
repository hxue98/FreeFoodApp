import React, {Component} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import API, {graphqlOperation} from '@aws-amplify/api';
import {updateComment} from '../../graphql/mutations';
import store from '../../redux/store';

export default class CommentLineComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upvote: props.upvote,
      downvote: props.downvote,
      isUser: props.username === store.getState().userId,
    };
  }

  updateVote = (upvote, downvote) => {
    const comment = {
      id: this.props.id,
      upvote: upvote,
      downvote: downvote,
    };
    API.graphql(graphqlOperation(updateComment, {input: comment}));
  };

  render() {
    return (
      <View style={{...styles.container, left: !this.state.isUser ? 0 : '26%'}}>
        <Text style={styles.username}>{this.props.username}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.comment}>{this.props.text}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.date}>{this.props.date}</Text>
            {
              !this.state.isUser && (
              <View style={styles.vote}>
                <TouchableOpacity
                  onPress={() => {
                    this.updateVote(this.state.upvote + 1, this.state.downvote);
                    this.setState({upvote: this.state.upvote + 1});
                  }}>
                  <Image
                    style={styles.thumbsUp}
                    source={require('../../res/images/thumbs-up.png')}
                  />
                </TouchableOpacity>
                <Text style={{paddingRight: 5}}> {this.state.upvote}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.updateVote(this.state.upvote, this.state.downvote + 1);
                    this.setState({downvote: this.state.downvote + 1});
                  }}>
                  <Image
                    style={styles.thumbsUp}
                    source={require('../../res/images/thumbs-down.png')}
                  />
                </TouchableOpacity>
                <Text> {this.state.downvote}</Text>
              </View>)
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: '2%',
    width: '70%',
  },
  textContainer: {
    backgroundColor: '#a6a6a655',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  username: {
    marginLeft: 5,
    flex: 0.5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  comment: {
    flex: 3,
    fontSize: 14,
  },
  bottomRow: {
    flex: 0.5,
    marginTop: 5,
    flexDirection: 'row',
  },
  date: {
    fontSize: 13,
    color: '#808080',
  },
  vote: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  thumbsUp: {
    width: 20,
    height: 20,
  },
});
