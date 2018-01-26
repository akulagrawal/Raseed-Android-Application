import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';

const window = Dimensions.get('window');

import {ModalStack} from '../config/routes';

export class MainApp extends Component<{}> {

  render() {
    return <ModalStack />;
  }
}

