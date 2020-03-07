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

import { asistenceItems } from "./data";
import DataDetailControl from "../../../components/controls/DataDetailControl";

export default AsistenceScreen = ({ onTapBack, items, navigation }) => {
  const [colorCard, setColorCard] = useState("orange");
  const [selectedTask, setSelectedTask] = useState({});
  const [tasksItems, setTasksItems] = useState(asistenceItems);

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

  const handleOnRenderItem = item => {
    return (
      <View style={cardStyle.card}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <View style={{ flex: 1, alignSelf: "center" }}>
            <Text style={{ fontStyle: "normal", fontWeight: "bold" }}>
              {item.nombreClase}
            </Text>

            <Text>{item.fechaInicio}</Text>
            <Text>{item.fechaFinal}</Text>
          </View>
          {item.diasDeClase.map((dia, index) => (
            <View key={index} style={{ flex: 1 }}>
              <View>
                <Text>{dia.diaId}</Text>
              </View>

              <Avatar
                size="small"
                rounded
                title={dia.asisitioAclase ? "Si" : "No"}
                onPress={() => console.log("Works!")}
                activeOpacity={2}
                overlayContainerStyle={{
                  backgroundColor: getColorStatusClass(dia.asisitioAclase)
                }}
              />
            </View>
          ))}
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
