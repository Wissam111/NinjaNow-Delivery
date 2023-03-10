import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Menu from "../../components/Menu";
import CartIcon from "../../components/CartIcon";
import { useRoute } from "@react-navigation/native";
import ImageView from "../../components/ImageView";
const Restaurant = () => {
  const {
    params: { restaurant },
  } = useRoute();
  return (
    <>
      <CartIcon restaurant={restaurant} />
      <View className="flex-1 bg-[#000000d4]">
        <ScrollView>
          {/* <Image
            className="w-full h-56 p-4 pt-5"
            source={require("../../../assets/imgs/KFCImg.jpg")}
          /> */}
          <ImageView imageId={restaurant.image} classN="w-full h-56 p-4 pt-5" />
          <View className="p-4 justify-between">
            <Text className="text-5xl  text-white mb-2">{restaurant.name}</Text>
            <View className="flex-row justify-end items-center">
              <Text className="text-[#ffffffcc] mr-2">
                {restaurant.location}
              </Text>
              <Feather name="map-pin" size={17} color="#ffffffcc" />
            </View>
          </View>
          <Text className="self-stretch bg-[#66666696] h-16 text-3xl p-3 text-[#ffffffcc] mt-6 mb-4 font-semibold">
            Menu
          </Text>
          <Menu dishes={restaurant.dishes} />
        </ScrollView>
      </View>
    </>
  );
};

export default Restaurant;
