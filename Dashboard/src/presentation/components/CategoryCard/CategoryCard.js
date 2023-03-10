import "./CategoryCard.css";
import Image from "../Image";
function CategoryCard(props) {
  const { id, image, text, handleSelectCategory, active } = props;
  return (
    <div
      className={
        active
          ? `categoryCard-container categoryActive`
          : "categoryCard-container"
      }
      onClick={() => handleSelectCategory(id)}
    >
      {/* <img src={require("../../../assets/imgs/noodles.png")}></img> */}
      <Image imageId={image} />
      {/* <img src={image} /> */}
      <span>{text}</span>
    </div>
  );
}

export default CategoryCard;
