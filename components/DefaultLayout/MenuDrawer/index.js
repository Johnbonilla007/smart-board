import * as React from "react";
import { View, Text } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/EvilIcons";
import { OffCanvas3D } from "react-native-off-canvas-menu";

export default class MainDrawer extends React.Component {
  handleMenu = () => {};
  _openMenu = () => {};

  render() {
    const { visible } = this.props;
    console.log(visible);

    return (
      <View style={{ flex: 1 }}>
        <OffCanvas3D
          active={visible}
          onMenuPress={this.handleMenu}
          backgroundColor={"#222222"}
          menuTextStyles={{ color: "white" }}
          // handleBackPress={true}
          menuItems={[
            {
              title: "Menu 1",
              icon: <Icon name="camera" size={35} color="#ffffff" />
              // renderScene: <Text>TEST </Text>
            },
            {
              title: "Menu 2",
              icon: <Icon name="bell" size={35} color="#ffffff" />
              // renderScene: <Text>TEST 1</Text>
            }
          ]}
        />
      </View>
    );
  }
}
