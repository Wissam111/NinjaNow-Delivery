import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryRepository from "../../../repository/CategoryRepository";
import RestaurantRepository from "../../../repository/RestaurantRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
const HomeViewModel = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const { setLoading } = useLoadingContext();

  const categoryRepository = CategoryRepository();
  const restaurantRepository = RestaurantRepository();
  const getCategories = async () => {
    try {
      const { data } = await categoryRepository.getCategories();

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurants = async () => {
    try {
      const { data } = await restaurantRepository.getRestaurants();

      setRestaurants(data.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const HomeScreenInit = async () => {
      setLoading(true);
      await getCategories();
      await getRestaurants();
      setLoading(false);
    };
    HomeScreenInit();
  }, []);

  return { categories, restaurants };
};

export default HomeViewModel;
