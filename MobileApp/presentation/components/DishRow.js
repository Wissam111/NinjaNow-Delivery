import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Currency from "react-currency-formatter";
import ImageView from "./ImageView";
import { useCartItemsContext } from "../../hooks/useCartItemsContext";
const DishRow = (props) => {
  const { dish } = props;
  const [counter, setCounter] = useState(0);
  const { cartItems, dispatch, selectCartItemsById } = useCartItemsContext();
  const dishItems = selectCartItemsById(dish._id);
  const handleMinusPressed = () => {
    if (!cartItems.length) {
      return;
    }
    dispatch({ type: "REMOVEFROMCART", payload: dish._id });
  };
  const handlePlusPressed = () => {
    dispatch({ type: "ADDTOCART", payload: dish });
  };

  return (
    <View className="w-full h-28 p-3 justify-between flex-row mb-2 border-b border-white">
      <View className="relative items-center justify-center">
        <Image
          source={require("../../assets/imgs/white-dish.png")}
          className="w-32 h-32 mb-2"
        />
        <ImageView
          imageId={dish.image}
          classN="absolute w-20 h-20  rounded-full justify-center bottom-2"
        />
      </View>
      <View className="justify-center items-end">
        <Text className="text-lg text-[#ffffffcc] font-normal">
          {dish.name}
        </Text>
        <Text className="color-[#fad02ccc] text-base font-normal">
          <Currency quantity={dish.price} currency="USD" />
        </Text>

        <View className="px-4 mt-2">
          <View className="flex-row items-center space-x-2 pb-2">
            <TouchableOpacity onPress={handlePlusPressed}>
              <Entypo name="circle-with-plus" size={26} color="#FAD02C" />
            </TouchableOpacity>
            <Text className="text-white text-base">{dishItems.length}</Text>
            <TouchableOpacity onPress={handleMinusPressed}>
              <AntDesign name="minuscircle" size={21} color="#FAD02C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DishRow;
