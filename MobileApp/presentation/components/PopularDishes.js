import { View, Text, ScrollView } from "react-native";
import DishCard from "./DishCard";
const PopularDishes = () => {
  return (
    <View className="items-end p-2 mt-4 mb-4">
      <Text className="text-2xl text-white">Popular</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        className="self-stretch"
      >
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
      </ScrollView>
    </View>
  );
};

export default PopularDishes;
