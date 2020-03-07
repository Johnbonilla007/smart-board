import React, { useState } from "react";
import {
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Text
} from "react-native";
import { Icon } from "react-native-elements";

import { classSchedule } from "./data";
import DataDetailControl from "../../../components/controls/DataDetailControl";

export default ClassSchedule = ({ onTapBack, items, navigation }) => {
  const [colorCard, setColorCard] = useState("orange");
  const [selectedTask, setSelectedTask] = useState({});
  const [tasksItems, setTasksItems] = useState(classSchedule);

  const handleOnLongPress = task => {
    tasksItems.forEach(t => {
      if (t.id === task.id) {
        if (t.isSelected) {
          t.isSelected = false;
          return;
        }
        t.isSelected = true;
      }
    });

    setTasksItems(tasksItems);
    setSelectedTask(task);
  };

  const handleOnRenderItem = task => {
    return (
      <View style={cardStyle(task.isSelected ? "#83b245" : colorCard).card}>
        <Text style={{ color: "#ffff", fontWeight: "700" }}>
          {task.nombreClase} {" - "} {task.docenteClase}
        </Text>

        <Text style={{ color: "#ffff", fontWeight: "700" }}>
          {task.descripcionClase}
        </Text>
        <Text
          style={{
            color: "#ffff",
            fontWeight: "800",
            textAlign: "center"
          }}
        >
          {task.horaEntrada} {" - "} {task.horaSalida}
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
          navigation && navigation.goBack(null);
        }}
      />

      <DataDetailControl
        items={tasksItems}
        handleOnLongPress={handleOnLongPress}
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
