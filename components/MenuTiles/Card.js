import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import { Icon } from "react-native-elements";

export const Card = ({ name, backgroundColor, iconName, handleOnTapCard }) => {
  return (
    <TouchableHighlight onPress={() => handleOnTapCard(name)}>
      <View style={stylesCard(backgroundColor).card}>
        <View style={styles("").icon}>
          <Icon
            color="white"
            underlayColor="transparent"
            size={50}
            name={iconName || ""}
            onPress={() => {
              console.log("OnPressIcon");
            }}
          />
        </View>

        <View style={styles("").title}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {name}
          </Text>
        </View>

        <View style={styles("").button}>
          <Icon
            name="add-circle-outline"
            background="white"
            size={35}
            onPress={() => {
              console.log("OnPressIcon");
            }}
            underlayColor="transparent"
            color="white"

            //disabled
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const stylesCard = backgroundColor =>
  StyleSheet.create({
    card: {
      flex: 1,
      flexDirection: "row",
      height: 85,
      backgroundColor: backgroundColor || "grey",
      margin: 1.8,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    }
  });

const styles = backgroundColor =>
  StyleSheet.create({
    icon: {
      fontSize: 20,
      color: "#000",
      flex: 1
    },

    title: {
      fontSize: 85,
      fontWeight: "bold",
      flex: 2,
      alignSelf: "stretch",
      justifyContent: "center"
    },

    button: {
      height: 38,
      width: 80,
      borderRadius: 20,
      flex: 0,
      color: "#000"
    },

    mainImage: {
      height: 100
    },

    buttonText: {
      fontSize: 20,
      lineHeight: 38,
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    }
  });
