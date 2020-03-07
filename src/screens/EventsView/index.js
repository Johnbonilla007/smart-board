import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import DataDetailControl from "../../../components/controls/DataDetailControl";
import { events } from "./data";

export default EventsView = ({ onTapBack }) => {
  const handleOnRenderItem = item => {
    return (
      <View style={cardStyle("#71b7ed").card}>
        <Text style={{ color: "#ffff", fontWeight: "700" }}>
          {item.nombreEvento} {" - "} {item.lugarEvento}
        </Text>

        <Text style={{ color: "#ffff", fontWeight: "700" }}>
          {item.descripcionEvento}
        </Text>
        <Text
          style={{
            color: "#ffff",
            fontWeight: "800",
            textAlign: "center"
          }}
        >
          {`Fecha: ${item.fechaEvento}`}
          {" - "}
          {`Hora: ${item.horaEvento}`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Icon
        name="keyboard-backspace"
        onPress={() => {
          if (onTapBack) {
            onTapBack();
          }
        }}
      />

      <DataDetailControl
        items={events}
        // handleOnLongPress={handleOnLongPress}
        onRenderItem={handleOnRenderItem}
      />
    </View>
  );
};

const cardStyle = colorCard =>
  StyleSheet.create({
    card: {
      backgroundColor: colorCard,
      height: 75,
      margin: 2,
      borderRadius: 5
    }
  });

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E2E1",
    display: "flex",
    flexDirection: "column"
  },

  title: {
    alignSelf: "center"
  },

  descripcionTarea: {
    alignSelf: "stretch"
  },

  taskTitle: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#2695ee",
    height: 70,
    margin: 2,
    borderRadius: 5,
    alignItems: "center"
  }

  // title: {
  //   flex: 1
  // }
});
