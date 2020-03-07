import React, { useState } from "react";
import {
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Text
} from "react-native";
import { sumBy } from "lodash";
import { Icon, Avatar } from "react-native-elements";

import { schoolGradesItems } from "./data.js";
import DataDetailControl from "../../../components/controls/DataDetailControl";

export default ExamSchedule = ({ onTapBack, items, navigation }) => {
  const [colorCard, setColorCard] = useState("orange");
  const [selectedTask, setSelectedTask] = useState({});
  const [tasksItems, setTasksItems] = useState(schoolGradesItems);

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

  const getColorStatusClass = estaAprobada => {
    if (estaAprobada === undefined) {
      return "orange";
    }

    if (estaAprobada) {
      return "green";
    }

    return "red";
  };

  const getTextStatusClass = estaAprobada => {
    if (estaAprobada === undefined) {
      return "CUR";
    }

    if (estaAprobada) {
      return "APR";
    }

    return "REP";
  };

  const handleOnRenderItem = task => {
    return (
      <View style={cardStyle.card}>
        <View style={{ flex: 1 }}>
          <Avatar
            size="small"
            rounded
            title={getTextStatusClass(task.estaAprobada)}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            overlayContainerStyle={{
              backgroundColor: getColorStatusClass(task.estaAprobada)
            }}
          />
        </View>
        <View style={{ flex: 3, alignSelf: "stretch" }}>
          <View style={{ alignItems: "center" }}>
            <Text>{task.nombreClase}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginLeft: 15 }}>I</Text>
                <Avatar
                  size="small"
                  rounded
                  title={task.notaPrimerParcial}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.9}
                  overlayContainerStyle={{
                    backgroundColor: "grey"
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ marginLeft: 14 }}>II</Text>
                <Avatar
                  size="small"
                  rounded
                  title={task.notaSegundoParcial}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                  overlayContainerStyle={{
                    backgroundColor: "grey"
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ marginLeft: 12 }}>III</Text>
                <Avatar
                  size="small"
                  rounded
                  title={task.notaTercerParcial}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                  overlayContainerStyle={{
                    backgroundColor: "grey"
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 0.5 }}>
          <Avatar
            size="small"
            rounded
            title={
              task.notaPrimerParcial +
              task.notaSegundoParcial +
              task.notaTercerParcial
            }
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            overlayContainerStyle={{
              backgroundColor: getColorStatusClass(task.estaAprobada)
            }}
          />
        </View>
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

      <TouchableHighlight>
        <View style={styles.taskTitle}>
          <View style={{ flex: 3 }}>
            <Text style={{ color: "#ffff", fontWeight: "900", fontSize: 16 }}>
              Aprobadas: {sumBy(tasksItems, item => item.notaClase > 70)}
            </Text>
          </View>

          <View style={{ flex: 3, marginLeft: 20 }}>
            <Text style={{ color: "#ffff", fontWeight: "900", fontSize: 16 }}>
              Reprobadas: {sumBy(tasksItems, item => item.notaClase < 70)}
            </Text>
          </View>

          <View style={{ flex: 3, marginLeft: 20 }}>
            <Text style={{ color: "#ffff", fontWeight: "900", fontSize: 16 }}>
              Promedio:{" "}
              {`${sumBy(tasksItems, item => item.notaClase) /
                tasksItems.length}%`}
            </Text>
          </View>
        </View>
      </TouchableHighlight>

      <DataDetailControl
        items={tasksItems}
        handleOnLongPress={handleOnLongPress}
        onRenderItem={handleOnRenderItem}
      />
    </View>
  );
};

const cardStyle = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignContent: "stretch",
    alignItems: "center",
    backgroundColor: "#ffff",
    height: 75,
    margin: 4,
    borderRadius: 5
  },
  detailClasss: {}
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
    backgroundColor: "#83b245",
    height: 70,
    margin: 2,
    borderRadius: 5,
    alignItems: "center"
  }

  // title: {
  //   flex: 1
  // }
});
