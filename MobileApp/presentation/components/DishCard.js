import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

const DishCard = () => {
  return (
    <TouchableOpacity
      className="mr-2 items-center"
      style={styles.dishContainer}
    >
      <View className="relative items-center justify-center ">
        <Image
          source={require("../../assets/imgs/white-dish.png")}
          className="w-32 h-32"
        />
        <Image
          source={require("../../assets/imgs/burger.png")}
          className="absolute w-24 h-28"
        />
      </View>

      <Text className="text-sm text-[#ffffffcc] font-normal">
        Orignal Burger
      </Text>
      <Text className="color-[#fad02ccc] text-xs font-normal">$10.99</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  dishContainer: {
    width: 178,
    height: 180,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default DishCard;
