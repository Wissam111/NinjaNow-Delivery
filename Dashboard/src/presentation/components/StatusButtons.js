import React from "react";

export default function StatusButtons(props) {
  const { currStatus, handleOrders } = props;
  return (
    <div className="orders-status">
      <button
        className={currStatus == "PLACED" ? "activeBtn" : ""}
        onClick={() => handleOrders("PLACED")}
      >
        New
      </button>
      <button
        className={currStatus == "PERPARING" ? "activeBtn" : ""}
        onClick={() => handleOrders("PERPARING")}
      >
        Perparing
      </button>
      <button
        className={currStatus == "ONDELIVERY" ? "activeBtn" : ""}
        onClick={() => handleOrders("ONDELIVERY")}
      >
        Delivery
      </button>
      <button
        className={currStatus == "DELIVERED" ? "activeBtn" : ""}
        onClick={() => handleOrders("DELIVERED")}
      >
        Deliverd
      </button>
    </div>
  );
}
