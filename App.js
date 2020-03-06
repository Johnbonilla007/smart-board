import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { registerRootComponent } from "expo";

import AppMenu from "./components/MenuTiles";
import Constants from "expo-constants";
import Dashboard from "./components/DefaultLayout/Index";
import { Header } from "react-native-elements";
import MainDrawer from "./components/DefaultLayout/MenuDrawer";

export const App = () => {
  const [title, setTitle] = useState("BIENVENIDO");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Header
            barStyle="light-content" // or directly
            placement="left"
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: () => {
                setShowMenu(true);
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
              justifyContent: "space-around"
            }}
          />
        </View>
        <View style={styles.image}>
          <Image
            source={require("./src/Resources/logo.png")}
            style={{
              width: 450,
              height: 150
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      </View>

      <View style={styles.menu}>
        {showMenu ? (
          <MainDrawer visible={showMenu} />
        ) : (
          <AppMenu setTitle={setTitle} />
        )}
      </View>
    </View>
  );
};

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
