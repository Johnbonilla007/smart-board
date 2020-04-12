import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {NativeRouter, Route} from 'react-router-native';
import LoginScreen from './loginScreen';
import RegisterScreen from './registerScreen';
import ApiKeys from '../../constants/apiKeys';
import store from '../../store';

export default class UserScreen extends Component{

  componentDidMount(){
    ApiKeys.firebaseApp.auth().onAuthStateChanged(user => store.dispatch({
      type: 'SIGNIN',
      user
    }))
  }

  render(){
    return (
    <NativeRouter>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      <Route path={'/'} exact component={()=><LoginScreen navigation={this.props.navigation} TopTabs={this.props.TopTabs} />} />
      <Route path={'/createaccount'} exact component={()=><RegisterScreen/>} />
    </NativeRouter>
    )
  }
}
