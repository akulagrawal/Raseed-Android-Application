import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  AsyncStorage
} from 'react-native';

import {SubModalStack} from '../config/routes';

import {NewTransaction,ConfirmTransaction,AuthLogin,AllTransactions} from '../actions/api';

const window = Dimensions.get('window');

export class SwitchHome extends Component<{}> {

  constructor(props){
    super(props);

    const maxOpacity = 0.12;
    this.slideValue = new Animated.Value(0);
    this.slideValue2 = new Animated.Value(0);
    this.slideValue3 = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3)
    this.state={
      userMobile : '',
      rewards : 0,
      refreshRewardsIntervalID : '',
      allTrans : [],
      transUpdateDone : false,
      parAmount : '',
      parMerchantName : '',
      parDateAndTime : '',
      parTypeOfTrans : '',
    }

    this.setUserMobile = this.setUserMobile.bind(this);
    this._updateRewards = this._updateRewards.bind(this);
    this._updateLastTransaction = this._updateLastTransaction.bind(this);
  	
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

    this._callTransactionsAPI();

    let temp = AuthLogin(this.state.userMobile).then(responseObj => this._updateRewards(responseObj)).catch();

    this.state.refreshRewardsIntervalID =  setInterval(() => {this._callUpdateRewards()},1000);

