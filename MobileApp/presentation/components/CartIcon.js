import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
import { useCartItemsContext } from "../../hooks/useCartItemsContext";
const CartIcon = (props) => {
  const { restaurant } = props;
  const { cartItems, totalCartItems, dispatch } = useCartItemsContext();
  const cartTotal = totalCartItems();
  const navigation = useNavigation();
  if (cartItems.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Cart", {
            restaurant,
          })
        }
        className="mx-5 bg-[#FAD02C] p-4 rounded-lg flex-row-reverse items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#d9d9d961] py-1 px-2">
          {cartItems.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Cart
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={cartTotal} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
