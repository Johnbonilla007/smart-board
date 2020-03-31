import React from "react";
import { TouchableHighlight, ScrollView } from "react-native";

export default DataDetailControl = ({
  items,
  handleOnLongPress,
  onRenderItem
}) => {
  return (
    <ScrollView>
      {items.map((item, index) => (
        <TouchableHighlight
          onLongPress={() => handleOnLongPress && handleOnLongPress(item)}
          key={index}
        >
          {onRenderItem(item)}
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
};
