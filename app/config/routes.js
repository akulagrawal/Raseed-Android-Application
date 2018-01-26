import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import {Splash} from '../sources/splash';
import {Home} from '../sources/home';
import {IntroHome} from '../sources/mainIntro';
import {Pay} from '../sources/pay';
import {Request} from '../sources/request';
import {Passbook} from '../sources/passbook';
import {Profile} from '../sources/profile';
import {Offers} from '../sources/offers';
import {SwitchHome} from '../sources/switchHome';
import {Receipt} from '../sources/receipt';

import { Icon } from 'react-native-elements';

export const ModalStack = StackNavigator({
  Splash:{
  	screen:Splash,
  },
  Home : {
  	screen : Home,
  },
},

	{headerMode:'none'}

);

export const SubModalStack  = StackNavigator({
  SwitchHome : {
  	screen : SwitchHome
  },
  Pay : {
  	screen : Pay,
  },
  Request : {
  	screen : Request,
  },
  Passbook : {
  	screen : Passbook,
  },
  Receipt : {
    screen : Receipt,
  }
},

	{headerMode:'none'}

);

export const Tabs = TabNavigator({
   IntroHome: {
    screen: IntroHome,
    navigationOptions: {
      orientation: 'portrait',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={26} color={tintColor} />    },
  },
  
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={26} color={tintColor} />    },
  },
  Offers: {
    screen: Offers,
    navigationOptions: {
      tabBarLabel: 'Offers',
      tabBarIcon: ({ tintColor }) => <Icon name="local-offer" size={26} color={tintColor} />    },
  },
},
	
{	
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'white',
    showIcon: 'true',
    indicatorStyle: {backgroundColor: '#3366CC'},
    iconStyle: {
      margin:0,
    },
    labelStyle: {
        fontSize: 11,
        margin:1,
      },
     style: {
    backgroundColor: '#21232F',
    height: 50
  },
  },
}

);
