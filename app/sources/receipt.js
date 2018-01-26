import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';

import {GetTokenDetails} from '../actions/api';

const window = Dimensions.get('window');

export class Receipt extends Component<{}> {

  constructor(props){
    super(props);
    this.state={
      'token' : this.props.navigation.state.params.tokenObj.token,
      'date' : this.props.navigation.state.params.tokenObj.dateAndTime,
      'amount' : '',
      'merchantName' : '',
    }

    this._buildReceipt = this._buildReceipt.bind(this);
    this._getTokenDetails();
  }


  _getTokenDetails(){
    let temp = GetTokenDetails(this.state.token).then(responseObj => this._buildReceipt(responseObj)).catch();
  }


  _buildReceipt(responseObj){
    const dateAndTime = String(new Date(responseObj.creationTimeStamp));
    this.setState({
      'amount' : responseObj.amount,
      'merchantName' : responseObj.merchantName,
    });
  }

static navigationOptions = {
    title: 'Receipt',
    
  }

  render() {
    return (
      <View style={{backgroundColor:'#21232F',height:window.height}}>
        <View style={{alignItems:'center',paddingTop:10}}>
          <Text style={{fontSize:24,color:'white',fontFamily: 'Montserrat-Regular'}}>RECEIPT</Text>
        </View>

        <View style={{paddingTop:10,backgroundColor:'#1EB774',margin:20,borderRadius:4,alignItems:'center',marginTop:60}}>

            <Text style={{color:'white',fontSize:16,paddingTop:0,fontFamily: 'Montserrat-Regular'}}>TRANSACTION SUCCESSFULL</Text>

            <Text style={{color:'#333',paddingTop:5,fontSize:18,fontFamily: 'Montserrat-Regular'}}>{this.state.merchantName}</Text>

            <Text style={{color:'#333',paddingTop:5,fontSize:14,fontFamily: 'Montserrat-Regular'}}>{this.state.date}</Text>

            <Text style={{color:'#333',paddingTop:25,fontSize:18,paddingBottom:20,fontFamily: 'Montserrat-Regular'}}>Paid Using Debit Card</Text>

            <View style={{flex:1,backgroundColor:'#E94C3D',paddingTop:10,paddingBottom:50,width:window.width-40,alignItems:'center',borderRadius:4}}>
                <Text style={{color:'white',paddingTop:0,fontSize:28,fontFamily: 'Montserrat-Regular'}}>Rs. {this.state.amount}</Text>
            </View>
          
        </View>

        <View style={{paddingTop:10,alignItems:'center'}}>
          <Text style={{fontFamily: 'Montserrat-Regular',fontSize:14,color:'white'}}>In Collaboration with Raseed Inc</Text>
        </View>

      </View>
    );
  }
}

