const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json({ messg: "users fetched successfully", users });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { phone, password } = req.body;
  console.log(phone);
  try {
    const user = await User.login(phone, password);
    const token = createToken(user._id);
    res.status(200).json({ messg: "login successfully", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { fullName, phone, password } = req.body;
  try {
    const user = await User.signup(fullName, phone, password);
    const token = createToken(user._id);
    res.status(200).json({ messg: "Sign up successfully", user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  signupUser,
  loginUser,
};
