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

export default class CommentLineComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upvote: props.upvote,
      downvote: props.downvote,
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
      <View style={styles.container}>
        <Text style={styles.username}>{this.props.username}</Text>
        <Text style={styles.comment}>{this.props.text}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.date}>{this.props.date}</Text>
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
          </View>
        </View>
      </View>
    );
  }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '98%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#a6a6a6',
  },
  username: {
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
