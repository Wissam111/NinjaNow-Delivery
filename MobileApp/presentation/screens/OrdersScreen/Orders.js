import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import OrderRow from "../../components/OrderRow";
import NavBar from "../../components/NavBar";
import OrdersViewModel from "./OrdersViewModel";
const Orders = () => {
  const { orders } = OrdersViewModel();

  return (
    <>
      <NavBar />
      <View className="bg-[#000000d4] flex-1">
        <SafeAreaView>
          <View className="flex-row-reverse justify-between p-5 mt-10 items-center">
            <Text className="text-3xl text-white font-bold ">My Orders</Text>
            <Image
              className="w-12 h-12 rounded-full"
              source={require("../../../assets/imgs/dn2.jpg")}
            />
          </View>
        </SafeAreaView>
        <ScrollView
          className="mt-1 pt-4"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {orders.map((order) => (
            <OrderRow order={order} key={order._id} />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Orders;
