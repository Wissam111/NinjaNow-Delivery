import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Currency from "react-currency-formatter";
import ImageView from "./ImageView";
import { useCartItemsContext } from "../../hooks/useCartItemsContext";
const DishOrderRow = (props) => {
  const { dish, total, dispatch } = props;

  return (
    <View className="flex-row-reverse items-center p-2 border-b border-white  space-x-7 py-2 px-5">
      <Text className="text-xl color-[#FAD02C]">{total} x</Text>
      <View className="relative items-center justify-center">
        <Image
          source={require("../../assets/imgs/white-dish.png")}
          className="w-32 h-32 mb-2"
        />
        <ImageView
          imageId={dish.image}
          classN="absolute w-20 h-20 mb-2 rounded-full top-6"
        />
      </View>

      <View className="flex-row-reverse items-center">
        <Text className="text-gray-300 text-lg ml-5">
          <Currency quantity={total * dish.price} currency="USD" />
        </Text>
        <TouchableOpacity
          onPress={() =>
            dispatch({ type: "REMOVEFROMCART", payload: dish._id })
          }
        >
          <Text className="text-[#00CCBB] text-base">Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DishOrderRow;
