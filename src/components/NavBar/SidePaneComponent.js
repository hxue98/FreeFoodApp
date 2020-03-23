import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Divider} from 'react-native-elements';
import MenuAccountComponent from './MenuAccountComponent';
import MenuLogoutComponent from './MenuLogoutComponent';
import MenuMyListComponent from './MenuMyListComponent';
import MenuSettingsComponent from './MenuSettingsComponent';

export default class SidePaneComponent extends Component {
  handleViewRef = ref => this.view = ref;

  constructor(props) {
    super(props);

    this.state = {
      onHide: false,
      menu: []
    }
  }

  hide() {
    this.setState({onHide: true});
    this.view.slideInRight(500);
    this.props.hideNav();
    setTimeout(() => this.setState({onHide: false}), 510);
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.show && (
            <Animatable.View
              style={{...styles.navBar, left: !this.state.onHide ? 0 : '-25%'}}
              animation="slideInLeft"
              duration={500}
              ref={this.handleViewRef}>
              <MenuAccountComponent navigation={this.props.navigation}/>
              <Divider style={styles.divider} />
              <MenuMyListComponent navigation={this.props.navigation}/>
              <Divider style={styles.divider} />
              <MenuSettingsComponent navigation={this.props.navigation}/>
              <Divider style={styles.divider} />
              <MenuLogoutComponent navigation={this.props.navigation}/>
            </Animatable.View>
        )}
        {
          this.props.show && (
            <View style={styles.shadow} onStartShouldSetResponder={() => this.hide()}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row'
  },
  navBar: {
    backgroundColor: 'white',
    flex: 4.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 2,
  },
  shadow: {
    flex: 5.5,
    backgroundColor: '#00000000'
  },
  divider: {
    height: 2,
    backgroundColor: '#d8d8d8',
    marginTop: 10,
  },
});