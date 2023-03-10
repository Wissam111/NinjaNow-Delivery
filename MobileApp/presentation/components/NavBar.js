import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavBar = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  return (
    <View className="absolute bottom-0 w-full z-50 bg-[#FAD02C] h-21 flex-row-reverse justify-between p-5 items-center">
      <View className="flex-row-reverse items-center ml-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="ml-7"
        >
          <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
          <Image
            source={require("../../assets/icons/list.png")}
            className={" w-8 h-8"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="ml-5" onPress={handleLogout}>
        <AntDesign name="logout" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
