import { View, Image } from "react-native";

const StatusStep = (props) => {
  const { onPoint, isDeliverdStep, showLine } = props;
  return (
    <View className="relative items-center">
      <View
        className={`${
          showLine || onPoint ? "bg-[#848484]" : "bg-white"
        } w-6 h-6 rounded-full`}
      ></View>
      {onPoint && (
        <Image
          className="absolute w-6 h-6 left-3 top-3"
          source={require("../../assets/icons/kunai.png")}
        />
      )}
      {!isDeliverdStep && (
        <View
          className={`${showLine ? "bg-[#848484]" : "bg-white"} w-1 h-28`}
        ></View>
      )}
    </View>
  );
};
export default StatusStep;
