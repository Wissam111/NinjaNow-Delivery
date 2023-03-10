const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const createOrder = async (req, res, io) => {
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
    let _order = await Order.findOne({ _id: order._id })
      .populate("user")
      .populate({
        path: "dishes",
        select: "name image price category",
      });
    console.log("rest", restaurant);
    io.to(restaurant).emit("new_order", _order);
    res.status(200).json({ messg: "order created successfully", _order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStatus = async (req, res, io) => {
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
    )
      .populate("user")
      .populate({
        path: "dishes",
        select: "name image price category",
      });
    if (!order) {
      return res.status(404).json({ error: "No Such Order" });
    }
    console.log(order.user._id.toString());
    io.to(order.user._id.toString()).emit("update_order", order);

    res
      .status(200)
      .json({ mssage: "order status updated successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, updateStatus };
