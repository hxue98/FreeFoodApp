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
import {CheckBox} from 'native-base';
import store from '../../redux/store';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }
  handleCheck() {
    if (this.state.check) {
      this.setState({check: !this.state.check});
    } else {
      this.setState({check: !this.state.check});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.touchableView}>
          <View style={styles.textView}>
            <Text style={styles.iconText}>Message Notifications</Text>
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              checked={this.state.check}
              onPress={() => this.handleCheck()}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        <TouchableOpacity
          style={styles.touchableView}
          onPress={() => {
            this.props.navigation.navigate('Feedback');
          }}>
          <View style={styles.textView}>
            <Text style={styles.iconText}>Help Feedback</Text>
          </View>

          <View style={styles.iconArrow}>
            <Image
              style={styles.iconImage}
              source={require('../../res/images/circled-right-64.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: window.height,
    width: window.width,
  },
  touchableView: {
    flexDirection: 'row',
    height: 45,
  },
  textView: {
    flex: 9,
    width: 50,
  },

  iconImage: {
    width: 30,
    height: 30,
  },
  iconText: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 25,
    fontSize: 16,
  },
  iconArrow: {
    width: 5,
    height: 5,
    marginTop: 15,
    flex: 1,
  },
  checkBoxView: {
    width: 5,
    height: 5,
    marginTop: 20,
    marginLeft: 150,
    flex: 2,
  },
  divider: {
    height: 2,
    backgroundColor: '#d8d8d8',
    marginTop: 20,
  },
});
