import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  AsyncStorage,
  ScrollView,
  WebView
} from 'react-native';

import {NewTransaction,ConfirmTransaction,GetPayURL} from '../actions/api';

const window = Dimensions.get('window');

export class Pay extends Component<{}> {

  constructor(props){
    super(props);
    this.state={
          pendingPayment : false,
          merchantName : '',
          amount : 0,
          paid : false,
          token : '',
          refreshIntervalId : '',
          acceptedPay : false,
    }
   
   this.updateNewTrans = this.updateNewTrans.bind(this);
   this.generateReceipt = this.generateReceipt.bind(this);
   this._acceptedPay = this._acceptedPay.bind(this);
   this._updatePayURL = this._updatePayURL.bind(this);
  }

  componentWillMount(){
    this.setState({
      pendingPayment : false,
          merchantName : '',
          amount : 0,
          paid : false,
          timeCreated : '',
          userMobile : '',
          payURL : '',
    })
    let transID =  NewTransaction().then(responseObj => this.updateNewTrans(responseObj)).catch();

    if(!this.state.pendingPayment){
      this.state.refreshIntervalId =  setInterval(() => {this.fetchPaymentAPICall()},100);
    }

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


  fetchPaymentAPICall(){
      let transID =  NewTransaction(this.state.userMobile).then(responseObj => this.updateNewTrans(responseObj)).catch();
  }

  updateNewTrans(responseObj){
    console.log(responseObj);
    if(responseObj.success){
      
      clearInterval(this.state.refreshIntervalId);

      this.setState({
        pendingPayment : true,
        paid : false,
        merchantName : responseObj.merchantName,
        token : responseObj.token,
        amount : responseObj.amount,
      });

      this._getPayURL(this.state.amount);
    }
  }

  _getPayURL(amount){
    let temp = GetPayURL(amount).then(responseObj => this._updatePayURL(responseObj)).catch();
  }

  _updatePayURL(responseObj){
    this.setState({
      payURL : responseObj.payment_request.longurl
    });
  }

  _onNavigationStateChange(webViewState){
    if(webViewState.url.substring(0,20)=='http://pravandan.in/'){
      this.completePayment();
    }
  console.log(webViewState.url)
}



  completePayment(){
    let temp = ConfirmTransaction(this.state.token).then(responseObj => this.generateReceipt(responseObj)).catch();
  }

  generateReceipt(responseObj){
    this.setState({
      paid: true,
    })
  }

  _acceptedPay(){
    this.setState({
      acceptedPay : true,
    });
  }

  static navigationOptions = {
    title: 'Pay',
  }

  render() {
    return (
      <View style={{backgroundColor:'#21232F',height:window.height}}>

      
        {!(this.state.pendingPayment && !this.state.paid ) &&
          <View style={{alignItems:'center'}}>
            <Text style={{color:'white',paddingTop:10,fontSize:24,fontFamily: 'Montserrat-Regular'}}>PAY</Text>
          </View>
        }

        {!this.state.pendingPayment &&

          <View style={{alignItems:'center'}}>

          <Image source={require('../../assets/images/embarrassed.png')} style={{height:120,width:120,paddingBottom:20,top:100}}/>

          <Text style={{color:'white',paddingTop:10,fontSize:18,top:120,fontFamily: 'Montserrat-Regular'}}>Hey, It looks like you don't</Text>  
          <Text style={{color:'white',paddingTop:0,fontSize:18,top:120,fontFamily: 'Montserrat-Regular'}}>have any pending payments</Text>  

        </View>
      }

      {this.state.pendingPayment && !this.state.paid &&
        <View>
        {!this.state.acceptedPay &&

        <View style={{paddingTop:40,margin:20,borderRadius:4,alignItems:'center',marginTop:40}}>

            <Text style={{color:'white',fontSize:20,paddingTop:0,fontWeight:'bold'}}>PAYMENT REQUEST</Text>

            <Text style={{color:'#333',paddingTop:15,fontSize:18,fontWeight:'bold',color:'white'}}>{this.state.merchantName}</Text>

            

            <Text style={{color:'#333',paddingTop:15,fontSize:26,color:'white'}}>Rs {this.state.amount}</Text>

            <TouchableOpacity style={{marginTop:40,flex:1,backgroundColor:'#1EB774',paddingTop:10,paddingBottom:40,width:window.width-100,alignItems:'center',borderRadius:40}} onPress={() => this._acceptedPay()}>
                <Text style={{color:'white',paddingTop:0,fontSize:20}} >ACCEPT</Text>
            </TouchableOpacity>
            

            <Text style={{color:'#ee5411',paddingTop:15,fontSize:20,fontWeight:'bold'}}>CANCEL</Text>


        </View>

      }
          
      {this.state.acceptedPay &&

            <ScrollView>
              <WebView
              style={{borderRadius:4,height:window.height}}
              source={ {
                uri: this.state.payURL
              } } 
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              />
        </ScrollView>
          
      }

      </View>

      }

      {this.state.paid &&

        <View>
        
        <View style={{alignItems:'center'}}>
            <Text style={{color:'#17e209',fontSize:18,paddingTop:10,fontWeight:'bold'}}>Your payment is successfull</Text>
            <Text style={{color:'white',fontSize:16,paddingTop:10,fontWeight:'bold'}}># {this.state.token}</Text>
          </View>



        <View style={{paddingTop:10,backgroundColor:'#1EB774',margin:20,borderRadius:4,alignItems:'center',marginTop:40}}>

            <Text style={{color:'white',fontSize:16,paddingTop:0,fontWeight:'bold'}}>TRANSACTION SUCCESSFULL</Text>

            <Text style={{color:'#333',paddingTop:5,fontSize:16,fontWeight:'bold'}}>Paid to {this.state.merchantName}</Text>

            <Text style={{color:'#333',paddingTop:25,fontSize:18,paddingBottom:20}}>Paid Using Debit Card </Text>

            <View style={{flex:1,backgroundColor:'#F65224',paddingTop:10,paddingBottom:50,width:window.width-40,alignItems:'center',borderRadius:4}}>
                <Text style={{color:'white',paddingTop:0,fontSize:28}}>Rs. {this.state.amount}</Text>
            </View>
          
        </View>
        </View>
      }

      </View>
    );
  }
}

