import React, { useState } from "react";
import Constants from "expo-constants";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "./Card";
import TouchableScale from "react-native-touchable-scale";
import LinearGradient from "react-native-linear-gradient";
import { Icon, ListItem } from "react-native-elements";
import Tasks from "../../src/screens/Tasks";
import { menuItems } from "../../src/Resources/data";
import ClassSchedule from "../../src/screens/ClassSchedule";
import EventsView from "../../src/screens/EventsView";
import SchoolGrades from "../../src/screens/SchoolGrades";
import AsistenceScreen from "../../src/screens/AsistenceScreen";
import ExamSchedule from "../../src/screens/ExamSchedule";
import Messages from "../../src/screens/Messages";

export const AppMenu = ({ setTitle }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cardSelected, setCardSelected] = useState("");

  const handleOnTapCard = card => {
    setShowMenu(true);
    setCardSelected(card);
    // setTitle(card);
  };

  const handleOnTapBack = () => {
    setShowMenu(false);
    // setTitle(undefined);
  };

  const renderComponent = () => {
    const screen = menuItems.find(m => m.name === cardSelected);

    if (screen) {
      switch (screen.key) {
        case "task":
          return <Tasks onTapBack={handleOnTapBack} />;

        case "classSchedule":
          return <ClassSchedule onTapBack={handleOnTapBack} />;

        case "events":
          return <EventsView onTapBack={handleOnTapBack} />;

        case "schoolGrades":
          return <SchoolGrades onTapBack={handleOnTapBack} />;

        case "asistence":
          return <AsistenceScreen onTapBack={handleOnTapBack} />;

        case "examSchedule":
          return <ExamSchedule onTapBack={handleOnTapBack} />;

        case "messages":
          return <Messages onTapBack={handleOnTapBack} />;

        default:
          return (
            <View>
              <Text>
                Esta funcionalidad está en desarrollo, agradecemos su
                comprensión
              </Text>
              <Icon name="keyboard-backspace" onPress={handleOnTapBack} />
            </View>
          );
      }
    }
  };

  //  <View key={item.name} style={styles.container}>
  //    <Card {...item} handleOnTapCard={handleOnTapCard} />
  //  </View>;

  return (
    <View style={styles.container}>
      {!showMenu ? (
        <ScrollView>
          {menuItems.map((item, index) => (
            <ListItem
              onPress={event => handleOnTapCard(item.name)}
              key={index}
              title={item.name}
              Component={TouchableScale}
              friction={100} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.8} //
              leftIcon={{ name: item.iconName }}
              bottomDivider
              chevron
              linearGradientProps={{
                colors: [item.backgroundColor, item.backgroundColor],
                start: [1, 0],
                end: [0.2, 0]
              }}
              chevron={{ color: "white" }}
              titleStyle={{ color: "white", fontWeight: "bold" }}
              style={{ height: 70 }}
              // subtitleStyle={{ color: "white" }}
              // subtitle="Vice Chairman"
              // ViewComponent={LinearGradient}
            />
          ))}
        </ScrollView>
      ) : (
        <View>{renderComponent()}</View>
      )}
    </View>
  );
};

export default AppMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E2E1"
  }
});
