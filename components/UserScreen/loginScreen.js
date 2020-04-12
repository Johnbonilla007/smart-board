import React from 'react';
import {View, TouchableOpacity,Modal, StyleSheet, Text, TextInput} from 'react-native';
import {Icon, Avatar, ListItem} from 'react-native-elements';
import {Link} from 'react-router-native';
import ApiKeys from '../../constants/apiKeys';
import store from '../../store';
import 'firebase/firestore';
import 'firebase/auth';
import AddStudentPanel from './AddStudentPanel';
import {studentsData} from '../../src/Resources/data';

class LoginScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user: null,
    }
    this.navigation = props.navigation
  }

  componentDidMount(){
    store.subscribe(()=>{
      this.setState({
        user: store.getState().user
      })
    })
  }

  render(){

    if(this.state.user){
      //si hay usuario logeado este pantalla muestra la informacion del usuario
      return <UserProfile user={this.state.user} navigation={this.navigation} />
    }
      return <Login setUser={user=>this.setState({user})} />
  }
    
}

class UserProfile extends React.Component {

  constructor(){
    super();
    this.state = {
      user: store.getState().user,
      panel:false,
      studentsData:studentsData
    }
  }
  
  componentDidMount(){
    
  }

  SignOut = () => {
    store.dispatch({
      type: "SIGNOUT"
    })
    ApiKeys.firebaseApp.auth().signOut();
  }

  //Mostrar los datos de los estudiantes
  showStudentsData = () => {
    const AddButton = (
      <TouchableOpacity 
        style={[styles.Btn,{backgroundColor: '#3D6DCC',borderRadius:0}]}  
        onPress={()=>this.setState({
          panel:true
        })}
        >
          <Text style={{fontSize: 24,fontWeight: 'bold', color: 'white'}}>
            Agregar estudiante
          </Text>
        </TouchableOpacity>
    )

    if (!this.state.studentsData.length) {
      return (
        <View>
          {
            AddButton
          }
        </View>
      )
    } else {
      return <View>
        {
          this.state.studentsData.map((item,index) => (
            <ListItem 
              onPress={()=>{
                store.dispatch({
                  type:'SET_ACTIVE_TAB',
                  id: item.name
                });

                this.props.navigation.navigate('Inicio');
              }}
              key={item.id+index}
              title={item.name}
              subtitle={`curso: ${item.curso} edad: ${item.edad} años`}
              bottomDivider
            />
          ))
        }
        {
          AddButton
        }
      </View>
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.panel}
         >
          <AddStudentPanel ClosePanel={()=>this.setState({panel:false})} styles={styles} />
        </Modal>

        <View style={styles.userProfile}>
          <Avatar 
            rounded
            source={require('../../src/Resources/images/avatar--photo.jpg')}
            title="U"
            size="xlarge"
            showEditButton
          />
          <Text style={{fontSize: 28, fontWeight:'bold', color: '#555'}}>{this.state.user.displayName}</Text>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.profileStudentList}>
            <Text style={{textAlign:'center',fontSize:24,color:"#555", fontWeight:'bold'}}>
              Lista de Estudiantes
            </Text>
            {
              this.showStudentsData()
            }
            <TouchableOpacity 
              style={[styles.Btn,{backgroundColor: '#3D6DCC',borderRadius:0}]} 
              onPress={()=>this.props.navigation.navigate('Inicio')}>
              <Text style={{color:'white', fontWeight:'bold', fontSize:24}}>
                Gestionar estudiantes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.Btn,{backgroundColor: '#cc3d6d',borderRadius:0}]} 
              onPress={()=>this.SignOut()}>
              <Text style={{color:'white', fontWeight:'bold', fontSize:24}}>
                Cerrar Sesion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

class Login extends React.Component {
  constructor(){
    super();
    state = {
      emailInput: "",
      passwordInput: "",
    }
  }

  //funcion para iniciar sesion por medio de firebase mediante email y password
  Signin = () => {
    const state = this.state;
    ApiKeys.firebaseApp.auth().signInWithEmailAndPassword(state.emailInput, state.passwordInput)
      .then(result => {
        const user = result.user
        store.dispatch({
          type: "SIGNIN",
          user: user
        })
        this.props.setUser(user);
      })
      .catch(err => {
        alert(err);
      })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formTitle}>
            <Icon name="id-badge" color="#cc3d6d" size={64} type="font-awesome" />
            <Text style={{fontSize: 28, fontWeight:'bold'}}>Inicia sesion en Smart Board</Text>
            <Text>Ingresa tus datos de autenticación.</Text>
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
              <Icon name='lock' style={styles.icons} color="#cc3d6d" type='font-awesome' />
              <TextInput 
                  style={styles.input}
                  onChangeText={text=>this.setState({passwordInput:text})}
                  textContentType='password'
                  placeholder='Contraseña:'
                  secureTextEntry={true}
                />
            </View>
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity 
              style={styles.Btn}
              onPress={()=>{
                let userData = this.state.emailInput && this.state.passwordInput ? true : false;
                if(userData){
                  this.Signin();
                }
              }}
            >
              <Text style={{color:'white', fontWeight: 'bold'}}>INGRESAR</Text>
            </TouchableOpacity>
              <View style={[styles.formGroup,{justifyContent:'center', flexDirection: 'row'}]}>
                <Text style={{fontSize:19}}>No tienes cuenta? </Text>
                <Link to={'/createaccount'} underlayColor="#fff">
                  <Text style={styles.linkText}>Crea una cuenta</Text>
                </Link>
            </View>

          </View>
        </View>
      </View>
    )
  }
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
      flex: 2,
      flexDirection:'column', 
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
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
      padding: 15,
      width: '100%',
      borderRadius: 4,
      marginTop: 10
    },
    userProfile: {
      position:'relative',
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    profileInfo:{
      width: '100%'
    },
    profileStudentList: {
      backgroundColor: 'white',
      marginTop: 55,
    }
  })