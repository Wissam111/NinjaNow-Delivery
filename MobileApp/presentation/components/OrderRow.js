import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";

const OrderRow = (props) => {
  const navigation = useNavigation();
  const { order } = props;
  return (
    <TouchableOpacity
      className="w-80  h-16 bg-[#666666] justify-between flex-row-reverse items-center rounded-md p-2 mb-2"
      onPress={() => navigation.navigate("OrderStatus", { order })}
    >
      <View className="flex-col">
        <Text className="text-white font-semibold text-base">
          Order #{order._id.slice(-4)}
        </Text>
        <Text className="font-medium text-xs text-[#ffffffad]">
          {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Text>
      </View>
      <Text className="text-[#FAD02C]">{order.status.toLowerCase()}</Text>
    </TouchableOpacity>
  );
};

export default OrderRow;
