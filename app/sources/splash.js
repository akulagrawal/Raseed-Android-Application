import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  AsyncStorage
} from 'react-native';

const window = Dimensions.get('window');

export class Splash extends Component<{}> {

  constructor(props){
    super(props);

    this.state={
      mobile : '',
      password : '',
    }
  }

  componentWillMount(){
   AsyncStorage.removeItem('userMobile'); 
  }

  static navigationOptions = {
    title: 'Splash',
  }

  submitAndLogin(){
    AsyncStorage.setItem('userMobile', this.state.mobile);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={{backgroundColor:'#21232F',height:window.height}}>
        <View style={{alignItems:'center',top:40}}>
         <Text style={{color:'white',fontSize:80}}>रसीद</Text>
        </View>
        <View style={{alignItems:'center',paddingTop:35}}>
         <Text style={{color:'white',fontFamily: 'Montserrat-Regular',fontSize:12}}>Bringing Receipts to Cloud</Text>
        </View>

        <View style={{alignItems: 'center', paddingTop:35, top:window.height-255}}>
         <Text style={{color:'white',fontFamily: 'Montserrat-Regular',fontSize:12}}>Saving nature with every receipt</Text>
        </View>

        <View style={{alignItems:'center',paddingTop:100}}>

            <TextInput
              underlineColorAndroid='transparent'
              placeholderTextColor='white'
              tintColor={'#633ea5'}
              style={{height: 45,fontSize:16 ,borderColor: 'white', borderWidth: 1,width:window.width-120,borderRadius:20,fontFamily: 'Montserrat-Regular',color:'white',textAlign:'center',fontFamily: 'Montserrat-Regular'}}
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
              style={{height: 45,fontSize:16 ,borderColor: 'white', borderWidth: 1,width:window.width-120,borderRadius:20,marginTop:20,fontFamily: 'Montserrat-Regular',color:'white',textAlign:'center'}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder={'Password'}
              keyboardType = {'phone-pad'}
              autoFocus={true}
            />

            <TouchableOpacity style={{backgroundColor:'#F65224',paddingTop:10,paddingBottom:10,paddingLeft:80,paddingRight:80,marginTop:50,borderRadius:40}} onPress={() => this.submitAndLogin() } >
              <Text style={{color:'white',fontSize:18,fontFamily: 'Montserrat-Regular'}}>CONTINUE</Text>
            </TouchableOpacity>

        </View>

      </View>
    );
  }
}

