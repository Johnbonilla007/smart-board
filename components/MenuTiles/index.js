import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { Icon, ListItem } from "react-native-elements";
import Tasks from "../../src/screens/Tasks";
import { menuItems } from "../../src/Resources/data";
import ClassSchedule from "../../src/screens/ClassSchedule";
import EventsView from "../../src/screens/EventsView";
import SchoolGrades from "../../src/screens/SchoolGrades";
import AsistenceScreen from "../../src/screens/AsistenceScreen";
import ExamSchedule from "../../src/screens/ExamSchedule";
import Messages from "../../src/screens/Messages";
import store from '../../store';

export const AppMenu = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cardSelected, setCardSelected] = useState("");

  const setTitle = card => {
    store.dispatch({
      type: 'SET_TITLE',
      card
    })
  }

  store.subscribe(()=>{
    if (store.getState().activeTab) {
      try {
        navigation.jumpTo(store.getState().activeTab);
      }
      catch (err) {
        console.log(err)
      }
    }
  })

  const handleOnTapCard = card => {
    setShowMenu(true);
    setCardSelected(card);
    setTitle(card);
  };

  const handleOnTapBack = () => {
    setShowMenu(false);
    setTitle(undefined);
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
    <ScrollView  style={styles.container}>
      {!showMenu ? (
        <View style={{height: '100%'}}>
          {menuItems.map((item, index) => (
            <ListItem
              onPress={event => handleOnTapCard(item.name)}
              key={index}
              title={item.name}
              Component={TouchableScale}
              friction={50} //
              tension={50} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.2} //
              leftIcon={{ name: item.iconName }}
              bottomDivider
              chevron
              linearGradientProps={{
                colors: [item.backgroundColor, item.backgroundColor],
                start: [1, 0],
                end: [0.2, 0]
              }}
              chevron={{ color: "white" }}
              titleStyle={{ color: "white", fontWeight: "bold", height: '90%' }}
              style={{height: 80}}
              // subtitleStyle={{ color: "white" }}
              // subtitle="Vice Chairman"
              // ViewComponent={LinearGradient}
            />
          ))}
        </View>
      ) : (
        <View>{renderComponent()}</View>
      )}
    </ScrollView >
  );
};

export default AppMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E2E1",
    flex: 2
  }
});
