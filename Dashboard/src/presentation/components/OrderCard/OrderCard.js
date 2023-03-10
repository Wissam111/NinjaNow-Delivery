import React, { Component } from "react";
import "./OrderCard.css";
import { BsClock } from "react-icons/bs";
import moment from "moment/moment";
import Currency from "react-currency-formatter";
function OrderCard(props) {
  const { order, isActive, handleSelectOrder, orderTotal } = props;

  return (
    <div
      className="orderCard-container"
      onClick={() => handleSelectOrder(order)}
    >
      {isActive && <div className="activeMarker"></div>}
      <div className="contentCard-cols">
        <div className="col">
          <span className="orderNumber">Order #{order._id.slice(-4)}</span>

          <div className="orderTime">
            <BsClock color="gray" /> {moment(order.createdAt).calendar()}
          </div>
        </div>
        <div className="col">
          <span className="priceTag">
            <Currency currency="USD" quantity={orderTotal(order)} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
