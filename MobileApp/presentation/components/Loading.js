import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useLoadingContext } from "../../hooks/useLoadingContext";
const Loading = () => {
  const { loading } = useLoadingContext();
  if (!loading) {
    return null;
  }

  return (
    <View
      style={styles.shadow}
      className="absolute top-80 z-50 rounded-full border-4 border-gray-400  left-36"
    >
      <Image
        className="rounded-full w-20 h-20"
        source={require("../../assets/imgs/loading3.gif")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
});

export default Loading;
