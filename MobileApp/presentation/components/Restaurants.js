import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
const Restaurants = (props) => {
  const { restaurants } = props;
  const [groupedByTwoRestaurants, setGroupedByTwoRestaurants] = useState([]);
  useEffect(() => {
    const grbytwoRest = restaurants.reduce(
      (accumulator, currentValue, currentIndex, array) => {
        if (currentIndex % 2 === 0) {
          accumulator.push(array.slice(currentIndex, currentIndex + 2));
        }
        return accumulator;
      },
      []
    );
    setGroupedByTwoRestaurants(grbytwoRest);
  }, [restaurants]);

  return (
    <View className="p-2 mt-5 items-end">
      <Text className="text-2xl text-white">Restaurants</Text>
      <View className="self-stretch items-end flex-column flex-1 mt-5">
        {groupedByTwoRestaurants.map((twoRest) => (
          <View
            className="flex-2 flex-row justify-between p-1"
            key={twoRest[0]._id}
          >
            <RestaurantCard restaurant={twoRest[0]} />
            {twoRest[1] && <RestaurantCard restaurant={twoRest[1]} />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Restaurants;
