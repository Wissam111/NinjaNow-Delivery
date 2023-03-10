import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import ImageView from "./ImageView";
const CategoryCard = (props) => {
  const { category } = props;

  return (
    <TouchableOpacity
      className="bg-[#66666696] rounded-lg items-center justify-center mr-2 relative "
      style={styles.categoryContainer}
    >
      {/* <Image
        className="w-9 h-9"
        source={require("../../assets/icons/burgerCate.png")}
      /> */}
      <ImageView imageId={category.image} classN={"w-9 h-9"} />

      <Text className="absolute text-[#ffffffcc] text-base top-14 ">
        {category.categoryName}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  categoryContainer: {
    width: 80,
    height: 53,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default CategoryCard;
