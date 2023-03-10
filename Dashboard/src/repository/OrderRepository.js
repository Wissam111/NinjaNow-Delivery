import { useApiContext } from "../hooks/useApiContext";

const OrderRepository = () => {
  const { apiCall } = useApiContext();

  const getOrders = () => {
    const data = apiCall("orders");
    return data;
  };
  const getOrdersByDate = (date) => {
    const data = apiCall("orders/date", "POST", { date });
    return data;
  };
  // const updateOrderStatus = (orderId, status) => {
  //   console.log(status);
  //   const data = apiCall("orders/update-status", "PATCH", { orderId, status });
  //   return data;
  // };
  const updateOrderStatus = (orderId, status) => {
    console.log(status);
    const data = apiCall("socket-io-orders/update-status", "PATCH", {
      orderId,
      status,
    });
    return data;
  };

  return { getOrders, getOrdersByDate, updateOrderStatus };
};

export default OrderRepository;
