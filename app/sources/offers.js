import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

const window = Dimensions.get('window');

export class Offers extends Component<{}> {

  static navigationOptions = {
    title: 'Offers',
  }

  render() {
    return (
      <View  style={{backgroundColor:'#21232f',height:window.height}}>

        <ScrollView style={{paddingTop:16}}>
          
          <Text style={{color:'white',paddingTop:16,paddingLeft:16,fontSize:25}}>Eat?</Text>
          <ScrollView horizontal={true}
                      style={{paddingTop:16}}>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/15per_for_web.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/dominos-50-off2.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/Chinese-Food-Festival-@-Hotel-Le-Royal-Park.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
          </ScrollView>

          <Text style={{color:'white',paddingTop:16,paddingLeft:16,fontSize:25}}>Travel?</Text>
          <ScrollView horizontal={true}
                      style={{paddingTop:16}}>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/ola_offer_-_ctola_1.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/via.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/1053048696-1053048695_72-hour-sale-jetairways-offer-bannerjpg.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
          </ScrollView>

          <Text style={{color:'white',paddingTop:16,paddingLeft:16,fontSize:25}}>Lazy?</Text>
          <ScrollView horizontal={true}
                      style={{paddingTop:16}}>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/Reliancefresh.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/big-bazaar-double-diwali-offer-oct-18-2014.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/sales_offer_mainpic_20100720122722easyday.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
          </ScrollView>

          <Text style={{color:'white',paddingTop:16,paddingLeft:16,fontSize:25}}>Tech?</Text>
          <ScrollView horizontal={true}
                      style={{paddingTop:16}}>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/2015.01.09-Mini-FA-L1-Microsoft-Now-Offers-Targeted-Advertising-on-MSN-Apps-CH.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/fathers-day-deal-50-inch-smart-tv.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:10,borderRadius:4}}>
              <Image source={require('../../assets/images/apple_macbook_paytm_1487074711007.png')} style={{height:180,width:230}}/>
            </TouchableOpacity>
          </ScrollView>
          <Text style={{paddingTop:80}}> </Text>

        </ScrollView>
      </View>
    );
  }
}
