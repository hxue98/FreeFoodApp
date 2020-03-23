import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Divider} from 'react-native-elements';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.feedbackTextView}>
          <Text>Feedback</Text>
          <Text>0/200</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedbackTextView: {
    flexDirection: 'row',
  },
});
