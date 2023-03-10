// import { ApiCall } from "../network/ApiCall";
import { useAuthContext } from "../hooks/useAuthContext";
import { useApiContext } from "../hooks/useApiContext";
const RestaurantRepository = () => {
  const { apiCall } = useApiContext();
  const updateRestaurant = async (
    restaurantId,
    email,
    name,
    location,
    image,
    isOpen
  ) => {
    const data = apiCall(`restaurants/${restaurantId}`, "PATCH", {
      email,
      name,
      location,
      image,
      isOpen,
    });
    return data;
  };

  const getCategories = async () => {
    const data = apiCall("categories", "GET");
    return data;
  };

  const updateisOpen = async (restaurantId, isOpen) => {
    const data = apiCall(`restaurants/${restaurantId}`, "PATCH", {
      isOpen,
    });
    return data;
  };

  return { getCategories, updateRestaurant, updateisOpen };
};

export default RestaurantRepository;
