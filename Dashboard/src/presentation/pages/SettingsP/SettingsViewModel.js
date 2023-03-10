import { useAuthContext } from "../../../hooks/useAuthContext";
import RestaurantRepository from "../../../repository/RestaurantRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import UploadRepository from "../../../repository/UploadRepository";
const SettingsViewModel = () => {
  const { restaurant: data, dispatch } = useAuthContext();
  const restaurant = data.restaurant;
  const { setLoading } = useLoadingContext();

  const restaurantRepository = RestaurantRepository();
  const uploadRepository = UploadRepository();
  const updateRestaurant = async (email, name, location, image) => {
    if (!window.confirm("Are you sure you want to save changes?")) {
      return;
    }

    setLoading(true);
    const d = data;
    let imgId = restaurant.image;
    console.log(restaurant);
    if (image) {
      const dataImg = await uploadImage(image, name);
      imgId = dataImg.img._id;
    }

    try {
      const { status, data } = await restaurantRepository.updateRestaurant(
        restaurant._id,
        email,
        name,
        location,
        imgId
      );
      if (status == 200) {
        dispatch({
          type: "LOGIN",
          payload: { ...d, restaurant: data.restaurant },
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const uploadImage = async (image, restaurantName) => {
    let formData = new FormData();
    formData.append("name", restaurantName);
    formData.append("newImg", image);
    let data;
    try {
      const res = await uploadRepository.upload(formData);
      data = await res.data;
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  const handleOpenClose = async () => {
    setLoading(true);
    const d = data;
    try {
      const { status, data } = await restaurantRepository.updateisOpen(
        restaurant._id,
        !restaurant.isOpen
      );
      if (status == 200) {
        dispatch({
          type: "LOGIN",
          payload: { ...d, restaurant: data.restaurant },
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return { restaurant, updateRestaurant, handleOpenClose };
};

export default SettingsViewModel;
