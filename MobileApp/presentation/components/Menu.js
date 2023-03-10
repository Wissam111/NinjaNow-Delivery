import { View, Text } from "react-native";
import React from "react";
import DishRow from "./DishRow";
const Menu = (props) => {
  const { dishes } = props;

  return (
    <View className="pb-36">
      {dishes.map((dish) => (
        <DishRow key={dish._id} dish={dish} />
      ))}
    </View>
  );
};

export default Menu;
