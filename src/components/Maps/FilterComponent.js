import React, {Component} from 'react';
import {Image, StyleSheet, View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Divider} from 'react-native-elements';

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: this.props.filter,
      isVisible: false,
      isEndVisible: false,
      chosenStartDate: moment(this.props.filter.startTime).format('MM/DD HH:mm'),
      chosenEndDate: moment(this.props.filter.endTime).format('MM/DD HH:mm'),
    }
  }

  applyFilter = () => {
    if (!Number(this.state.filter.distanceRange)) {
      this.resetFilter();
      return;
    }
    this.state.filter.distanceRange = Number(this.state.filter.distanceRange);
    this.props.onApplyFilter(this.state.filter);
  }

  resetFilter = () => {
    const filter = {
      distanceRange: 10,
      startTime: Date.now(),
      endTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
      keyword: ''
    };
    this.props.onApplyFilter(filter);
  }

  startPicker = datetime => {
    this.setState({
      isVisible: false,
      chosenStartDate: moment(datetime).format('MM/DD HH:mm'),
      filter: {
        ...this.state.filter,
        startTime: datetime.getTime(),
      },
    });
  };

  showStartPicker = () => {
    this.setState({
      isVisible: true,
    });
  };

  hideStartPicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  endPicker = datetime => {
    this.setState({
      isEndVisible: false,
      chosenEndDate: moment(datetime).format('MM/DD HH:mm'),
      filter: {
        ...this.state.filter,
        endTime: datetime.getTime()
      },
    });
  };

  showEndPicker = () => {
    this.setState({
      isEndVisible: true,
    });
  };

  hideEndPicker = () => {
    this.setState({
      isEndVisible: false,
    });
  };

  render() {
    return (
      <Animatable.View
        style={styles.filterContainer}
        animation="fadeIn"
        duration={300}>
        <Image
          style={styles.filterTriangle}
          source={require('../../res/images/filter-triangle.png')}>
        </Image>
        <View style={styles.filter}>

          <View>
            <Text style={styles.titleText}>
              Filter Options
            </Text>
          </View>

          <Divider style={styles.divider}/>

          <View style={styles.horizontalView}>
            <Text style={styles.label}>
              Date From
            </Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={this.showStartPicker}>
              <DateTimePickerModal
                isVisible={this.state.isVisible}
                onConfirm={this.startPicker}
                onCancel={this.hideStartPicker}
                mode="datetime"
                is24Hour={false}
              />
              <Text style={styles.text}>
                {this.state.chosenStartDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', alignSelf: 'center', marginLeft: 66}}>
            <Text style={styles.label}>
              To
            </Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={this.showEndPicker}>
              <DateTimePickerModal
                isVisible={this.state.isEndVisible}
                onConfirm={this.endPicker}
                onCancel={this.hideEndPicker}
                mode="datetime"
                is24Hour={false}
              />
              <Text style={styles.text}>
                {this.state.chosenEndDate}
              </Text>
            </TouchableOpacity>
          </View>

          <Divider style={styles.divider}/>

          <View style={styles.horizontalView}>
            <Text style={styles.label}>
                Distance within
            </Text>
            <TextInput
              style={styles.input}
              value={this.state.filter.distanceRange.toString()}
              maxLength={3}
              onChangeText={(text) => this.setState({filter: {...this.state.filter, distanceRange: text}})}/>
            <Text style={styles.label}>
                miles
            </Text>
          </View>

          <Divider style={styles.divider}/>

          <View style={styles.horizontalView}>
            <Text style={styles.label}>
                Keyword
            </Text>
            <TextInput
              style={styles.keywordInput}
              value={this.state.filter.keyword}
              maxLength={15}
              onChangeText={(text) => this.setState({filter: {...this.state.filter, keyword: text}})}/>
          </View>

          <Divider style={styles.divider}/>

          <View style={styles.horizontalView}>
            <TouchableOpacity
            style={styles.btn}
            >
              <Button
                title='Apply'
                onPress={() => {this.applyFilter(); this.props.toggle();}}
              />
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.btn}
            >
              <Button
                title='Reset'
                onPress={() => {this.resetFilter(); this.props.toggle();}}
              />
            </TouchableOpacity>
          </View>

        </View>
      </Animatable.View>
    );
  }
}


const styles = StyleSheet.create({
  filterContainer: {
    position: 'absolute',
    top: -10,
    right: 20
  },
  filterTriangle: {
    width: 50,
    height: 50,
    right: -220,
  },
  filter: {
    width: 300,
    height: 265,
    marginTop: -18,
    backgroundColor: 'white',
    borderRadius: 10
  },
  horizontalView: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#139af2'
  },
  datePicker: {
    height: 25,
    marginTop: '3%',
    marginHorizontal: '3%',
    backgroundColor: '#139af2',
    paddingHorizontal: 3,
    borderRadius: 5
  },
  label: {
    marginTop: '3%',
    marginHorizontal: '3%',
    fontSize: 18
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  input: {
    height: 40,
    fontSize: 18,
    paddingVertical: 0,
    width: 38,
    color: '#139af2',
    maxWidth: 38,
    borderBottomWidth: 1,
    borderColor: '#139af2',
    textAlign: 'center'
  },
  keywordInput: {
    height: 40,
    fontSize: 18,
    paddingVertical: 0,
    width: 150,
    color: '#139af2',
    maxWidth: 150,
    borderBottomWidth: 1,
    borderColor: '#139af2'
  },
  btn: {
    marginTop: 5,
    marginHorizontal: '5%',
    width: 100
  },
  divider: {
    height: 2,
    backgroundColor: '#d8d8d8',
    marginTop: 10,
  },
});