    this._callTransactionsAPI();

  }

  _callUpdateRewards(){
     let temp = AuthLogin(this.state.userMobile).then(responseObj => this._updateRewards(responseObj)).catch();
  }

  _updateRewards(responseObj){
    this.setState({
      rewards : parseInt(responseObj.rewards),
    });
  }

  _callTransactionsAPI(){
    let temp = AllTransactions(this.state.userMobile).then(responseObj => this._updateLastTransaction(responseObj)).catch();
  }

  _updateLastTransaction(responseObj){
    let tempResponseObj = responseObj.transObj.length;
      let typeOfTrans = '';

      let dateAndTime = String(new Date(responseObj.transObj[tempResponseObj-1].creationTimeStamp));
      dateAndTime = dateAndTime.substring(0,dateAndTime.length-18);

      if(!responseObj.transObj[tempResponseObj-1].merchantName){
        parMerchantName = 'Example Inc';
      }else{
        parMerchantName = responseObj.transObj[tempResponseObj-1].merchantName;
      }


      if(responseObj.transObj[i].merchantMobile==this.state.userMobile){
        typeOfTrans = 'CREDIT (+)';
      }else{
        typeOfTrans = 'DEBIT (-)';
      }

      this.setState({
        parAmount : responseObj.transObj[tempResponseObj-1].amount,
        parDateAndTime : dateAndTime,
        parMerchantName : parMerchantName,
        parTypeOfTrans : typeOfTrans,
      });

      this.setState({
        transUpdateDone : true,
      });

  }


  componentDidMount(){
  	this.animate(),
  	setTimeout(()=>this.animate2(), 2000),
  	setTimeout(()=>this.animate3(), 3000),
  	this.spring()
  }


  fetchPendingPayment(){

  }

  animate() {
  		this.slideValue.setValue(0)
  		Animated.timing(
	    	this.slideValue,
	    	{
	      	toValue: 1,
	      	duration: 5000,
	    	}
	    ).start(() => this.animate())
}

  animate2() {
  		this.slideValue2.setValue(0)
  		Animated.timing(
	    	this.slideValue2,
	    	{
	      	toValue: 1,
	      	duration: 5000,
	    	}
	    ).start(() => this.animate2())
}
  animate3() {
  		this.slideValue3.setValue(0)
  		Animated.timing(
	    	this.slideValue3,
	    	{
	      	toValue: 1,
	      	duration: 5000,
	    	}
	    ).start(() => this.animate3())
}
  spring() {
  	this.springValue.setValue(0.01)
  	Animated.spring(
  		this.springValue,
  		{
  			toValue: 1,
  			speed: 0.04
  			
  		}
  	).start()
  }
  static navigationOptions = {
    title: 'SwitchHome',

  }

  render() {
  	const opacity = this.slideValue.interpolate({
  		inputRange: [0, 1],
  		outputRange: [1, 0]
  	});
  	const scale = this.slideValue.interpolate({
  		inputRange: [0, 1],
  		outputRange: [0.01, 4]
  	})
  	const opacity2 = this.slideValue2.interpolate({
  		inputRange: [0, 1],
  		outputRange: [1, 0]
  	});
  	const scale2 = this.slideValue2.interpolate({
  		inputRange: [0, 1],
  		outputRange: [0.01, 4]
  	})
  	const opacity3 = this.slideValue3.interpolate({
  		inputRange: [0, 1],
  		outputRange: [1, 0]
  	});
  	const scale3 = this.slideValue3.interpolate({
  		inputRange: [0, 1],
  		outputRange: [0.01, 4]
  	})
    return (
      <View style={{backgroundColor:'#21232F',height:window.height,alignItems:'center'}}>

          <View style={{alignItems:'center'}}>
            <Text style={{color:'white',paddingTop:16,fontSize:20,fontFamily: 'Montserrat-Regular'}}>+91- {this.state.userMobile}</Text>
          </View>

        <View style={{top:10,alignItems:'center',flexDirection:'row',backgroundColor:'#21232F',borderRadius:4}}>
            <TouchableOpacity style={{padding:20}} onPress={() => this.props.navigation.navigate('Pay')}>
              <Image source={require('../../assets/images/22500722_1608921872492156_281082674_n.png')} onPress={() => this.props.navigation.navigate('Pay')} style={{height:50,width:50}}/>
              <Text style={{color:'white',paddingLeft:6,fontFamily: 'Montserrat-Regular'}} >Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:20}} onPress={() => this.props.navigation.navigate('Request')}>
              <Image source={require('../../assets/images/22538029_1608921882492155_295088226_n.png')} onPress={() => this.props.navigation.navigate('Pay')}  style={{height:50,width:50,paddingBottom:20}}/>
              <Text style={{color:'white',paddingLeft:-10,fontFamily: 'Montserrat-Regular'}}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingLeft:20,paddingRight:10}} onPress={() => this.props.navigation.navigate('Passbook')}>
              <Image source={require('../../assets/images/22538178_1608921862492157_63247476_n.png')} onPress={() => this.props.navigation.navigate('Pay')} style={{height:50,width:50,paddingBottom:20}}/>
              <Text style={{color:'white',paddingLeft:0,fontFamily: 'Montserrat-Regular'}}>Passbook</Text>
            </TouchableOpacity>
        </View>
        <View 
        	style= {{ position: 'absolute', marginTop:window.height/2-40, alignItems: 'center'}}>
        <Animated.View 
        	style={{position: 'absolute', width: 80, height: 80, backgroundColor: '#3366CC', borderRadius: 50, transform: [{scale: scale}], opacity}}/>
        <Animated.View 
        	style={{position: 'absolute', width: 80, height: 80, backgroundColor: '#1f2c89', borderRadius: 50, transform: [{scale: scale2}], opacity: opacity2}}/>
        <Animated.View 
        	style={{position: 'absolute', width: 80, height: 80, backgroundColor: '#1f4182', borderRadius: 50, transform: [{scale: scale3}], opacity: opacity3}}/>
        <Animated.View 
        	style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', width: 80, height: 80, backgroundColor: '#3366CC', borderRadius: 50, transform: [{scale: this.springValue}]}}>
        	<Text style= {{fontSize: 25, color: '#bfc6ff'}} onPress={() => this.props.navigation.navigate('Pay')}> रसीद </Text>
        </Animated.View>
        
        </View>

        <View style={{position: 'absolute', top:window.height-150}}>
        <Text style={{paddingLeft:10,fontSize:16,paddingBottom:5,color:'white',fontFamily: 'Montserrat-Regular'}}>Total Rewards - Rs. {this.state.rewards}</Text>
        <View style={{backgroundColor:'#17e209',padding:6,width:window.width-60,borderRadius:40}}>
              <Text style={{color:'#333',fontFamily: 'Montserrat-Regular',paddingLeft:10}}>REWARD CARD PLUS</Text>
        </View>
        </View>
      </View>
    );
  }
}