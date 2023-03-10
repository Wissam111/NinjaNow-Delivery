import { useState, useEffect } from "react";
import DishRepository from "../../../repository/DishRepository";
import UploadRepository from "../../../repository/UploadRepository";
import RestaurantRepository from "../../../repository/RestaurantRepository";
import CategoryRepository from "../../../repository/CategoryRepository";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const MenuViewModel = () => {
  const [showAddDish, setShowAddDish] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [categoryDishes, setCategoryDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [searchedDishes, setSearchedDishes] = useState([]);

  const { setLoading } = useLoadingContext();
  const { restaurant: data } = useAuthContext();
  const restaurant = data.restaurant;
  const dishRepository = DishRepository();
  const uploadRepository = UploadRepository();
  const restaurantRepository = RestaurantRepository();
  const categoryRepository = CategoryRepository();

  const getDishes = async () => {
    try {
      const { data } = await dishRepository.getDishes(restaurant._id);

      setDishes(data.dishes);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image, dishName) => {
    let formData = new FormData();
    formData.append("name", dishName);
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

  const handleAddDish = async (name, price, image) => {
    setLoading(true);
    const dataImg = await uploadImage(image, name);
    try {
      const { status, data } = await dishRepository.addDish(
        name,
        price,
        restaurant._id,
        dataImg.img._id,
        selectedCategory
      );
      await updateDishes();
    } catch (error) {
      console.log(error);
    }
    handleCloseDishOperation();
    setLoading(false);
  };

  const handleUpdateDish = async (name, price, image) => {
    setLoading(true);
    let imgId = selectedDish?.image;
    if (image) {
      const dataImg = await uploadImage(image, name);
      imgId = dataImg.img._id;
    }
    try {
      const { status, data } = await dishRepository.updateDish(
        selectedDish._id,
        name,
        price,
        imgId
      );
      console.log(data);
      await updateDishes();
    } catch (error) {
      console.log(error);
    }
    handleCloseDishOperation();
    setLoading(false);
  };

  const handleDeleteDish = async () => {
    if (!window.confirm("Are you sure you want to delete this dish?")) {
      return;
    }
    setLoading(true);

    try {
      const data = await dishRepository.deleteDish(selectedDish._id);
      await updateDishes();
    } catch (error) {
      console.log(error);
    }
    handleCloseDishOperation();
    setLoading(false);
  };

  const updateDishes = async () => {
    const data = await getDishes();
    const cDishs = data.dishes.filter((dish) => {
      return dish.category == selectedCategory;
    });
    setCategoryDishes(cDishs);
    setSearchedDishes(cDishs);
  };

  // const handleAddDish = async (name, price, image) => {
  //   const dataImg = await uploadImage(image, name);
  //   console.log(dataImg);
  //   try {
  //     const { status, data } = await categoryRepository.addCategory(
  //       name,
  //       dataImg.img._id
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setShowAddDish(false);
  // };

  const getCategories = async () => {
    try {
      const { data } = await restaurantRepository.getCategories();

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectCategory = async (category) => {
    const cDishs = dishes.filter((dish) => {
      return dish.category == category;
    });

    setCategoryDishes(cDishs);
    setSearchedDishes(cDishs);
    setSelectedCategory(category);
  };
  const handleSelectDish = (dish) => {
    setSelectedDish(dish);
    setShowAddDish(true);
  };

  const handleCloseDishOperation = () => {
    setSelectedDish(null);
    setShowAddDish(false);
  };
  const handleShowDishOperation = () => {
    setShowAddDish(true);
  };
  const handleSearch = (e) => {
    let dishes = categoryDishes.filter((dish) => {
      return dish.name
        .toLowerCase()
        .replace(/\W/g, "")
        .includes(e.target.value.toLowerCase().replace(/\W/g, ""));
    });
    setSearchedDishes(dishes);
  };

  useEffect(() => {
    const MenuPageInit = async () => {
      setLoading(true);
      await getCategories();
      await getDishes();
      setLoading(false);
    };
    MenuPageInit();
  }, []);

  return {
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
  };
};

export default MenuViewModel;
