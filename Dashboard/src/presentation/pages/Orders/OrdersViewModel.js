import { useEffect, useState, useCallback, useMemo } from "react";
import OrderRepository from "../../../repository/OrderRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import io from "socket.io-client";
import moment from "moment";

const OrdersViewModel = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [groupedItems, setGroupedItems] = useState({});
  const [statusOrder, setStatusOrder] = useState([]);
  const [date, setDate] = useState(new Date());
  const [currStatus, setCurrStatus] = useState("PLACED");
  const [statusBtnText, setStatusBtnText] = useState("Accpet Order");
  const [ordersByStatus, setOrdersByStatus] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [updateStatusTo, setUpdateStatusTo] = useState("PERPARING");
  const memoStatus = useMemo(() => currStatus, [currStatus]);

  const { restaurant: data, dispatch } = useAuthContext();
  const { setLoading } = useLoadingContext();
  const orderRepository = OrderRepository();

  const getOrders = async () => {
    try {
      const { data } = await orderRepository.getOrders();
      setSelectedOrder(data.orders[0]);
      setOrders(data.orders);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getOrdersByDate = async (date) => {
    const format = "yyyy-MM-DDTHH:mm:ssZZ";
    const _date = moment(date).format(format);
    try {
      const { data } = await orderRepository.getOrdersByDate(_date);
      setOrders(data.orders);
      filterOrdersByStatus(data.orders, currStatus);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUpadteOrderStatus = async () => {
  //   if (!window.confirm(`Are you sure ${statusBtnText}?`)) {
  //     return;
  //   }
  //   try {
  //     const { data } = await orderRepository.updateOrderStatus(
  //       selectedOrder._id,
  //       updateStatusTo
  //     );
  //     refresh();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleUpadteOrderStatus = async () => {
    if (!window.confirm(`Are you sure ${statusBtnText}?`)) {
      return;
    }
    try {
      const { data } = await orderRepository.updateOrderStatus(
        selectedOrder._id,
        updateStatusTo
      );
      refresh();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };
  const handleOrders = (status) => {
    setCurrStatus(status);
    updateStatusHandler(status);
    filterOrdersByStatus(orders, status);
  };
  const filterOrdersByStatus = useCallback((orders, status) => {
    let _orders = orders.filter((order) => order.status == status);
    handleSelectOrder(_orders[0]);
    setOrdersByStatus(_orders);
  }, []);

  const handleSelectDate = (date) => {
    setDate(date);
  };

  const updateStatusHandler = (status) => {
    console.log(status);
    switch (status) {
      case "PLACED":
        setStatusBtnText("Accpet Order");
        setUpdateStatusTo("PERPARING");
        break;
      case "PERPARING":
        setStatusBtnText("Out For Delivery");
        setUpdateStatusTo("ONDELIVERY");
        break;
      case "ONDELIVERY":
        setStatusBtnText("Order Deliverd");
        setUpdateStatusTo("DELIVERED");
        break;

      default:
        setStatusBtnText("");
        setUpdateStatusTo("");
        break;
    }
  };
  const orderTotal = (order) => {
    const total = order?.dishes.reduce((accumulator, dish) => {
      return accumulator + dish.price;
    }, 0);
    return total;
  };

  const refresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  useEffect(() => {
    const socket = io.connect("http://localhost:4000", {
      query: { id: data.restaurant._id },
    });

    socket.on("new_order", (data) => {
      console.log(data);

      setOrders((prev) => [...prev, data]);
      setOrdersByStatus((prev) => {
        if (prev[0]?.status == "PLACED") {
          return [...prev, data];
        }
        return prev;
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
    let results = {};
    if (selectedOrder) {
      results = selectedOrder?.dishes.reduce(function (results, item) {
        (results[item._id] = results[item._id] || []).push(item);
        return results;
      }, {});
    }
    setGroupedItems(results);
  }, [selectedOrder]);

  useEffect(() => {
    const OrdersPageInit = async () => {
      setLoading(true);
      await getOrdersByDate(date);
      setLoading(false);
    };

    OrdersPageInit();
  }, [date, refreshKey]);

  return {
    ordersByStatus,
    selectedOrder,
    groupedItems,
    date,
    currStatus,
    handleSelectOrder,
    handleOrders,
    handleSelectDate,
    statusBtnText,
    handleUpadteOrderStatus,
    orderTotal,
  };
};

export default OrdersViewModel;
