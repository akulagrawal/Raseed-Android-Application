import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  AsyncStorage
} from 'react-native';

import {AllTransactions} from '../actions/api';

const window = Dimensions.get('window');

export class Passbook extends Component<{}> {


  static navigationOptions = {
    title: 'Passbook',
    
  }

  constructor(props){
    super(props);
    this.state={
      userMobile : '',
      allTrans : [],
      transUpdateDone : false,
    }

    this.setUserMobile = this.setUserMobile.bind(this);
    this._updatePassbook = this._updatePassbook.bind(this);
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
    this._getAllTransactions();
  }


  _getAllTransactions(){

    let temp = AllTransactions(this.state.userMobile).then(responseObj => this._updatePassbook(responseObj)).catch();
  }

  _updatePassbook(responseObj){

    let tempResponseObj = responseObj.transObj.length;

    for(var i=tempResponseObj-1;i>=0;i--){
      let parAmount = responseObj.transObj[i].amount;
     
      let typeOfTrans = '';

       if(responseObj.transObj[i].merchantMobile==this.state.userMobile){
        typeOfTrans = 'CREDIT (+)';
      }else{
        typeOfTrans = 'DEBIT (-)';
      }

      let dateAndTime = String(new Date(responseObj.transObj[i].creationTimeStamp));
      dateAndTime = dateAndTime.substring(0,dateAndTime.length-18);

      if(!responseObj.transObj[i].merchantName){
        parMerchantName = 'Example Inc';
      }else{
        if(responseObj.transObj[i].merchantMobile==this.state.userMobile){
          parMerchantName = responseObj.transObj[i].mobile;
        }else{
          parMerchantName = responseObj.transObj[i].merchantName;
        }
      }

      let token = responseObj.transObj[i].token;
      let tokenObj = {"token" : token,"dateAndTime" : dateAndTime};
     
      this.state.allTrans.push(
           <TouchableOpacity style={{margin:10,backgroundColor:'#F65224',borderRadius:20}} onPress={() => this.props.navigation.navigate('Receipt',{tokenObj})}>
            <Text style={{color:'white',fontSize:16,paddingLeft:20,paddingTop:10,paddingBottom:0,fontFamily: 'Montserrat-Regular'}}>{parMerchantName}</Text>
            <Text style={{position:'absolute',color:'white',fontSize:18,paddingLeft:220,paddingTop:10,paddingBottom:10,fontFamily: 'Montserrat-Regular'}}>{typeOfTrans}</Text>
            <Text style={{color:'white',fontSize:12,paddingLeft:20,paddingTop:10,paddingBottom:10,fontFamily: 'Montserrat-Regular'}}>{dateAndTime}</Text>
            <Text style={{position:'absolute',color:'white',fontSize:14,paddingLeft:220,paddingTop:40,paddingBottom:240,fontFamily: 'Montserrat-Regular'}}>Rs. {parAmount}</Text>
            <Text style={{color:'white',fontSize:12,paddingLeft:20,paddingTop:2,paddingBottom:10,fontFamily: 'Montserrat-Regular'}}>{token}</Text>
          </TouchableOpacity>
        )
      this.setState({
        transUpdateDone : true,
      });
    }

  }

  render() {
    return (
      <View  style={{backgroundColor:'#21232F',height:window.height}}>
        <View style={{alignItems:'center'}}>
            <Text style={{color:'white',paddingTop:16,fontSize:24,fontFamily: 'Montserrat-Regular'}}>PASSBOOK</Text>
          </View>

        <ScrollView style={{paddingTop:16}}>
          
          {this.state.allTrans}
        </ScrollView>
      </View>
    );
  }
}

