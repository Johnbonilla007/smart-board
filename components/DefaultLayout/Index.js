import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";
import Drawer from "react-native-drawer";
import { MainDrawer } from "./MenuDrawer";

export const Dashboard = ({ title }) => {
  const [showMain, setShowMain] = useState(false);

  const drawerStyles = {
    drawer: {
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 3
    },
    main: { paddingLeft: 3 }
  };

  return (
    <View style={styles.container}>
      <Icon
        onPress={() => setShowMain(true)}
        name="menu"
        style={styles.buttonMenu}
        type="overlay"
        color="white"
      />

      <View style={styles.title}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {title || "BIENVENIDO"}
        </Text>
      </View>

      <Icon
        onPress={() => {}}
        name="notifications-none"
        style={styles.buttonNotifications}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1857BC",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonMenu: {
    flex: 1,
    backgroundColor: "#1857BC"
  },
  title: {
    flex: 2,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },

  buttonNotifications: {
    fontSize: 100,
    fontWeight: "bold",
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#1857BC"
  }
});

export default Dashboard;
