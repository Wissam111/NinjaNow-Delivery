const mongoose = require("mongoose");
const Dish = require("../models/dishModel");
const Image = require("../models/imageModel");
const Restaurant = require("../models/restaurantModel");
const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json({ messg: "dishs fetched successfully", dishes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getRestaurantDishes = async (req, res) => {
  const { id } = req.params;
  try {
    const dishes = await Dish.find({ restaurant: id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ messg: "dishs fetched successfully", dishes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDish = async (req, res) => {
  const { name, price, restaurant, image, category } = req.body;
  const rest = await Restaurant.find({ _id: restaurant });
  if (!rest) {
    return res.status(404).json({ messg: "No such restaruant" });
  }
  try {
    const dish = await Dish.create({
      name,
      price,
      restaurant,
      image,
      category,
    });
    res.status(200).json({ messg: "new dish created successfully", dish });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDish = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ messg: "No such dish!" });
  }
  try {
    const dish = await Dish.findOneAndDelete({ _id: id });
    const image = await Image.findOneAndDelete({ _id: dish.image });
    if (!dish) {
      return res.status(404).json({ messg: "No such dish!" });
    }
    res.status(200).json({ messg: "dish deleted successfully!", dish });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDish = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Dish" });
  }
  try {
    const dish = await Dish.findOneAndUpdate({ _id: id }, { ...req.body });
    //deleting the prev image
    if (req.body.image) {
      const image = await Image.findOneAndDelete({ _id: dish.image });
    }
    if (!dish) {
      return res.status(404).json({ error: "No Such Dish" });
    }
    res.status(200).json({ messg: "Dish Updated successfully", dish });
  } catch (error) {
    res.status({ error: error.message });
  }
};

module.exports = {
  getDishes,
  createDish,
  deleteDish,
  getRestaurantDishes,
  updateDish,
};
//6387670bb00af2c5ef96dba2
