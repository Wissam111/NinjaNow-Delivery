import { TouchableOpacity, Text } from "react-native";

function PrimaryButton(props) {
  const { styles, text, onPress } = props;

  return (
    <TouchableOpacity
      className="bg-[#faca2c] items-center justify-center"
      style={{ ...styles }}
      onPress={onPress}
    >
      <Text className="color-white text-xl">{text}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
