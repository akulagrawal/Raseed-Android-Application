import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  AsyncStorage,
  Alert,
  Image
} from 'react-native';

import {RequestTransaction,TransactionStatus} from '../actions/api.js';

const window = Dimensions.get('window');

export class Request extends Component<{}> {
 constructor(props){
    super(props);
    this.state={
          mobile : '',
          userMobile : '',
          amount : '',
          requested : false,
          token : '',
          paymentDone : false,
    }
    this.requestPaymentInitiate = this.requestPaymentInitiate.bind(this);
    this.paymentDoneUpdate = this.paymentDoneUpdate.bind(this);
    this.setUserMobile = this.setUserMobile.bind(this);
    this._startFresh = this._startFresh.bind(this);
    this.refreshIntervalId = '';
  }

  componentWillMount(){
    this.getUserMobile();
  }

  async getUserMobile(){
    const value = await AsyncStorage.getItem('userMobile').then(userMobile => this.setUserMobile(userMobile)).catch();
  }

  setUserMobile(userMobile){
    this.setState({
      userMobile : userMobile,
    });
  }

  requestPaymentInitiateApiCall(){
    console.log(this.state.mobile);
    if(this.state.mobile != this.state.userMobile){
      let temp = RequestTransaction(this.state.mobile,this.state.amount,this.state.userMobile).then(responseObj => this.requestPaymentInitiate(responseObj)).catch();
    }else{
      Alert.alert(
                  'Oops...',
                  'It seems you are asking yourself for payment',
                )
    }
  }

  requestPaymentInitiate(responseObj){

    this.setState({
      requested : true,
      token : responseObj.token,
    });

    if(!this.state.paymentDone){
      this.refreshIntervalId =  setInterval(() => {this.paymentStatusApiCall()},100);
    }
  }

  paymentStatusApiCall(){
    let temp = TransactionStatus(this.state.token).then(responseObj => this.paymentDoneUpdate(responseObj)).catch();
  }

  paymentDoneUpdate(responseObj){
    console.log(responseObj.isPaid);
    if(responseObj.isPaid){
      clearInterval(this.refreshIntervalId);
    this.setState({
      paymentDone : true,
    });
   }
  }

  _startFresh(){
    this.setState({
          mobile : '',
          amount : '',
          requested : false,
          token : '',
          paymentDone : false,
    });
  }


  static navigationOptions = {
    title: 'Request',
    
  }

  render() {
    return (
      <View style={{backgroundColor:'#21232F',height:window.height,alignItems:'center'}}>
        <Text style={{color:'white',paddingTop:10,fontSize:24,fontFamily: 'Montserrat-Regular'}}>REQUEST</Text>

      {!this.state.requested &&
        <View style={{alignItems:'center'}}>

          <TextInput
              underlineColorAndroid='transparent'
              placeholderTextColor='white'
              tintColor={'#633ea5'}
              style={{height: 50,fontSize:20 ,borderColor: 'white', borderWidth: 1,width:window.width-120,borderRadius:40,top:100,fontFamily: 'Montserrat-Regular',color:'white',textAlign:'center'}}
              onChangeText={(mobile) => this.setState({mobile})}
              value={this.state.mobile}
              placeholder={'Mobile Number'}
              keyboardType = {'phone-pad'}
              autoFocus={true}
            />

            <TextInput
              underlineColorAndroid='transparent'
              placeholderTextColor='white'
              tintColor={'#633ea5'}
              style={{margin:30,height: 50,fontSize:20 ,borderColor: 'white', borderWidth: 1,width:window.width-120,borderRadius:40,top:100,fontFamily: 'Montserrat-Regular',color:'white',textAlign:'center'}}
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
              placeholder={'Amount'}
              keyboardType = {'phone-pad'}
              autoFocus={true}
            />
            
            <TouchableOpacity style={{margin:0,padding:10,backgroundColor:'#F65224',alignItems:'center',width:window.width-120,borderRadius:40,top:140}} onPress={() => this.requestPaymentInitiateApiCall()}>

                  <Text style={{fontSize:18,color:'white'}}>REQUEST</Text>

            </TouchableOpacity>

          </View>
      }

      {this.state.requested && !this.state.paymentDone &&

        <View style={{alignItems:'center',marginTop:50}}>
          <Text style={{color:'white',fontSize:18}}>Request Sent ...</Text>
          
          <Text style={{color:'white',fontSize:14,paddingTop:20}}>TRANSACTION ID - # {this.state.token}</Text>
          <Text style={{color:'white',fontSize:14,paddingTop:10}}>WAITING FOR CUSTOMER</Text>



        </View>

      }

      {this.state.paymentDone &&

        <View style={{paddingTop:10,backgroundColor:'#1EB774',margin:20,borderRadius:4,alignItems:'center',marginTop:40}}>

            <Text style={{color:'white',fontSize:16,paddingTop:0,fontFamily: 'Montserrat-Regular'}}>TRANSACTION SUCCESSFULL</Text>

            <Text style={{color:'#333',paddingTop:5,fontSize:16,fontWeight:'bold',fontFamily: 'Montserrat-Regular'}}>Payment Received from {this.state.mobile}</Text>

            <Text style={{color:'#333',paddingTop:5,fontSize:16,fontWeight:'bold',fontFamily: 'Montserrat-Regular'}}></Text>

            <Text style={{color:'#333',paddingTop:25,fontSize:18,paddingBottom:20,fontFamily: 'Montserrat-Regular'}}>Paid Online</Text>

            <View style={{backgroundColor:'#E94C3D',paddingTop:10,paddingBottom:10,width:window.width-40,alignItems:'center',borderRadius:0}}>
                <Text style={{color:'white',paddingTop:0,fontSize:28,fontFamily: 'Montserrat-Regular'}}>Rs. {this.state.amount}</Text>
            </View>

            <View style={{backgroundColor:'#21232F',width:window.width-40,alignItems:'center',paddingTop:40,fontFamily: 'Montserrat-Regular'}}>
              <Text style={{color:'white',fontSize:16,fontFamily: 'Montserrat-Regular'}} onPress={() => this._startFresh()}>NEW REQUEST</Text>
            </View>

        </View>

      }

      </View>
    );
  }
}

