import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';

import {Tabs} from '../config/routes';

const window = Dimensions.get('window');

export class Home extends Component<{}> {

  static navigationOptions = {
    title: 'Home',

  }

  render() {
    return <Tabs />;
  }
}

