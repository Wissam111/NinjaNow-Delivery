import { View, Text, Image } from "react-native";
import React from "react";

const StatusRow = (props) => {
  const { title, text, date, image } = props;

  return (
    <View className="flex-row-reverse items-center mb-16">
      <Image className="ml-4 w-14 h-14" source={image} />
      <View>
        <Text className="text-lg text-white font-bold">{title}</Text>
        <Text className="text-sm text-[#ffffffba] font-medium">{text}</Text>
        <Text className="text-sm text-[#ffffffba] font-medium">on {date}</Text>
      </View>
    </View>
  );
};

export default StatusRow;
