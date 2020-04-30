import React, { useState } from "react";
import { StyleSheet,StatusBar, View, Image, ActivityIndicator } from "react-native";
import { registerRootComponent } from "expo";
import 'react-native-gesture-handler';

import Constants from "expo-constants";
import Dashboard from "./components/DefaultLayout/Index";
import { Header } from "react-native-elements";
import MainDrawer from "./components/DefaultLayout/MenuDrawer";
import AppMenu from './components/MenuTiles'
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import UserScreen from "./components/UserScreen";

const Drawer = createDrawerNavigator();
const TopTabs = createMaterialTopTabNavigator();
const studentsList = [
  {
    name:'John Doe',
    id: "0000",
    edad: 15,
    curso: "5°"
  },
  {
    name:'John Dae',
    id: "0001",
    edad: 15,
    curso: "5°"
  },
  {
    name:'John Die',
    id: "0002",
    edad: 15,
    curso: "5°"
  },
]

const MyApp = ({navigation}) => {
  const [title, setTitle] = useState("BIENVENIDO");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
          <Header
            placement="left"
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: () => {
                navigation.toggleDrawer()
              }
            }}
            centerComponent={{
              onPress: () => {
                console.log("Hola");
              },
              text: title || "BIENVENIDO",
              style: { color: "#fff" }
            }}
            rightComponent={{
              icon: "notifications",
              color: "#fff"
            }}
            containerStyle={{
              backgroundColor: "#3D6DCC",
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

const App = () => {
  //retorna el menu despegable con los childrens que le pasamos 
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content"  />
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={MyApp}/>
        <Drawer.Screen name="Usuario" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};


const TopTabMenu = () => {
  //retorna la barra de tabs superiores
  return (
    <TopTabs.Navigator tabBarOptions={{
      style: { backgroundColor: "#3D6DCC"},
      activeTintColor: '#fff',
    }}>
      {
        studentsList.map((student,index) => (
          <TopTabs.Screen key={index} name={student.name} component={AppMenu} />
        ))
      }
    </TopTabs.Navigator>
  )
}


registerRootComponent(App);

export default App;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight
  },

  title: {
    height: 20,
    flex: 2
  },

  header: {
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },

  image: {
    flex: 0
  },

  menu: {
    flex: 2
  }
});
