import OrderRepository from "../../../repository/OrderRepository";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";

const CartViewModel = () => {
  const orderRepository = OrderRepository();
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { dispatch } = useCartItemsContext();

  const createOrder = async (restaurant, _dishes) => {
    const Address = "Bart'aa";

    _dishes.forEach((dish, index) => (_dishes[index] = dish._id));
    try {
      const { data } = await orderRepository.createOrder(
        user.user._id,
        restaurant._id,
        Address,
        _dishes
      );

      dispatch({ type: "DELETECART", payload: [] });

      navigation.navigate("Orders");
    } catch (error) {
      console.log(error);
    }
  };

  return { createOrder };
};

export default CartViewModel;
