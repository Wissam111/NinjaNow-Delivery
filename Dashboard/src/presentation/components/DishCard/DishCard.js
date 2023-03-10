import "./DishCard.css";
import Image from "../Image";
function DishCard(props) {
  const { dish, handleSelectDish } = props;
  return (
    <div className="dishCard-container" onClick={() => handleSelectDish(dish)}>
      <div className="dish-inner-wrapper">
        {/* <img src={require("../../../assets/imgs/burgerG.jpg")}></img> */}
        <Image imageId={dish.image} />
        {/* <img src={dish?.imgUrl} /> */}
        <span>{dish.name}</span>
        <span className="dishPrice-primary">$ {dish.price}</span>
      </div>
    </div>
  );
}

export default DishCard;
