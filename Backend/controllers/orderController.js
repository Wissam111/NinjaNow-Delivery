const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const moment = require("moment");

const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user) {
      orders = await Order.find({ user: req.user._id })
        .populate("restaurant")
        .populate({
          path: "dishes",
          select: "name image price category",
        })
        .sort({
          createdAt: -1,
        });
    } else if (req.restaurant) {
      orders = await Order.find({ restaurant: req.restaurant._id })
        .populate("user")
        .populate({
          path: "dishes",
          select: "name image price category",
        })
        .sort({
          createdAt: -1,
        });
    }

    res.status(200).json({ messg: "orders fetched successfully", orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//this function only for restaurants
const getOrdersByDate = async (req, res) => {
  const { date } = req.body;
  const _date = moment(date).startOf("day");
  try {
    const orders = await Order.find({
      restaurant: req.restaurant._id,
      createdAt: {
        $gte: _date.toDate(),
        $lte: moment(_date).endOf("day").toDate(),
      },
    })
      .populate("user")
      .populate({
        path: "dishes",
        select: "name image price category",
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({ messg: "orders fetched successfully", orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  const { user, restaurant, address, dishes } = req.body;
  const _user = await User.find({ _id: user });
  const _restaurant = await Restaurant.find({ _id: restaurant });
  if (!_user) {
    return res.status(404).json({ messg: "No such user" });
  }
  if (!_restaurant) {
    return res.status(404).json({ messg: "No such restaruant" });
  }

  try {
    const order = await Order.create({ user, restaurant, address, dishes });
    res.status(200).json({ messg: "order created successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  console.log(status);
  if (!status) {
    throw Error("status should be filed");
  }

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({ error: "No Such Order" });
  }
  const objStatus = { status: status, updatedAt: new Date() };

  try {
    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $push: { status_updates: objStatus }, status: status },
      { returnOriginal: false }
    );
    if (!order) {
      return res.status(404).json({ error: "No Such Order" });
    }
    res
      .status(200)
      .json({ mssage: "order status updated successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {};

module.exports = {
  getOrders,
  getOrdersByDate,
  updateOrder,
  createOrder,
  updateStatus,
};
