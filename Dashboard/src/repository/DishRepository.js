// import { ApiCall } from "../network/ApiCall";
import { useAuthContext } from "../hooks/useAuthContext";
import { useApiContext } from "../hooks/useApiContext";
const DishRepository = () => {
  const { apiCall } = useApiContext();

  //creating new dish
  const addDish = async (name, price, restaurant, image, category) => {
    const data = apiCall("dishs", "POST", {
      name,
      price,
      restaurant,
      image,
      category,
    });
    return data;
  };

  const deleteDish = async (dishId) => {
    const data = apiCall(`dishs/${dishId}`, "DELETE");
    return data;
  };

  const updateDish = async (dishId, name, price, image) => {
    const data = apiCall(`dishs/${dishId}`, "PATCH", { name, price, image });
    return data;
  };

  const getDishes = async (restaurantId) => {
    const data = apiCall(`dishs/restaurant/${restaurantId}`);
    return data;
  };

  return { addDish, getDishes, updateDish, deleteDish };
};

export default DishRepository;
