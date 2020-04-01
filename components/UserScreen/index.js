import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, StatusBar} from 'react-native';
import {Icon, Avatar, ListItem} from 'react-native-elements';

export default class UserScreen extends Component{
  state = {
    user: false,
    userInput: '',
    passwordInput: '',
  }

  studentsData= [
    {
      name:'John Doe',
      id: "0000",
      edad: 15,
      curso: "5°"
    },
    {
      name:'John Doe',
      id: "0001",
      edad: 15,
      curso: "5°"
    },
    {
      name:'John Doe',
      id: "0002",
      edad: 15,
      curso: "5°"
    },
  ]

  asyncLogin = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      this.setState({
        user
      });
    }

    catch (error) {
      alert(error);
    }
  }

  UNSAFE_componentWillMount(){
    this.asyncLogin()
  }
  
  render(){
    if(this.state.user ){

      //si hay usuario logeado este pantalla muestra la informacion del usuario
      return (
        <View style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}>
          <StatusBar backgroundColor="#fff" barStyle="light-content"/>
          <View style={styles.userProfile}>
            <Avatar 
              rounded
              source={require('../../src/Resources/images/avatar--photo.jpg')}
              title="U"
              size="xlarge"
              showEditButton
            />
            <Text style={{fontSize: 28, fontWeight:'bold', color: '#555'}}>{this.state.user}</Text>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileStudentList}>
              <Text style={{textAlign:'center',fontSize:24,color:"#555", fontWeight:'bold'}}>
                Gestionar alumnos
              </Text>
              {
                this.studentsData.map(item => (
                  <ListItem 
                    key={item.id}
                    leftIcon={<Avatar rounded icon={{name:"user", type:"font-awesome", color:"#cc3d6d"}} size="small" />}
                    title={item.name}
                    subtitle={`curso: ${item.curso} edad: ${item.edad} años`}
                  />
                ))
              }
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.signinBtn,{backgroundColor: '#cc3d6d',borderRadius:0, marginTop:20}]} 
            onPress={()=>{
              AsyncStorage.setItem('user','');
              this.setState({
                user:false
              })
            }}>
            <Text style={{color:'white', fontWeight:'bold'}}>
              Cerrar Sesion
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}>
        <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />
        <View style={styles.form}>
          <View style={styles.formTitle}>
            <Icon name="id-badge" color="#3D6DCC" size={64} type="font-awesome" />
            <Text style={{fontSize: 28}}>Inicia sesion</Text>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.inputGroup}>
              <Icon name="user" style={styles.icons} color="#cc3d6d" type="font-awesome" />
              <TextInput 
                style={styles.input}
                onChangeText={text=>this.setState({userInput:text})}
                placeholder='Usuario'
                textContentType='nickname'
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.inputGroup}>
              <Icon name='lock' style={styles.icons} color="#cc3d6d" type='font-awesome' />
              <TextInput 
                  style={styles.input}
                  onChangeText={text=>this.setState({passwordInput:text})}
                  textContentType='password'
                  placeholder='Contraseña'
                  secureTextEntry={true}
                />
            </View>
          </View>
          <View>
            <TouchableOpacity 
              style={styles.signinBtn}
              onPress={()=>{
                let userData = this.state.userInput && this.state.passwordInput ? true : false;
                if(userData){
                  AsyncStorage.setItem('user', this.state.userInput)
                  this.setState({
                    user:this.state.userInput,
                    userInput: '',
                    passwordInput: ''
                  })
                }
              }}
            >
              <Text style={{color:'white', fontWeight: 'bold'}}>INGRESAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    width: '95%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  formTitle: {
    position: 'absolute',
    top: 50,
  },
  formGroup:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  inputGroup: {
    flexDirection: 'row',
    width: '70%',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3D6DCC',
  },
  input:{
    padding: 5,
    width: '85%'
  },
  signinBtn: {
    backgroundColor: '#3D6DCC',
    alignContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    borderRadius: 4
  },
  userProfile: {
    position:'relative',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileStudentList: {
    backgroundColor: 'white',
    marginTop: 55,
  }
})