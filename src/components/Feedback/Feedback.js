import React, {Component} from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  Alert,
} from 'react-native';
import API, {graphqlOperation} from '@aws-amplify/api';
import {createFeedback} from '../../graphql/mutations';
import store from '../../redux/store';

async function createNewFeedback(feedback, contact) {
  const fb = {
    userId: store.getState().userId,
    feedback: feedback,
    contact: contact,
  };
  await API.graphql(graphqlOperation(createFeedback, {input: fb}));
  return true;
}

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      contact: '',
    };
  }

  checkInput(feedback) {
    if (feedback === '') {
      Alert.alert('Error', 'feedBack cannot be empty');
      return false;
    }
    return true;
  }

  async confirmed() {
    if (this.checkInput(this.state.feedback)) {
      const res = await createNewFeedback(
        this.state.feedback,
        this.state.contact === '' ? 'No Contact' : this.state.contact,
      ).catch(err => console.error(err));
      if (res) {
        this.props.navigation.goBack();
      } else {
        Alert.alert('Error', 'Invalid Feedback');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.feedbackTextView}>
          <Text style={{marginLeft: 20, fontSize: 18}}>Feedback</Text>
          <Text style={{marginLeft: 250, fontSize: 18}}>
            {this.state.feedback.length + '/200'}
          </Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            maxLength={200}
            placeholder="Describe your issue using at least 10 
            characters so that we can help troubleshoot your issue more quickly"
            onChangeText={text => this.setState({feedback: text})}
            value={this.state.feedback}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{marginLeft: 20, fontSize: 18}}>Contact</Text>
        </View>
        <View style={styles.contactView}>
          <TextInput
            style={styles.textInput}
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            placeholder="*Optional Mobile or Email"
            onChangeText={text => this.setState({contact: text})}
            value={this.state.contact}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Button
            title="Submit"
            onPress={() => {
              this.confirmed();
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 25,
  },
  feedbackTextView: {
    flexDirection: 'row',
  },
  textInputView: {
    height: 95,
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 6,
  },
  textInput: {
    width: '95%',
    fontSize: 17,
    alignSelf: 'center',
  },
  btn: {
    marginTop: 35,
    width: 150,
    marginLeft: 130,
    borderRadius: 35,
  },
  contactView: {
    width: '95%',
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
