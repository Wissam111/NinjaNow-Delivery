import { useState, useEffect } from "react";
import OrderRepository from "../../../repository/OrderRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { io } from "socket.io-client";
const OrdersViewModel = () => {
  const [orders, setOrders] = useState([]);
  const orderRepository = OrderRepository();
  const { setLoading } = useLoadingContext();
  const { user } = useAuthContext();
  const getOrders = async () => {
    try {
      const { data } = await orderRepository.getOrders();
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = io.connect("http://10.0.0.18:4000", {
      query: { id: user.user._id },
    });
    console.log(user.user._id);
    socket.on("update_order", (data) => {
      setOrders((prev) => {
        const _orders = [...prev];
        const index = _orders.findIndex((order) => order._id === data._id);
        _orders[index] = data;
        return _orders;
      });
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    return function cleanup() {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const OrdersScreenInit = async () => {
      setLoading(true);
      await getOrders();
      setLoading(false);
    };
    OrdersScreenInit();
  }, []);
  return { orders };
};
export default OrdersViewModel;
