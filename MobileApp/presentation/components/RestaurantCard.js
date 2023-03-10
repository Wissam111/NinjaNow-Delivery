import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageView from "./ImageView";
import { useCartItemsContext } from "../../hooks/useCartItemsContext";
const RestaurantCard = (props) => {
  const { restaurant } = props;
  const navigation = useNavigation();
  const { dispatch } = useCartItemsContext();

  const handlePress = () => {
    dispatch({ type: "DELETECART" });
    navigation.navigate("Restaurant", { restaurant });
  };
  return (
    <TouchableOpacity
      style={styles.restaurantContainer}
      className="m-2 mr-0 bg-[#66666621]"
      onPress={handlePress}
    >
      {restaurant.image ? (
        <ImageView
          imageId={restaurant.image}
          classN={"rounded-tr-lg rounded-tl-lg w-full h-16"}
        />
      ) : (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/imgs/ninjaDel.png")}
            resizeMode="cover"
            style={styles.image}
          ></ImageBackground>
        </View>
      )}
      <View className="flex-row-reverse items-center justify-between">
        <View className="p-1 justify-between mt-3">
          <Text className="text-sm  text-[#ffffffcc] p-1">
            {restaurant.name}
          </Text>
          <View className="flex-row justify-end items-center">
            <Text className="text-[#ffffffcc] mr-2">{restaurant.location}</Text>
            <Feather name="map-pin" size={17} color="#ffffffcc" />
          </View>
        </View>
        <View
          className={`${
            restaurant.isOpen ? "bg-[#31C02E]" : "bg-red-600"
          } rounded-tr-md rounded-br-md items-center justify-center w-16 h-6`}
        >
          <Text className="text-white  text-sm">
            {restaurant.isOpen ? "Open" : "Closed"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantContainer: {
    width: 170,
    height: 140,
    borderWidth: 0.2,
    borderColor: "gray",
    borderRadius: 8,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginHorizontal: 2,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default RestaurantCard;
