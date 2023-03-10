import { useApiContext } from "../hooks/useApiContext";

const OrderRepository = () => {
  const { apiCall } = useApiContext();

  const getOrders = async () => {
    const data = apiCall("orders");
    return data;
  };

  // const createOrder = async (user, restaurant, address, dishes) => {
  //   const data = apiCall("orders", "POST", {
  //     user,
  //     restaurant,
  //     address,
  //     dishes,
  //   });
  //   return data;
  // };
  const createOrder = async (user, restaurant, address, dishes) => {
    const data = apiCall("socket-io-orders", "POST", {
      user,
      restaurant,
      address,
      dishes,
    });
    return data;
  };

  return { getOrders, createOrder };
};

export default OrderRepository;
