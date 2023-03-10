import { useApiContext } from "../hooks/useApiContext";

const RestaurantRepository = () => {
  const { apiCall } = useApiContext();
  const getRestaurants = async () => {
    const data = apiCall("restaurants");
    return data;
  };

  const getRestaurantDishes = (restaurantsId) => {
    const data = apiCall(`dishs/restaurant/${restaurantsId}`);
    return data;
  };

  return { getRestaurants, getRestaurantDishes };
};

export default RestaurantRepository;
