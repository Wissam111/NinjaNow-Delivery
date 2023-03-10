import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import StatusRow from "../../components/StatusRow";
import { useRoute } from "@react-navigation/native";
import moment from "moment/moment";
import StatusStep from "../../components/StatusStep";

const OrderStatus = () => {
  const navigation = useNavigation();
  const {
    params: { order },
  } = useRoute();
  const PLACED = order.status === "PLACED";
  const PERPARING = order.status === "PERPARING";
  const ONDELIVERY = order.status === "ONDELIVERY";
  const DELIVERD = order.status === "DELIVERED";

  return (
    <View className="bg-[#000000d4] flex-1 p-5">
      <SafeAreaView>
        <TouchableOpacity className="mt-4" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <Text className="text-3xl text-white font-bold mt-5">Order Status</Text>
      <View className="flex-row-reverse mt-7">
        <View className="items-center p-1 mt-7">
          <StatusStep
            onPoint={PLACED}
            showLine={PERPARING || ONDELIVERY || DELIVERD}
          />
          <StatusStep onPoint={PERPARING} showLine={ONDELIVERY || DELIVERD} />
          <StatusStep
            onPoint={order.status == "ONDELIVERY"}
            showLine={DELIVERD}
          />
          <StatusStep onPoint={DELIVERD} isDeliverdStep={true} />
        </View>
        <View className="p-3 justify-end">
          <StatusRow
            title="Order Placed"
            text="we have recevied your order"
            date={moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            image={require("../../../assets/icons/orderPlaced.png")}
          />
          <StatusRow
            title="Order Confirmed"
            text="we have confirmed your order"
            date={
              order.status_updates[0]
                ? moment(order.status_updates[0].updatedAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )
                : ""
            }
            image={require("../../../assets/icons/orderConfi.png")}
          />
          <StatusRow
            title="Out for Delivery"
            text="your order out for delivery"
            date={
              order.status_updates[1]
                ? moment(order.status_updates[1].updatedAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )
                : ""
            }
            image={require("../../../assets/icons/orderOut.png")}
          />
          <StatusRow
            title="Order Delivered"
            text="your order has been delivered"
            date={
              order.status_updates[2]
                ? moment(order.status_updates[2].updatedAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )
                : ""
            }
            image={require("../../../assets/icons/orderDelv.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;
