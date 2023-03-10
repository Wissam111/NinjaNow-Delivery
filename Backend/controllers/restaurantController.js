const Restaurant = require("../models/restaurantModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "dishes",
        select: "name image price category",
      });

    res
      .status(200)
      .json({ messg: "Restaurants fetched successfully", restaurants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRestaurant = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const restaurant = await Restaurant.signup(email, password, name);
    const token = createToken(restaurant._id);
    res.status(200).json({ messg: "signup successfully", restaurant, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginRestaurant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const restaurant = await Restaurant.login(email, password);
    const token = createToken(restaurant._id);
    res.status(200).json({ messg: "login successfully", restaurant, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Restaurant" });
  }
  try {
    const restaurant = await Restaurant.findOneAndDelete({ _id: id });
    if (!restaurant) {
      return res.status(404).json({ error: "No Such Restaurant" });
    }
    res
      .status(200)
      .json({ mssage: "Restaurant deleted successfully", restaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Restaurant" });
  }
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { returnOriginal: false }
    );
    if (!restaurant) {
      return res.status(404).json({ error: "No Such Restaurant" });
    }
    res
      .status(200)
      .json({ mssage: "Restaurant updated successfully", restaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
  loginRestaurant,
};
