import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';

import {SubModalStack} from '../config/routes';

const window = Dimensions.get('window');

export class IntroHome extends Component<{}> {

  static navigationOptions = {
    title: 'IntroHome',

  }

  render() {
    return <SubModalStack />;
  }
}

