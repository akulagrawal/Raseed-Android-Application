import React, { Component } from 'react';
import { 
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  WebView,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import { Icon, Tile, Button, List, ListItem } from 'react-native-elements';

import {AuthLogin} from '../actions/api';

const window = Dimensions.get('window');

export class Profile extends Component<{}> {

  static navigationOptions = {
    title: 'Receipt', 
  }
  

  constructor(props){
    super(props);
    this.state={
      userMobile : '',
      credit : '',
      debit : '',
      rewards : '',
      userID : '',
      userName : 'Shashwat',
      refreshRewardsIntervalID : '',
    }

    this.setUserMobile = this.setUserMobile.bind(this);
  }

  componentWillMount(){
    this.getUserMobile();
  }

  async getUserMobile(){

    const value = await AsyncStorage.getItem('userMobile').then(userMobile => this.setUserMobile(userMobile)).catch();

  }


  setUserMobile(userMobile){
    this.setState({
      userMobile : String(userMobile),
    }); 

    this.state.refreshRewardsIntervalID =  setInterval(() => {this._callBalanceAPI()},1000);

}

  
  _callBalanceAPI(){
    let temp = AuthLogin(this.state.userMobile).then(responseObj => this._setBalance(responseObj)).catch();
  }

  _setBalance(responseObj){
    this.setState({
      credit : responseObj.credit,
      debit : responseObj.debit,
      rewards : parseInt(responseObj.rewards),
    });
  }


  render() {

    let userMob = '' + this.state.userMobile;
    return (

    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', backgroundColor: '#21232F', elevation: 10.0}}>
        <Tile
          containerStyle={{width: "100%"}}
          imageContainerStyle={{ width: "100%"}}
          imageSrc={require('../../assets/images/user.png')}
          featured
          title='Raseed User'
          caption='user'
          activeOpacity={1}
        />
        
        <List
        containerStyle={{ borderRadius: 4, alignSelf: 'center', justifyContent: 'center', width: '90%' }} >
          <ListItem
            title="Email"
            leftIcon={{name: "email"}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            rightTitle='raseeduser@raseed.com'
            rightTitleStyle={{marginLeft: -50, color: 'black'}}
            hideChevron
          />
          <ListItem
            title="Phone"
            containerStyle={{borderBottomWidth: 0}}
            leftIcon={{name: "phone"}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            badge={{ value: <Text>{this.state.userMobile}</Text>, textStyle: { color: '#ffffff' }, containerStyle: { marginLeft: -50, backgroundColor: '#21232F' } }}
            hideChevron
          />
        </List>

        <List
          containerStyle={{ borderRadius: 4, alignSelf: 'center', justifyContent: 'center', width: '90%' }} >
          <ListItem
            containerStyle={{borderBottomWidth: 0}}
            title="Username"
            leftIcon={{name: "account-box"}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            rightTitle='user'
            rightTitleStyle={{color: 'black'}}
            hideChevron
          />
        </List>

        <List
          containerStyle={{ borderRadius: 4, alignSelf: 'center', justifyContent: 'center', width: '90%' }} >
          <ListItem
            title="Gender"
            leftIcon={{type: 'font-awesome', name: 'venus-mars'}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            rightTitle='Male'
            rightTitleStyle={{color: 'black'}}
            hideChevron
          />
          <ListItem
            title="Birthday"
            leftIcon={{type: 'font-awesome', name: "birthday-cake"}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            rightTitle='20/10/2017'
            rightTitleStyle={{color: 'black'}}
            hideChevron
          />
          <ListItem
            containerStyle={{borderBottomWidth: 0}}
            title="City"
            leftIcon={{type: 'material-community', name: 'city'}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            rightTitle='Guwahati'
            rightTitleStyle={{marginLeft: -50, color: 'black'}}
            hideChevron
          />
        </List>
        <List
        containerStyle={{ borderRadius: 4, alignSelf: 'center', justifyContent: 'center', width: '90%' }} >
          <ListItem
            title="Spendings"
            leftIcon={{type: 'material-community', name: "plus-circle-outline"}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            badge={{ value: <Text>{this.state.debit}</Text>, textStyle: { color: '#ffffff' }, containerStyle: { marginLeft: -50, backgroundColor: '#21232F' } }}
            hideChevron
          />
          <ListItem
            title="Earnings"
            leftIcon={{type: 'material-community', name: "minus-circle-outline"}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            badge={{ value: <Text>{this.state.credit}</Text>, textStyle: { color: '#ffffff' }, containerStyle: { marginLeft: -50, backgroundColor: '#21232F' } }}            
            hideChevron
          />
          <ListItem
            title="Rewards"
            containerStyle={{borderBottomWidth: 0}}
            leftIcon={{type: 'entypo', name: "wallet"}}
            titleStyle={{color: '#21232F', fontWeight: 'bold'}}
            badge={{ value: <Text>{this.state.rewards}</Text>, textStyle: { color: '#ffffff' }, containerStyle: { marginLeft: -50, backgroundColor: '#21232F' } }}
            hideChevron
          />
        </List>

        <Button
          title="Log out"
          icon={{type: 'material-community', name: 'logout'}}
          buttonStyle={{ borderRadius: 10, alignSelf: 'center', width: '50%', backgroundColor: 'red', marginTop: 20 }}
        />
        <Text />
      </ScrollView>
      </View>
    );
  }
}

