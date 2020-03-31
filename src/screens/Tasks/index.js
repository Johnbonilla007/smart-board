import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  BackHandler
} from "react-native";
import { Icon, SocialIcon } from "react-native-elements";
import { tasks } from "./data";
import DataDetailControl from "../../../components/controls/DataDetailControl";

export default Tasks = ({ onTapBack, navigation }) => {
  const [colorCard, setColorCard] = useState("#949495");
  const [selectedTask, setSelectedTask] = useState({});
  const [tasksItems, setTasksItems] = useState(tasks);

  const handleOnLongPress = task => {
    tasksItems.forEach(t => {
      if (t.id === task.id) {
        t.isSelected = true;
      }
    });

    setTasksItems(tasksItems);
    setSelectedTask(task);
  };

  const handleOnRenderItem = task => {
    return (
      <View style={cardStyle(task.isSelected ? "#83b245" : colorCard).card}>
        <Text style={{ color: "#ffff", fontWeight: "900" }}>
          {task.nombreTarea} {" - "} {task.tiempoRestante}
          {" - "}
          {task.puntaje}
        </Text>

        <Text style={{ color: "#ffff", fontWeight: "900" }}>
          {task.descripcionTarea}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Icon
        name="keyboard-backspace"
        onPress={() => {
          onTapBack();
          navigation && navigation.goBack(null);
          // BackHandler.removeEventListener();
        }}
      />
      <ScrollView>
        <TouchableHighlight>
          <View style={styles.taskTitle}>
            <View style={{ flex: 1 }}>
              <Icon
                name="library-books"
                color="#fff"
                size={48}
                underlayColor="transparent"
              />
            </View>

            <View style={{ flex: 5, marginLeft: 20 }}>
              <Text style={{ color: "#ffff", fontWeight: "900", fontSize: 16 }}>
                Tareas - Mensuales
              </Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View style={styles.taskTitle}>
            <View style={{ flex: 1 }}>
              <Icon
                name="library-books"
                color="#fff"
                size={48}
                underlayColor="transparent"
              />
            </View>

            <View style={{ flex: 5, marginLeft: 20 }}>
              <Text style={{ color: "#ffff", fontWeight: "900", fontSize: 16 }}>
                Tareas - Diarias
              </Text>
            </View>
          </View>
        </TouchableHighlight>

        <DataDetailControl
          items={tasksItems}
          handleOnLongPress={handleOnLongPress}
          onRenderItem={handleOnRenderItem}
        />
      </ScrollView>
    </View>
  );
};

const cardStyle = colorCard =>
  StyleSheet.create({
    card: {
      backgroundColor: colorCard,
      height: 70,
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
