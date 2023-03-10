import "./OrderItemInfo.css";
import Currency from "react-currency-formatter";
import Image from "../Image";
function OrderItemInfo(props) {
  const { dish, quantity } = props;
  return (
    <div className="itemInfo-container">
      {/* <img src={require("./../../../assets/imgs/burgerG.jpg")} /> */}
      <Image imageId={dish.image} />
      <div className="itemInfo">
        <span>{dish.name}</span>
        <span className="total">x {quantity}</span>
        <span className="price">
          <Currency currency="USD" quantity={dish.price * quantity} />
        </span>
      </div>
    </div>
  );
}

export default OrderItemInfo;
