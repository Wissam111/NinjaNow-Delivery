import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import "react-datepicker/dist/react-datepicker.css";
import "./Orders.css";
import OrderCard from "../../components/OrderCard/OrderCard";
import OrderItemInfo from "../../components/OrderItemInfo/OrderItemInfo";
import { FiPhoneCall } from "react-icons/fi";
import OrdersViewModel from "./OrdersViewModel";
import Currency from "react-currency-formatter";
import StatusButtons from "../../components/StatusButtons";
function OrdersPage() {
  const {
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
  } = OrdersViewModel();

  return (
    <div className="page-container">
      <div className="ordersPage-container">
        <img
          src={require("../../../assets/imgs/rewards.png")}
          className="rewards-logo"
          alt="rewards"
        />
        <div className="ordersView-wrapper">
          <div className="dataLogo-container">
            <h1 className="pageLogo">Orders</h1>
            <DatePicker
              selected={date}
              onChange={(date) => handleSelectDate(date)}
            />
          </div>
          <StatusButtons currStatus={currStatus} handleOrders={handleOrders} />
          <div className="orders">
            {ordersByStatus.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                handleSelectOrder={handleSelectOrder}
                isActive={selectedOrder?._id === order._id}
                orderTotal={orderTotal}
              />
            ))}
          </div>
        </div>
        {selectedOrder && (
          <div className="orderInfo-container">
            <h2>Order info</h2>
            <div className="orderInfo-row">
              <OrderStatusCard text="Perparing time" info="00h: 25m: 30s" />
              <OrderStatusCard
                text={selectedOrder?.address}
                info="Bartaa haifa"
              />
              <OrderStatusCard
                text={selectedOrder?.user.fullName}
                info={selectedOrder?.user.phone}
                icon={<FiPhoneCall color="#00B929" size={27} />}
              />
            </div>
            <div className="orderItems scroll">
              {Object.entries(groupedItems).map(([key, items]) => (
                <OrderItemInfo
                  key={key}
                  dish={items[0]}
                  quantity={items.length}
                />
              ))}
            </div>

            <div className="order-cta">
              <span className="totalPrice">
                <Currency currency="USD" quantity={orderTotal(selectedOrder)} />
              </span>
              {!(currStatus == "DELIVERED") && (
                <button
                  onClick={handleUpadteOrderStatus}
                  className="submit-Btn"
                >
                  {statusBtnText}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const OrderStatusCard = (props) => {
  const { text, info, icon } = props;
  return (
    <div className="orderInfoCard-container">
      <div className="textOrder">
        <span className="textMain">{text}</span>
        <span className="textSecondary">{info}</span>
      </div>
      {icon}
    </div>
  );
};

export default OrdersPage;
