import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, TextInput, StatusBar} from 'react-native';
import {Icon, Avatar, ListItem} from 'react-native-elements';
import {Link, Route} from 'react-router-native';
import ApiKeys from '../../constants/apiKeys';
import store from '../../store';
import 'firebase/firestore';
import 'firebase/auth';


class RegisterScreen extends React.Component{

    constructor(){
      super();
      this.state = {
        emailInput: "",
        passwordInput: "",
        confirmPasswordInput: "",
        nickInput: "", 
        checkPassword: ""
      }
    }

    confirmPassword = (text) => {
      if (this.state.passwordInput !== text) {
        this.setState({
          checkPassword: "Las contraseñas no coinciden.",
        })
      }else {
        this.setState({
          checkPassword: "",
        })
      }
    }

    CreateNewAccount = () => {
      const values = this.state;
      if (values.checkPassword === "" && values.passwordInput !== "") {
        ApiKeys.firebaseApp.auth().createUserWithEmailAndPassword(values.emailInput, values.passwordInput)
          .then(result=>{
            const user = result.user
            user.updateProfile({
              displayName: values.nickInput,
            })
              .then(()=>{
                ApiKeys.firebaseApp.firestore().collection('users').doc(user.uid).set({
                  name: values.nickInput,
                  email: values.emailInput,
                  id: user.uid
                });
              });
            
          })
          .catch(err => {
            alert(err);
          })

          this.setState({
            emailInput: "",
            passwordInput: "",
            confirmPasswordInput: "",
            nickInput: "", 
          })
      } else {
        alert("Las contraseñas nos coinciden intenta de nuevo.")
      }
    }

    render(){
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <View style={styles.form}>
            <View style={styles.formTitle}>
              <Icon name="user-plus" color="#cc3d6d" size={64} type="font-awesome" />
              <Text style={{fontSize: 28}}>Crear tu propia cuenta</Text>
              <Text>Ingresa los datos requeridos para empezar.</Text>
            </View>
            <View style={styles.formGroup}>
              <View style={styles.inputGroup}>
                <Icon name="envelope" style={styles.icons} color="#cc3d6d" type="font-awesome" />
                <TextInput 
                  style={styles.input}
                  onChangeText={text=>this.setState({emailInput:text})}
                  textContentType="emailAddress"
                  placeholder='Email:'
                  textContentType='username'
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <View style={styles.inputGroup}>
                <Icon name="user" style={styles.icons} color="#cc3d6d" type="font-awesome" />
                <TextInput 
                  style={styles.input}
                  onChangeText={text=>this.setState({nickInput:text})}
                  placeholder='Nombre, ejem: Jhon Doe'
                  textContentType='nickname'
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <View style={styles.inputGroup}>
                <Icon name='lock' style={styles.icons} color="#cc3d6d" type='font-awesome' />
                <TextInput 
                    style={styles.input}
                    onChangeText={text=>{
                      this.setState({passwordInput:text})
                    }}
                    textContentType='password'
                    placeholder='Contraseña:'
                    secureTextEntry={true}
                  />
              </View>
            </View>
            <View style={styles.formGroup}>
              <View style={styles.inputGroup}>
                <Icon name='lock' style={styles.icons} color="#cc3d6d" type='font-awesome' />
                <TextInput 
                    style={styles.input}
                    onChangeText={text=>{
                      this.confirmPassword(text);
                      this.setState({confirmPasswordInput:text})
                    }}
                    textContentType='password'
                    placeholder='Confirmar contraseña:'
                    secureTextEntry={true}
                  />
              </View>
            </View>
              <Text style={{padding:10,color:"#cc3d6d"}} >{this.state.checkPassword}</Text>
            <View style={styles.formGroup}>
              <TouchableOpacity 
                style={styles.Btn}
                onPress={()=>{
                  this.CreateNewAccount()
                  
                }}
              >
                <Text style={{color:'white', fontWeight: 'bold'}}>CREAR</Text>
              </TouchableOpacity>
                <View style={[styles.formGroup,{justifyContent:'center',flexDirection:'row'}]}>
                  <Text style={{fontSize:19}}>Ya tienes cuenta? </Text>
                  <Link to={'/'} underlayColor="#fff">
                    <Text style={styles.linkText}>Inicia sesion</Text>
                  </Link>
              </View>
            </View>
          </View>
        </View>
      )
    }
}

export default RegisterScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: "#fff"
    },
    formTitle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      width: '90%',
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    linkText: {
      fontSize:18,
      color:"blue",
    },
    formGroup:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30
    },
    inputGroup: {
      flexDirection: 'row',
      width: '100%',
      borderBottomWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#3D6DCC',
    },
    input:{
      padding: 5,
      width: '90%'
    },
    Btn: {
      backgroundColor: '#3D6DCC',
      alignContent: 'center',
      alignItems: 'center',
      padding: 20,
      width: '100%',
      borderRadius: 4
    }
  })