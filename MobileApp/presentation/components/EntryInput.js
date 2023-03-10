import { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

function EnteryInput(props) {
  const { text, value, icon, type, onPress, onChange, isActive } = props;
  return (
    <View
      className="m-2 mr-0 items-end"
      style={{
        justifyContent: "center",
      }}
    >
      <TextInput
        className={`color-white text-base pr-10 justify-center ${
          isActive ? "bg-[#66666661]" : "none"
        }`}
        style={styles.inputStyle}
        placeholder={text}
        placeholderTextColor="#ffffff8f"
        keyboardType={type}
        secureTextEntry={type == "password" && true}
        onFocus={onPress}
        onChangeText={(value) => onChange(value)}
      />
      <View
        className="absolute right-2 items-center"
        style={{
          width: 30,
          height: 30,
          top: 19,
        }}
      >
        {icon}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputStyle: {
    width: 307,
    height: 60,
    // backgroundColor: "#66666661",
    borderRadius: 20,
  },
});
export default EnteryInput;
