import "./Menu.css";
import { CiSearch } from "react-icons/ci";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { AiOutlinePlus } from "react-icons/ai";
import DishCard from "../../components/DishCard/DishCard";
import DishOperationView from "../../components/DishOperationView/DishOperationView";
import MenuViewModel from "./MenuViewModel";
import AddCategory from "../../components/AddCategory/AddCategory";

function MenuPage(props) {
  const {
    showAddDish,
    categories,
    searchedDishes,
    handleCloseDishOperation,
    handleShowDishOperation,
    handleAddDish,
    selectedCategory,
    handleSelectCategory,
    handleSelectDish,
    selectedDish,
    handleUpdateDish,
    handleDeleteDish,
    handleSearch,
  } = MenuViewModel();

  return (
    <div className="menuPage-container page-container">
      <div className="menu-cta-s">
        <h1 className="pageLogo">Menu</h1>
        {/* <div className="search-menu-wrapper">
          <input
            onChange={handleSearch}
            placeholder="search menu"
            type={"search"}
          />
          <img src={require("../../../assets/icons/searching.png")} />
        </div> */}
      </div>
      <div className="categories-section-container">
        <h3 className="secondary-title">Categories</h3>
        <div className="categories-container">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              id={category._id}
              image={category.image}
              text={category.categoryName}
              handleSelectCategory={handleSelectCategory}
              active={selectedCategory === category._id}
            />
          ))}
        </div>
      </div>

      <div className="menu-section-container">
        <h3 className="secondary-title">Category Menu</h3>
        <div className="menu-container scroll">
          <AiOutlinePlus
            color="#00b929c9"
            size={33}
            style={{ cursor: "pointer", marginLeft: 20 }}
            onClick={handleShowDishOperation}
          />
          {searchedDishes.map((dish) => (
            <DishCard
              key={dish._id}
              dish={dish}
              handleSelectDish={handleSelectDish}
            />
          ))}
        </div>
      </div>
      {showAddDish && (
        <div className="adddish-wrapper">
          <DishOperationView
            handleCloseAddDish={handleCloseDishOperation}
            handleDish={selectedDish ? handleUpdateDish : handleAddDish}
            selectedDish={selectedDish}
            buttomText={selectedDish ? "Update Dish" : "Add Dish"}
            handleDeleteDish={handleDeleteDish}
          />
        </div>
      )}

      {/* <AddCategory /> */}
    </div>
  );
}

export default MenuPage;
