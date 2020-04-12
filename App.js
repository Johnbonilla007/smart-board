import React, { useState } from "react";
import { StyleSheet,StatusBar, View} from "react-native";
import { registerRootComponent } from "expo";
import 'react-native-gesture-handler';

import { Header } from "react-native-elements";
import AppMenu from './components/MenuTiles'
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createAppContainer, NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import UserScreen from "./components/UserScreen";
import {studentsData} from './src/Resources/data';
import store from './store';

const Drawer = createDrawerNavigator();
const TopTabs = createMaterialTopTabNavigator();

class App extends React.Component{

  //retorna el menu despegable con los childrens que le pasamos 
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Usuario"
          style={{
            height: '100%'
          }}
          >
          <Drawer.Screen name="Inicio" component={MyApp}/>
          <Drawer.Screen name="Usuario" component={UserScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

TopTabMenu = () => {
  //retorna la barra de tabs superiores
  return (
    <TopTabs.Navigator tabBarOptions={{
      style: { backgroundColor: "#3D6DCC"},
      activeTintColor: '#fff',
    }}
    >
      {
        studentsData.map((student,index) => (
          <TopTabs.Screen 
            key={index} 
            name={student.name} 
            component={AppMenu}
            
            />
        ))
      }
    </TopTabs.Navigator>
  )
}

const MyApp = ({navigation}) => {
  const [title, setTitle] = useState(store.getState().headerTitle);
  const [showMenu, setShowMenu] = useState(false);

  store.subscribe(()=>{
    setTitle(store.getState().headerTitle);
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"  backgroundColor="#3D6DCC" />
          <Header
            placement="left"
            leftComponent={{
              icon: "menu",
              color: "#fff",
              size:24,
              onPress: () => {
                navigation.toggleDrawer()
              }
            }}
            centerComponent={{
              onPress: () => {
                console.log("Hola");
              },
              text: title || "BIENVENIDO",
              style: { color: "#fff", fontSize:24 }
            }}
            rightComponent={{
              icon: "notifications",
              color: "#fff",
              style:{
                fontSize: 24
              }
            }}
            containerStyle={{
              backgroundColor: "#3D6DCC",
              paddingTop: 0
            }}
          />
 
      <View style={styles.menu}>
        {
          //rendetizar el menu de navegacion superior
          TopTabMenu()
        }
      </View>
    </View>
  )
}

registerRootComponent(App);

export default App;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  title: {
    height: 20,
    flex: 2
  },
  menu: {
    flex: 3,
    height: '100%'
  }
});
