import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DishRow from "../../components/DishRow";
import DishOrderRow from "../../components/DishOrderRow";
import Currency from "react-currency-formatter";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import CartViewModel from "./CartViewModel";
const Cart = () => {
  const [groupedItems, setGroupedItems] = useState({});
  const navigation = useNavigation();
  const { cartItems, totalCartItems, dispatch } = useCartItemsContext();
  const cartTotal = totalCartItems();
  const { createOrder } = CartViewModel();

  const {
    params: { restaurant },
  } = useRoute();
  useEffect(() => {
    var results = cartItems.reduce(function (results, item) {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {});
    setGroupedItems(results);
  }, [cartItems]);

  return (
    <View className="flex-1 bg-[#000000d4]">
      <SafeAreaView>
        <View className="mt-4">
          <View>
            <Text className="text-4xl text-white text-center font-semibold">
              Cart
            </Text>
            <Text className="text-center text-base text-[#ffffffb3]">
              {restaurant.name}
            </Text>
          </View>
          <TouchableOpacity
            className="absolute ml-2"
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="closecircle" size={30} color="#FAD02C" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView className="mt-8">
        {Object.entries(groupedItems).map(([key, items]) => (
          <DishOrderRow
            key={key}
            dish={items[0]}
            total={items.length}
            dispatch={dispatch}
          />
        ))}
      </ScrollView>
      <View className="p-5 bg-[#66666642] mt-5 space-y-4">
        <View className="flex-row-reverse  justify-between">
          <Text className="text-gray-400">Subtotal</Text>
          <Text className="text-gray-400">
            <Currency quantity={cartTotal} currency="USD" />
          </Text>
        </View>
        <View className="flex-row-reverse justify-between">
          <Text className="text-gray-400">Delivery Fee</Text>
          <Text className="text-gray-400">
            <Currency quantity={5.99} currency="USD" />
          </Text>
        </View>
        <View className="flex-row-reverse  justify-between">
          <Text className="font-extrabold text-white">Order Total</Text>
          <Text className="font-extrabold text-white">
            <Currency quantity={cartTotal + 5.99} currency="USD" />
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-lg bg-[#FAD02C] p-4"
          onPress={() => createOrder(restaurant, cartItems)}
        >
          <Text className="text-center text-white text-lg font-bold">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
